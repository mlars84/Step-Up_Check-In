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

//NOTE Twilio
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
      resultSet.on( 'row', function(row) {
        console.log('row', row);
        phoneNumbers.push(row.phone);
    }); // end resultSet 'row'
      resultSet.on('end', function(){
        done();// REVIEW
        // res.send(phoneNumbers);
        console.log('psi phone#', phoneNumbers);
        psi(phoneNumbers); // NOTE store phoneNumbers into psi
        res.sendStatus(200); // sending the okay to stop to the client side.
        // anna(phoneNumbersObject); //NOTE anna
      });// end resultSet 'end'
    } // end else

    //NOTE jim
    let psi = function (numberArr){
      numberArr.forEach(function(value){
        console.log('start of jim function ->', value);
        client.messages.create({
            to: value, // value here to iterate phoneNumbers array
            from: "+19522227366", // registered Twilio account number
            body: "This is a text from Jim's Twilio number!!!", // message to send
        }, function(err, message) {
          if (err) {
            console.log(err);
          }// end if
          else {
            console.log('message id ->', message.sid);
          } // end else
        });// end Jim's client.message.create
      });// end phoneNumbers iteration
    };// end jim

    // NOTE anna
    // let anna = function (numberArr){
    //   numberArr.forEach(function(value){console.log(value);
    //     client.messages.create({
    //         to: value, // value here to iterate phoneNumbers array
    //         from: "+17633249564", // registered Twilio account number
    //         body: "This is a text from Anna's Twilio number!!!", // message to send
    //     }, function(err, message) {
    //       if (err) {
    //         console.log(err);
    //       }// end if
    //       else {
    //         console.log(message.sid);
    //       } // end else
    //     });// end Jim's client.message.create
    //   });// end phoneNumbers iteration
    // };// end jim

    // // NOTE matt
    // let psi2 = function (numberArr){
    //   numberArr.forEach(function(value){console.log(value);
    //     client.messages.create({
    //         to: value, // value here to iterate phoneNumbers array
    //         from: "+19522227366", // registered Twilio account number
    //         body: "This is a text from Jim's SECOND Twilio number!!!", // message to send
    //     }, function(err, message) {
    //       if (err) {
    //         console.log(err);
    //       }// end if
    //       else {
    //         console.log(message.sid);
    //       } // end else
    //     });// end Jim's client.message.create
    //   });// end phoneNumbers iteration
    // };// end matt

  });// end pool.connect
});// end post

module.exports = router;
