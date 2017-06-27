// requires
var express = require('express');
var router = express.Router();
var path = require('path'); // require path
var bodyParser = require('body-parser'); // require bodyParser
var pg = require('pg'); // require pg
var twilio = require('twilio'); // require twilio
var pool = require('../../modules/pool.js'); // create pool to connect to the database

// NOTE Jim
let accountSid = 'ACe3b7110aacbc362697b8afcb4589cef3';
let authToken = '49e75053e65684feb8c6a34dcf68f60d';

//NOTE Twilio
let client = new twilio(accountSid, authToken);

router.get('/', function(req, res){
  console.log('made to send question route');
  let phoneNumbers = [];
  pool.connect(function(err, connection, done){
    if (err){
      console.log(err);
      res.sendStatus(400);
    } //end if
    else {
      // console.log('connected to database');
      // let resultSet = connection.query('SELECT phone FROM psi LIMIT 2 OFFSET 0');
      // console.log('resultSet->', resultSet);
      // resultSet.on( 'row', function(row) {
      //   console.log('row', row);
      //   phoneNumbers.push(row.phone);
      // }); // end resultSet 'row'

      // REVIEW Technical design
      let twilioNum = ["+19522227366", "+19522227366", "+19522227366"];

      for (var i = 0; i < twilioNum.length; i++) {
        let batchSize = 2;
        let offsetCount = 0;
        let resultSet = connection.query('SELECT phone FROM psi LIMIT' + offsetCount + 'OFFSET' + offsetCount);
        console.log('resultSet->', resultSet);
        resultSet.on( 'row', function(row) {
          console.log('row-->', row.phone);
          phoneNumbers.push(row.phone);
        }); // end resultSet 'row'
        // NOTE Send SMS
        phoneNumbers.forEach(function(value){
          console.log('start of jim first function ->', value);
          client.messages.create({
              to: value, // value here to iterate phoneNumbers array
              from: twilioNum, // registered Twilio account number
              body: "This is a text from Jim's AWESOME Twilio number!!!", // message to send
          }, function(err, message) {
            if (err) {
              console.log(err);
            }// end if
            else {
              console.log('first message id ->', message.sid);
            } // end else
          });// end Jim's client.message.create
        });// end phoneNumbers iteration
          offsetCount += batchSize;
        }// end FOR LOOP

      resultSet.on('end', function(){
        done();
        console.log('psi phone#', phoneNumbers);
        psi(phoneNumbers);
        res.sendStatus(200); // sending the okay to stop to the client side.
      });// end resultSet 'end'
    } // end pool end else


    // //NOTE jim
    // let psi = function (numberArr){
    //   numberArr.forEach(function(value){
    //     console.log('start of jim first function ->', value);
    //     client.messages.create({
    //         to: value, // value here to iterate phoneNumbers array
    //         from: "+19522227366", // registered Twilio account number
    //         body: "This is a text from Jim's FIRST Twilio number!!!", // message to send
    //     }, function(err, message) {
    //       if (err) {
    //         console.log(err);
    //       }// end if
    //       else {
    //         console.log('first message id ->', message.sid);
    //       } // end else
    //     });// end Jim's client.message.create
    //   });// end phoneNumbers iteration
    // };// end jim

  });// end pool.connect
});// end router.get

module.exports = router;
