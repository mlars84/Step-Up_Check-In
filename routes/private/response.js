
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.post('/', function(req, res) {
  console.log(req.body);
  console.log(req.body.name);
  pool.connect(function(err, connection, done){
    if (err) {
      res.send("error in the post on creating responses");
      res.send(400);
    }
    else {
      console.log("this is a successful connection on the server, nothing will be put in the database");
      done();
      res.send(200);
    }
  });
});
module.exports = router;
