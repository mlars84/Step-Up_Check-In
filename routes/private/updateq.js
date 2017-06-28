// requires
var express = require('express');
var router = express.Router();
var path = require('path'); // added path
var bodyParser = require('body-parser'); // added bodyParser
var pg = require('pg'); // added pg

//create pool to connect to the database
var pool = require('../../modules/pool.js');

// route to add questions to db
router.post('/', function(req, res){
  console.log('made to add question route', req.body);
  pool.connect(function(err, connection, done){
    if (err) {
      console.log(err);
      res.send(400);
    } else {
      console.log('connented to database');
      connection.query('INSERT INTO questions (q_text, active, flagged) VALUES ($1, $2, $3)', [req.body.q_text, req.body.active, req.body.flagged]);
      // resultSet.on('end', function(){
        done();
        res.sendStatus(200);
      // });
    } // end else
  }); // end pool connect
});// end rounter.post

// route to grab questions from db
router.get('/', function(req, res){
  console.log('rounter to grab question running');
  let showQuestion = [];
  pool.connect(function(err, connection, done){
    if (err) {
      console.log(err);
      res.send(400);
    }// end if
    else {
      console.log('connected to grab question from database');
      let resultSet = connection.query('SELECT * FROM questions');
      resultSet.on('row', function(row){
        showQuestion.push(row);
      });
      resultSet.on('end', function(){
        done();
        res.send(showQuestion);
      });// end resultSet.on
    }// end else
  });// end pool.connect
});// end router.get

// route to change questions inactive to active
router.put('/', function (req, res){
  console.log('in active questions route', req.body);
  pool.connect(function(err, connection, done){
    if (err) {
      console.log(err);
      res.send(400);
    }// end if
    else {
      let resultSet = connection.query('UPDATE questions SET active=false');
      resultSet.on('end', function(){

        pool.connect(function(err, connection, done){
          if (err) {
            console.log(err);
            res.send(400);
          }// end if
          else {
            let resultSet = connection.query('UPDATE questions SET active=true WHERE id= ANY ($1)', [[req.body.active1, req.body.active2, req.body.active3, req.body.active4, req.body.active5]]);
            // resultSet.on('end', function(){
            //   done();
            //   res.sendStatus(200);
            // });// end resultSet.on
          }// end else
        });//end pool.connect

        done();
        res.sendStatus(200);
      });// end resultSet.on
    }// end else
  });//end pool.connect

});// end router.put

module.exports = router;
