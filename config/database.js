/**
 * Connection URI for a Mongo database that will hold our
 * application's persistent data.
 *
 * @todo Update to match the path of your actual database.
 * @module config/database
 */

// set up config for the pool
const config = {
  database: 'stepUpCheckIn',
  host: 'localhost',
  port: 5432,
  max: 100
};

module.exports = config;
