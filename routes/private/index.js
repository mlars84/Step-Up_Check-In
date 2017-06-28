/**
 * Handles all routing for private routes.
 *
 * @module routes/private/index
 */
 var express = require('express');
 var router  = express.Router();
 const importInterns = require('./importexport');
 const addQuestion = require('./updateq');
 const grabQuestion = require('./updateq');
 const submitQuestion = require('./updateq'); // NOTE add submitQuestion
 const twilio = require('./twilio');
 const sendCSV = require('./importexport');


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
 const postAdmins = require('./adminhome');
 const getAdmins = require('./adminhome');
 const deleteAdmins = require('./adminhome');
 const removeIntern = require('./importexport');
 const editPhone = require('./importexport');
 const checkemail = require('./checkemail');
 const interndata = require('./interndata');
 const interncomments = require('./comments');
 const interncheckbox = require('./checkbox');
 const internresponses = require('./numresponse');



 /** ---------- SUBROUTES ---------- **/

router.use('/importInterns', importInterns);
router.use('/importInterns', importInterns);
router.use('/searchByLastName', searchByLastName);

router.use('/getAdmins', getAdmins);
router.use('/postAdmins', postAdmins);
router.use('/deleteAdmins', deleteAdmins);

router.use('/importInterns', importInterns);
router.use('/removeIntern', removeIntern);
router.use('/editPhone', editPhone);
router.use('/sendCSV', sendCSV);


// var questions = require('./questions');


/** ---------- SUBROUTES ---------- **/

router.use('/getquestions', questions);
router.use('/postresponse', response);
router.use('/addQuestion', addQuestion);
router.use('/grabQuestion', grabQuestion);
router.use('/submitQuestion', submitQuestion);// NOTE add submitQuestion
router.use('/sendQuestion', twilio);
router.use('/checkemail', checkemail);
router.use('/interndata', interndata);
router.use('/getComments', interncomments);
router.use('/getCheckbox', interncheckbox);
router.use('/getFlags', internresponses);



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
