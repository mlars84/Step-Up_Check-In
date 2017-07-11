// requires
var express = require('express');
var router = express.Router();
var path = require('path'); // require path
var bodyParser = require('body-parser'); // require bodyParser
var pg = require('pg'); // require pg
var twilio = require('twilio'); // require twilio
var pool = require('../../modules/pool.js'); // create pool to connect to the database
var env = require('dotenv').config();

// Twilio info
var ACCOUNTSID = process.env.accountSid;
var AUTHTOKEN = process.env.authToken;
let client = new twilio(accountSid, authToken);

router.get('/', function(req, res){
  console.log('made to send question route');
  pool.connect(function(err, connection, done){
    if (err){
      console.log(err);
      res.sendStatus(400);
    } //end if
    else {
      // Twilio numbers
      let twilioNum = ["+17633346209", "+17633346219", "+17633346131", "+17633346557", "+17633346194", "+17637036066", "+17633249564", "+17637629952", "+17633346209"];
      let batchSize = 200; // the first set of numbers
      let offsetCount = 0; // the end of the  first set
      for (let i = 0; i < twilioNum.length; i++) {
        // loop through the first 200 numbers and then the next 200
        let resultSet = connection.query('SELECT phone FROM interns LIMIT $1 OFFSET $2', [batchSize, offsetCount], function(err, result){
          console.log('result.rows->', result.rows);
          phone(result.rows, twilioNum[i]);
        }); // end resultSet
        offsetCount += batchSize; // when batchSize increase offsetCount will also increase
      }// end FOR LOOP
        res.sendStatus(200); // giving the okay to stop sending SMS back to the client side.
    } // end pool end else

    // NOTE Send SMS
    let phone = function (newArray, fromNumber) {
    newArray.forEach(function(value){
      console.log('start of function ->', value);
      client.messages.create({
          to: value.phone, // value here to iterate phoneNumbers array
          from: fromNumber, // registered Twilio account numbers
          body: "This is your weekly STEP-UP check in! Please click the following link to take the very short survey. https://stepupcheckin.herokuapp.com/#/login Thank you!", // message to send and url to application
      }, function(err, message) {
        if (err) {
          console.log(err);
        }// end if
        else {
          console.log('SMS message id ->', message.sid);
        } // end else
      });// end client.message.create
    });// end phoneNumbers iteration
  }; // end psi

  });// end pool.connect
});// end router.get

module.exports = router;
