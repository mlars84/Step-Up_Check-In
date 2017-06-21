var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var pool = require('../../modules/pool.js');

router.get('/', function(req, res) {
  let allQuestions = [];
  pool.connect(function(err, connection, done){
    if (err){
      console.log(err);
      res.send(400);
    } else {
      console.log('connected to database');
      var resultset = connection.query("SELECT * from questions");
      resultset.on('row', function(row){
        allQuestions.push(row);
      });
      resultset.on('end', function(){
        done();
        res.send(allQuestions);
      });
    }
  });
});


module.exports = router;
