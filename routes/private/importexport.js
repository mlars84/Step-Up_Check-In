const express = require('express');
const router = express.Router();
// const path = require('path');
const pool = require('../../modules/pool');


//Get to import all interns from DB
router.get('/', function(req, res) {
  console.log('in importInterns Route', req.body);
  let interns = [];
  pool.connect(function(error, db, done){
    if(error) {
      console.log(' importInterns error1=>', error);
      res.sendStatus(400);
    } else {
      let resultSet = db.query( 'SELECT * FROM interns;' );
      resultSet.on( 'row', function( row ) {
        interns.push( row );
      }); // end on row
      resultSet.on('end', function() {
        done();
        res.send( interns );
      }); // end on end
    }
  });
}); //end importInterns GET

//get to search interns by last name
// router.get('/', function(req, res) {
//   console.log('in searchByLastName ROUTE =>', req.body);
//   let internsByLastNAme = [];
//   pool.connect(function(error, db, done){
//     if(error) {
//       console.log(' importInterns error1=>', error);
//       res.sendStatus(400);
//     } else {
//       let resultSet = db.query( 'SELECT * FROM users WHERE last_name = $1', [id] );
//       resultSet.on( 'row', function( row ) {
//         internsByLastNAme.push( row );
//       }); // end on row
//       resultSet.on('end', function() {
//         done();
//         // res.send( internsByLastName.last_name );
//       }); // end on end
//     }
//   });
// }); //end searchByLastName GET

module.exports = router;
