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
 const checkadmin = require('./checkadmin');
 const exportResponseData = require('./importexport');
 const internAllData = require('./getInternData');
 const checkIntern = require('./checkIntern');



 /** ---------- SUBROUTES ---------- **/

router.use('/importInterns', importInterns);
router.use('/importInterns', importInterns);
router.use('/searchByLastName', searchByLastName);
router.use('/getAdmins', getAdmins);
router.use('/postAdmins', postAdmins);
router.use('/deleteAdmins', deleteAdmins);
router.use('/checkadmin', checkadmin);
router.use('/importInterns', importInterns);
router.use('/removeIntern', removeIntern);
router.use('/editPhone', editPhone);
router.use('/sendCSV', sendCSV);
router.use('/exportResponseData', exportResponseData);
router.use('/checkintern', checkIntern);
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
router.use('/getNumericData', internAllData);
router.use('/postresponsecomments', response);


/**
 * GET private/index
 */

router.get('/', function (req, res) {
  res.redirect('/'); // they made it!
});

module.exports = router;
