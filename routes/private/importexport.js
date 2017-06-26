const express = require('express');
const router = express.Router();
// const path = require('path');
const pool = require('../../modules/pool');
const csvtojson = require('csvtojson');
const json2csv = require('json2csv');


// const Papa = require('papaparse');
// const csv = require('csvtojson');
// const csvFilePath = '<path to csv file>';
// csv()
// .fromFile(csvFilePath)
// .on('json',(jsonObj)=>{
//     // combine csv header row and csv line to a json object
//     // jsonObj.a ==> 1 or 4
// })
// .on('done',(error)=>{
//     console.log('end');
// });

//GET to import all interns with CSV file
// router.get('/', function() {
//   console.log('in importInterns GET route');
//   pool.connecdt(function(error, db, done) {
//     if (error) {
//       console.log('importInterns error =>', error);
//     } else {
//       let jsonQuery = 'SELECT * FROM interns;';
//       db.query(jsonQuery, function(queryError, result) {
//         done();
//         if (queryError) {
//           console.log('queryError =>', queryError);
//         } else {
//           let jsonString = JSON.stringify(result.rows);
//           let json = JSON.parse(jsonString);
//         }
//       });
//     }
//   });
// });



//Get to import all interns from DB
// router.get('/', function(req, res) {
//   console.log('in importInterns Route', req.body);
//   let interns = [];
//   pool.connect(function(error, db, done){
//     if(error) {
//       console.log(' importInterns error1=>', error);
//       res.sendStatus(400);
//     } else {
//       let resultSet = db.query( 'SELECT * FROM interns;' );
//       resultSet.on( 'row', function( row ) {
//         interns.push( row );
//       }); // end on row
//       resultSet.on('end', function() {
//         done();
//         res.send( interns );
//       }); // end on end
//     }
//   });
// }); //end importInterns GET

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

// Handles POST request with new volunteer data
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
            db.query('INSERT INTO interns (primarykey, first_name, last_name, email, phone, company, supervisor, stepup_group_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);',
            [jsonObject.primarykey, jsonObject.first_name, jsonObject.last_name, jsonObject.email, jsonObject.phone, jsonObject.company, jsonObject.supervisor, jsonObject.stepup_group_id],
            function(error, result) {
             if (error) {
               console.log("queryError =>", error);
               message = 'Error importing interns.';
               res.sendStatus(500);
             } else {
               message = 'Import successful! ' + result.rowCount + ' interns added to the database.';
              //  res.sendStatus(200);
             }
           });
          } // end of for loop
        }
         done();
      }); // pool.connect
    }); // end of csvtojson
});

//get to search interns by last name
router.get('/', function(req, res) {
  console.log('in searchByLastName ROUTE =>', req.body);
  let internsByLastNAme = [];
  pool.connect(function(error, db, done){
    if(error) {
      console.log(' importInterns error1=>', error);
      res.sendStatus(400);
    } else {
      let resultSet = db.query( 'SELECT * FROM users WHERE last_name = $1', [id] );
      resultSet.on( 'row', function( row ) {
        internsByLastNAme.push( row );
      }); // end on row
      resultSet.on('end', function() {
        done();
        // res.send( internsByLastName.last_name );
      }); // end on end
    }
  });
}); //end searchByLastName GET

module.exports = router;
