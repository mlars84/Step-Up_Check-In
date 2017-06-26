// requires
var express = require('express');
var router = express.Router();
var path = require('path'); // added path
var bodyParser = require('body-parser'); // added bodyParser
var pg = require('pg'); // added pg

//create pool to connect to the database
var pool = require('../../modules/pool.js');

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
      let resultSet = connection.query('SELECT q_text FROM questions');
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

module.exports = router;
