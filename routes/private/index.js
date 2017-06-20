/**
 * Handles all routing for private routes.
 *
 * @module routes/private/index
 */
var express = require('express');
var router  = express.Router();
// var calendar = require('./calendar');
// var adminhome = require('./adminhome');
// var interns = require('./adminintern');
// var updateq = require('./updateq');
// var importexport = require('./importexport');
// var feedback = require('./feedback');


var questions = require('./questions');
var responses = require('./responses');
var admin = require('./admin');
var interns = require('./interns');


/** ---------- SUBROUTES ---------- **/
// router.use('/calendar', calendar); // these are built off of the angular routes... but that is not what we want here
// router.use('/admin-home', adminhome);
// router.use('/admin-intern', interns);
// router.use('/updateQuestions', updateq);
// router.use('/importExport', importexport);
// router.use('/feedbackform', feedback);


router.use('/questions', questions);
router.use('/responses', responses);
router.use('/admin', admin);
router.use('/interns', interns);


/**
 * GET private/index
 */
router.get('/', function (req, res) {
  res.redirect('/'); // they made it!
});

module.exports = router;
