// requires
var express = require('express');
var router = express.Router();
var path = require('path'); // require path
var bodyParser = require('body-parser'); // require bodyParser
var pg = require('pg'); // require pg
var twilio = require('twilio'); // require twilio
var pool = require('../../modules/pool.js'); // create pool to connect to the database

// NOTE Anna
// let accountSid = 'ACd751dd8870a891d1691af759af71e9a3';
// let authToken = '858ee241368528e4fca710307e706a8b';
// NOTE Jim
let accountSid = 'ACe3b7110aacbc362697b8afcb4589cef3';
let authToken = '49e75053e65684feb8c6a34dcf68f60d';
let client = new twilio(accountSid, authToken);

router.get('/', function(req, res){
  console.log('made to send question route');
  let phoneNumbers = [];
  let phoneNumbersObject = [];
  pool.connect(function(err, connection, done){
    if (err){
      console.log(err);
      res.sendStatus(400);
    } //end if
    else {
      console.log('connected to database');
      let resultSet = connection.query('SELECT phone FROM psi');
      console.log('resultSet->', resultSet);
      resultSet.on( 'row', function( row ) {
        phoneNumbers.push( row );
      }); // end resultSet 'row'
      resultSet.on('end', function(){
        done();
        // res.send(phoneNumbers);
        console.log('psi phone#', phoneNumbers);
        for (var i = 0; i < phoneNumbers.length; i++) {
          phoneNumbersObject.push(phoneNumbers[i].phone);
          console.log('-----phoneNumbersObject-----', phoneNumbersObject);
          // return phoneNumbersObject;
        }// end for loop
        jim(phoneNumbersObject);
      });// end resultSet 'end'
    } // end else
    // NOTE Jim
    let jim = function (numberArr){
      numberArr.forEach(function(value){console.log(value);
        client.messages.create({
            to: value, // value here to iterate phoneNumbers array
            from: "+19522227366", // registered Twilio account number
            body: "This is a text from Jim's AWESOME Twilio number!!!", // message to send
        }, function(err, message) {
          if (err) {
            console.log(err);
          }// end if
          else {
            console.log(message.sid);
          } // end else
        });// end Jim's client.message.create
      });// end phoneNumbers iteration
    };// end jim
  });// end pool.connect

});// end post

module.exports = router;
