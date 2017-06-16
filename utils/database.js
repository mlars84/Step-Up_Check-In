/**
 * Connect to our database and output some helpful logging.
 *
 * @module utils/database
 */
const config = require('../config/database');
const pg = require('pg');

// new pool using config
const pool = new pg.Pool(config);

module.exports = pool; 
