/**
 * A service layer that makes all of our User database queries.
 *
 * @module services/user
 *
 * @function findUserById finds a User by their unique Mongo id
 * @function findUserByGoogleId finds a User by their Google id
 * @function create a User that will be authenticated by Google
 */
// var User = require('../models/user');
const pg = require('pg');
const config = require('../config/database');

const pool = new pg.Pool(config);

// let user = {};

let UserService = {
  findUserById: function (id, callback) {
    pool.connect(function(err, connection, done) {
      if(err){
        return callback(err, null);
      }else{
        console.log("id =>", id, "callback =>", callback);
        let resultSet = connection.query("SELECT * FROM users WHERE id = id");
          resultSet.on('row', function(row) {
            if(err){
              console.log(err);
            }else{
              console.log("result =>", result);
              user = result.rows;
              console.log("user =>", user);
              return callback(null, user);
            }
          });
        }
    });
  },
  // findUserById: function (id, callback) {
  //   User.findById(id, function (err, user) {
  //     if (err) {
  //       return callback(err, null);
  //     }
  //
  //     return callback(null, user);
  //   });
  // },

  findUserByGoogleId: function (id, callback) {
    pool.connect(function(err, connection, done) {
      if(err){
        return callback(err, null);
      }else{
        console.log();
        connection.query("SELECT * FROM users WHERE googleId = id", function(err, result) {
          if(err){
            console.log(err);
          }else {
            console.log("result =>", result);
            user = result.rows;
            console.log("user =>", user);
            return callback(null, user);
          }
        });
      }
    });
  },

  // findUserByGoogleId: function (id, callback) {
  //   User.findOne({ googleId: id }, function (err, user) {
  //
  //     if (err) {
  //       return callback(err, null);
  //     }
  //
  //     return callback(null, user);
  //   });
  // },

  createGoogleUser: function (id, token, name, email, callback) {
    pool.connect(function(err, connection, done) {
      if(err){
        console.log(err);
        res.sendStatus(400);
      } else {
        console.log("CONNECTED TO DATABASE =>", id, token, name, email);
        connection.query("INSERT INTO users (googleId, googleToken, googleEmail, googleName) VALUES (id, token, email, name)");
      }
    });





  //   var user = new User();
  //
  //   user.googleId = id;
  //   user.googleToken = token;
  //   user.googleName = name;
  //   user.googleEmail = email;
  //
  //   user.save(function (err) {
  //     if (err) {
  //       return callback(err, null);
  //     }
  //
  //     return callback(null, user);
  //   });
  }
}; //end UserService

module.exports = UserService;
