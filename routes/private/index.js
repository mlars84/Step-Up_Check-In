/**
 * Handles all routing for private routes.
 *
 * @module routes/private/index
 */
 var express = require('express');
 var router  = express.Router();
 const importInterns = require('./importexport');
 const addQuestion = require('./updateq');
 const twilio = require('./twilio'); // NOTE require twilio

 // var questions = require('./questions');
 // var responses = require('./responses');
 // var admin = require('./admin');
 // var interns = require('./interns');
 // var questions = require('./questions');
 // // var responses = require('./responses');
 // var admin = require('./admin');
 // var interns = require('./interns');

 const questions = require('./questions');
 const response = require('./response');
 const searchByLastName = require('./importexport');
 const adminHome = require('./adminhome');
 const removeIntern = require('./importexport');
 const editPhone = require('./importexport');

 /** ---------- SUBROUTES ---------- **/

router.use('/importInterns', importInterns);
router.use('/importInterns', importInterns);
router.use('/searchByLastName', searchByLastName);
router.use('/getAdmins', adminHome);
router.use('/postAdmins', adminHome);
router.use('/importInterns', importInterns);
router.use('/removeIntern', removeIntern);
router.use('/editPhone', editPhone);


// var questions = require('./questions');


/** ---------- SUBROUTES ---------- **/

router.use('/getquestions', questions);
router.use('/postresponse', response);
router.use('/addQuestion', addQuestion);
router.use('/sendQuestion', twilio); // NOTE Add twilio router here

// router.use('/questions', questions);
// router.use('/questions', questions);
// router.use('/responses', responses);
// router.use('/admin', admin);
// router.use('/interns', interns);
router.use('/postresponsecomments', response);


/**
 * GET private/index
 */

router.get('/', function (req, res) {
  res.redirect('/'); // they made it!
});

module.exports = router;
