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
  let internflags = [];
  console.log("made it to the server");

  pool.connect(function(err, connection, done){
    if (err){
      console.log(err);
      res.send(400);
    } else {
      console.log('connected to database');
      let allFlags = connection.query("SELECT response_num.response_num, response_num.created, interns.first_name, interns.last_name, interns.email, interns.phone FROM response_num INNER JOIN interns ON response_num.intern_id = interns.primarykey INNER JOIN questions ON response_num.question_id = questions.id WHERE questions.flagged=TRUE AND response_num.response_num = 1 OR response_num.response_num = 2");


      // SELECT animal.ID, breed1.BreedName as BreedName1, breed2.BreadName as BreadName2
      // FROM animal
      //    LEFT JOIN breed as breed1 ON animal.breedID=breed1.ID
      //    LEFT JOIN breed as breed2 ON animal.breedID=breed2.ID
      // WHERE animal.ID='7';

      allFlags.on('row', function(row){
        internflags.push(row);
      });
      allFlags.on('end', function(){
        done();
        res.send(internflags);
      });
    }
  });
});
module.exports = router;
