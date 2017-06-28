var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var pool = require('../../modules/pool.js');


router.get('/', function(req, res) {
  let internInfo = [];
  console.log("made it to the server");

  pool.connect(function(err, connection, done){
    if (err){
      console.log(err);
      res.send(400);
    } else {
      console.log('connected to database');
      let allData = connection.query("SELECT response_num.response_num, response_num.created, interns.first_name, interns.last_name, questions.id, questions.q_text FROM response_num INNER JOIN interns ON response_num.intern_id = interns.primarykey INNER JOIN questions ON response_num.question_id = questions.id");


      allData.on('row', function(row){
        internInfo.push(row);
      });
      allData.on('end', function(){
        done();
        res.send(internInfo);
      });
    }
  });
});
module.exports = router;
