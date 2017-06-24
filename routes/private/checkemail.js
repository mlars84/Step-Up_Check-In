var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var pool = require('../../modules/pool.js');


router.get('/:email', function(req, res) {

  console.log("in check email route on server!!");
  console.log(req.params.email);
  let interns = [];

  pool.connect(function(err, connection, done){
    if (err) {
      res.send("error in the checking email server responses");
      res.send(400);
    }
    else {
      console.log("checked email in database.");

      let resultSet = connection.query( 'SELECT * FROM interns WHERE email=$1', [req.params.email] );
      console.log(resultSet);
      resultSet.on( 'row', function( row ) {
        interns.push( row );
      }); // end on row

      resultSet.on('end', function() {
        done();
        res.send(interns);
        });
      //send the primary key back
    }
  });
});


module.exports = router;
