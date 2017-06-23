/**
 * Handles all routing for private routes.
 *
 * @module routes/private/index
 */
 var express = require('express');
 var router  = express.Router();
 const importInterns = require('./importexport');
 const questions = require('./questions');
 const response = require('./response');
 const searchByLastName = require('./importexport');
 const adminHome = require('./adminhome');

 /** ---------- SUBROUTES ---------- **/

router.use('/importInterns', importInterns);
 router.use('/importInterns', importInterns);
 router.use('/searchByLastName', searchByLastName);

router.use('/getAdmins', adminHome);
router.use('/importInterns', importInterns);

// var questions = require('./questions');


/** ---------- SUBROUTES ---------- **/

router.use('/getquestions', questions);
router.use('/postresponse', response);


/**
 * GET private/index
 */

router.get('/', function (req, res) {
  res.redirect('/'); // they made it!
});

module.exports = router;
