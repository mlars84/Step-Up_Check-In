/**
 * Handles all routing for private routes.
 *
 * @module routes/private/index
 */
 var express = require('express');
 var router  = express.Router();
 const importInterns = require('./importexport');
 const searchByLastName = require('./importexport');

 // var questions = require('./questions');
 // var responses = require('./responses');
 // var admin = require('./admin');
 // var interns = require('./interns');
 // var questions = require('./questions');
 // // var responses = require('./responses');
 // var admin = require('./admin');
 // var interns = require('./interns');


 /** ---------- SUBROUTES ---------- **/
 router.use('/importInterns', importInterns);
 router.use('/searchByLastName', searchByLastName);

// var questions = require('./questions');
// var responses = require('./responses');
// var admin = require('./admin');
// var interns = require('./interns');
var questions = require('./questions');
// // var responses = require('./responses');
// var admin = require('./admin');
// var interns = require('./interns');


/** ---------- SUBROUTES ---------- **/


router.use('/getquestions', questions);

// router.use('/questions', questions);
// router.use('/questions', questions);
// router.use('/responses', responses);
// router.use('/admin', admin);
// router.use('/interns', interns);


/**
 * GET private/index
 */
router.get('/', function (req, res) {
  res.redirect('/'); // they made it!
});

module.exports = router;
