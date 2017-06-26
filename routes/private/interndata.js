var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var pool = require('../../modules/pool.js');

// go to database and get intern data
// - how many interns in each category? achieve, discover
//
// - get all interns who want to be contacted (firstname, lastname, phone)
// - get all interns who have chosen 1 or 2 in flagged Questions
// - get all comments from interns

router.get('/', function(req, res) {
  let internData = [];
  console.log("made it to the server");

  pool.connect(function(err, connection, done){
    if (err){
      console.log(err);
      res.send(400);
    } else {
      console.log('connected to database');
      //grabs all discover students
      let allInterns = connection.query("SELECT * from interns");
      allInterns.on('row', function(row){
        internData.push(row);
      });
      allInterns.on('end', function(){
        console.log(internData.length);
        done();
      });
    }
  });

  res.send(200);
});


// router.get('/', function(req, res) {
//   pool.connect(function(err, connection, done){
//     if (err) {
//       res.send("error in the post on creating responses");
//       res.send(400);
//     }
//     else {
//       console.log("this is a successful connection on the server, check DB for results");
//       connection.query('INSERT INTO response_checkbox (intern_id, response_checkbox) VALUES ($1, $2)', [req.body.internid, req.body.checkbox, ]);
//       connection.query('INSERT INTO response_comments (intern_id, response_comment) VALUES ($1, $2)', [req.body.internid, req.body.comment]);
//
//       connection.query('INSERT INTO response_num (question_id, intern_id, response_num) VALUES ($1, $2, $3)', [req.body.question1id, req.body.internid, req.body.question1]);
//       connection.query('INSERT INTO response_num (question_id, intern_id, response_num) VALUES ($1, $2, $3)', [req.body.question2id, req.body.internid, req.body.question2]);
//       connection.query('INSERT INTO response_num (question_id, intern_id, response_num) VALUES ($1, $2, $3)', [req.body.question3id, req.body.internid, req.body.question3]);
//       connection.query('INSERT INTO response_num (question_id, intern_id, response_num) VALUES ($1, $2, $3)', [req.body.question4id, req.body.internid, req.body.question4]);
//       connection.query('INSERT INTO response_num (question_id, intern_id, response_num) VALUES ($1, $2, $3)', [req.body.question5id, req.body.internid, req.body.question5]);
//
//       done();
//       res.send(200);
//     }
//   });
// });


module.exports = router;
