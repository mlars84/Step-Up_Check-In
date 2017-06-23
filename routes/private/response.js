
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
      res.send(400);
    }
    else {
      console.log("this is a successful connection on the server, nothing will be put in the database MAYBE");
      connection.query('INSERT INTO response_checkbox (intern_id, response_checkbox) VALUES ($1, $2)', ["STU036824", req.body.checkbox, ]);
      connection.query('INSERT INTO response_comments (intern_id, response_comment) VALUES ($1, $2)', ["STU036824", req.body.comment]);
      done();
      res.send(200);
    }
  });
});
module.exports = router;
