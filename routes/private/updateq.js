// requires NOTE Jim's work
var express = require('express');
var router = express.Router();
var path = require('path'); // added path
var bodyParser = require('body-parser'); // added bodyParser
var pg = require('pg'); // added pg

//create pool to connect to the database
var pool = require('../../modules/pool.js');

module.exports = router;
