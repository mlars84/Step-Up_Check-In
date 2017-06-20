/**
 * Handles all routing for private routes.
 *
 * @module routes/private/index
 */
var express = require('express');
var router  = express.Router();
var calendar = require('./calendar');
var adminhome = require('./adminhome');
var interns = require('./adminintern');
var updateq = require('./updateq');
var importexport = require('./importexport');
var feedback = require('./feedback');



/** ---------- SUBROUTES ---------- **/
router.use('/calendar', calendar);
router.use('/admin-home', adminhome);
router.use('/admin-intern', interns);
router.use('/updateQuestions', updateq);
router.use('/importExport', importexport);
router.use('/feedbackform', feedback);

/**
 * GET private/index
 */
router.get('/', function (req, res) {
  res.redirect('/'); // they made it!
});

module.exports = router;
