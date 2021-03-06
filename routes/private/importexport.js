const express = require('express');
const router = express.Router();
// const path = require('path');
const pool = require('../../modules/pool');
const csvtojson = require('csvtojson');
const json2csv = require('json2csv');

// POST route to translate add interns to DB
router.post('/', function(req, res, next) {
  // console.log(req.body.fileContent);
    var fileContent = req.body.fileContent;
    var message = '';
    // converts fileContent to JSON
    csvtojson({noheader:false})
    .fromString(fileContent)
    .on('end_parsed',function(jsonArrObj) {
      // Inserts into json_volunteer table
      pool.connect(function(error, db , done) {
        if(error) {
          console.log('Error connecting to the database');
          res.sendStatus(401);
        } else {
          for (var i = 0; i < jsonArrObj.length; i++) {
            let jsonObject = jsonArrObj[i];
            db.query('INSERT INTO interns (primarykey, first_name, last_name, email, phone, company, supervisor, stepup_group_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) ON CONFLICT DO NOTHING;',
            [jsonObject.primarykey, jsonObject.first_name, jsonObject.last_name, jsonObject.email, jsonObject.phone, jsonObject.company, jsonObject.supervisor, jsonObject.stepup_group_id],
            function(error, result) {
             if (error) {
               console.log("queryError =>", error);
               message = 'Error importing interns.';
               res.sendStatus(500);
             }
           });
          } // end of for loop
        }
         done();
      }); // pool.connect
    }); // end of csvtojson
});

//importInterns GET route after CSV uploaded
router.get('/:last', function(req, res) {
  console.log('in importInterns route', req.params.last);
  let internsByLast = [];
  pool.connect(function(error, db, done){
    if (error) {
      console.log(error);
      res.sendStatus(500);
    } else {
      let resultSet = db.query('SELECT * FROM interns WHERE last_name=$1;', [req.params.last]);
      resultSet.on('row', function(row) {
        internsByLast.push(row);
      }); //end on row
      resultSet.on('end', function() {
        console.log('interns =>', internsByLast);
        done();
        res.send(internsByLast);
      });
    } //end else
  }); //end pool.connect
}); //end GET route to importInterns

//route to delete an intern from the DB
router.delete('/', function(req, res) {
  let primarykeyToDelete = req.query.primarykey;
  console.log('primarykeyToDelete =>', primarykeyToDelete);
  pool.connect(function(error, db, done) {
    if(error){
      console.log('removeIntern error =>', error);
    } else {
      let resultSet = db.query( 'DELETE FROM interns WHERE primarykey=$1', [primarykeyToDelete] );
      resultSet.on('end', function() {
        done();
        res.sendStatus(200);
      });
    }
  });
}); //end removeIntern DELETE

//route to edit an interns phone number based on lastName search and primarykey
router.put('/', function(req, res) {
  console.log('in editPhone PUT =>', req.body.primarykey, req.body.phone);
  pool.connect(function(error, db, done) {
    if(error) {
      console.log('editPhone PUT error =>', error);
    } else {
      let resultSet = db.query ( 'UPDATE interns SET phone=$1 WHERE primarykey=$2', [req.body.phone, req.body.primarykey] );
      resultSet.on('end', function() {
        done();
        res.sendStatus(200);
      });
    }
  });
}); //editPhone PUT

//exportResponseData GET route export intern's feedback responses
router.get('/', function(req, res) {
  console.log('in exportResponseData GET route');
  pool.connect(function(error, db, done) {
      if(" exportResponseData route error =>", error) {
        res.sendStatus(500);
      } else {
        // query that selects all volunteer hours for a selected period of time
        let jsonQuery = "SELECT interns.primarykey, interns.first_name, interns.last_name, interns.email, interns.phone, interns.supervisor, interns.company, stepup_group.group_name, response_num.response_num, response_num.created, questions.q_text FROM interns INNER JOIN stepup_group ON interns.stepup_group_id = stepup_group.id INNER JOIN response_num ON interns.primarykey = response_num.intern_id INNER JOIN questions ON response_num.question_id = questions.id;";
        db.query(jsonQuery, function(queryError,result) {
          done();
          if (queryError) {
            console.log('queryError =>', queryError);
            res.sendStatus(500);
          } else {
            // converts query resutl to JSON
            let jsonString = JSON.stringify(result.rows);
            let json = JSON.parse(jsonString);
            // parameters for json2csv function
            let responseData = {
              data: json,
              fields: ['primarykey', 'first_name', 'last_name', 'email', 'phone', 'supervisor', 'company', 'group_name', 'response_num', 'created', 'q_text'],
              quotes: ''
            };
            // converts json data to csv
            result = json2csv(responseData);
            // sends csv file to client
            res.attachment('InternFeedbackResponses.csv');
            res.status(200).send(result);
          } // else
        }); // db.query
      } // else
    });
}); //end exportResponseData GET route

module.exports = router;
