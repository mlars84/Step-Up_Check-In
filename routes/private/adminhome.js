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


module.exports = router;
