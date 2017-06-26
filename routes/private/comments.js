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
  let internComments = [];
  console.log("made it to the server");

  pool.connect(function(err, connection, done){
    if (err){
      console.log(err);
      res.send(400);
    } else {
      console.log('connected to database');
      let allComments = connection.query("SELECT response_comments.response_comment, response_comments.created, interns.first_name, interns.last_name, interns.email, interns.phone FROM response_comments INNER JOIN interns ON response_comments.intern_id = interns.primarykey");
      allComments.on('row', function(row){
        internComments.push(row);
      });
      allComments.on('end', function(){
        done();
        res.send(internComments);
      });
    }
  });
});
module.exports = router;
