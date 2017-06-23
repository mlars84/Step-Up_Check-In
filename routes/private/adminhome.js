var express = require('express');
var router = express.Router();
var pool = require('../../modules/pool');
//Getting staff list(admins)?

router.get('/', function(req, res) {
  console.log('In the admin route', req.body);
  let adminStaff = [];
  pool.connect(function(error, connection, done) {
    if (error) {
      console.log('adminRouteError', error);
      res.sendStatus(400);
    } //end if
    else {
      console.log('adminDB connection ready');
      let resultSet = connection.query('SELECT * FROM admin');
      resultSet.on('row', function(row) {
        adminStaff.push(row);
      }); //row end
      resultSet.on('end', function() {

        done();
        res.send(adminStaff);
      }); // resultSet end
    } //end else
  }); //pool.connect end
}); //router.GET end

router.post('/', function(req, res){
  console.log('In the admin post route', req.body);
  pool.connect(function(err, connection, done){
    if (err) {
      console.log('POST adminRouteError', err);
      res.send(400);
    } //end if
    else {
      console.log('adminDB connection ready');
      connection.query('INSERT INTO admin (firstname, lastname, email, active) VALUES ($1, $2, $3, $4)', [req.body.firstname, req.body.lastname, req.body.email, req.body.active]);
      done();
      res.sendStatus(200);
    } // end else
  }); // pool.connect end
});// router.POST end

module.exports = router;
