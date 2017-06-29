
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var pool = require('../../modules/pool.js');


router.post('/', function(req, res) {
  console.log(req.body);
  // console.log(req.body.name);
  pool.connect(function(err, connection, done){
    if (err) {
      res.send("error in the post on creating responses");
      res.sendStatus(400);
    }
    else {
      console.log("this is a successful connection on the server, check DB for results");
      connection.query('INSERT INTO response_checkbox (intern_id, response_checkbox) VALUES ($1, $2)', [req.body.internid, req.body.checkbox, ]);
      connection.query('INSERT INTO response_comments (intern_id, response_comment) VALUES ($1, $2)', [req.body.internid, req.body.comment]);

      connection.query('INSERT INTO response_num (question_id, intern_id, response_num) VALUES ($1, $2, $3)', [req.body.question1id, req.body.internid, req.body.question1]);
      connection.query('INSERT INTO response_num (question_id, intern_id, response_num) VALUES ($1, $2, $3)', [req.body.question2id, req.body.internid, req.body.question2]);
      connection.query('INSERT INTO response_num (question_id, intern_id, response_num) VALUES ($1, $2, $3)', [req.body.question3id, req.body.internid, req.body.question3]);
      connection.query('INSERT INTO response_num (question_id, intern_id, response_num) VALUES ($1, $2, $3)', [req.body.question4id, req.body.internid, req.body.question4]);
      connection.query('INSERT INTO response_num (question_id, intern_id, response_num) VALUES ($1, $2, $3)', [req.body.question5id, req.body.internid, req.body.question5]);

      done();
      res.sendStatus(200);
    }
  });
});


module.exports = router;
