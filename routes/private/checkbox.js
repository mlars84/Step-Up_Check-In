var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var pool = require('../../modules/pool.js');

// go to database and get intern data
// - how many interns in each category? achieve, discover
//
// - get all interns who want to be contacted (firstname, lastname, phone) DONE
// - get all interns who have chosen 1 or 2 in flagged Questions
// - get all comments from interns DONE

router.get('/', function(req, res) {
  let internCheckbox = [];
  console.log("made it to the server");

  pool.connect(function(err, connection, done){
    if (err){
      console.log(err);
      res.send(400);
    } else {
      console.log('connected to database');
      let allCheckbox = connection.query("SELECT response_checkbox.response_checkbox, response_checkbox.created, interns.first_name, interns.last_name, interns.email, interns.phone FROM response_checkbox INNER JOIN interns ON response_checkbox.intern_id = interns.primarykey WHERE response_checkbox.response_checkbox=TRUE");

      allCheckbox.on('row', function(row){
        internCheckbox.push(row);
      });
      allCheckbox.on('end', function(){
        done();
        res.send(internCheckbox);
      });
    }
  });
});
module.exports = router;
