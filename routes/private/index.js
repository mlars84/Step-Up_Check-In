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



 /** ---------- SUBROUTES ---------- **/
router.use('/importInterns', importInterns);
router.use('/getquestions', questions);
router.use('/postresponsecomments', response);


/**
 * GET private/index
 */
router.get('/', function (req, res) {
  res.redirect('/'); // they made it!
});

module.exports = router;
