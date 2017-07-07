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


module.exports = router;
