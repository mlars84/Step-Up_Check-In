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
// const config = require('../config/database');

const pool = require('../modules/pool');

// let user = {};

const UserService = {
  findUserById: function (id, callback) {
    pool.connect(function(error, db, done){
      if(error) {
        console.log(" findUserById error1=>", error);
      } else {
        db.query('SELECT * FROM users WHERE id = $1', [id],
        function(error, result){
          done();
          if(error) {
            console.log("findUserById error2=>", error);
          } else {
            // let user = {};
            console.log('result.rows =>', result.rows[0]);
            // user = result.rows[0];
            return callback(null, result.rows[0]);
          }
        });
      }
    });
  },


  // pool.connect(function(err, connection, done) {
  //   if(err){
  //     return callback(err, null);
  //   }else{
  //     console.log("id =>", id, "callback =>", callback);
  //     let resultSet = connection.query("SELECT * FROM users WHERE id = id");
  //       resultSet.on('row', function(row) {
  //         if(err){
  //           console.log(err);
  //         }else{
  //           console.log("result =>", result);
  //           user = result.rows;
  //           console.log("user =>", user);
  //           return callback(null, user);
  //         }
  //       });
  //     }
  // });
  // },

  // findUserById: function (id, callback) {
  //   User.findById(id, function (err, user) {
  //     if (err) {
  //       return callback(err, null);
  //     }
  //
  //     return callback(null, user);
  //   });
  // },

  findUserByGoogleId: function (id, callback, res) {
    pool.connect(function(error, db, done){
      if(error) {
        console.log("findUserByGoogleId error1=>", "id =>", id, error);
      } else {
        db.query('SELECT * FROM users WHERE googleid = $1', [id],
        function(error, result){
          done();
          if(error) {
            console.log("findUserByGoogleId error2=>", error);
          } else {
            // let user = {};
            console.log('result.rows =>', result.rows[0]);
            // user = result.rows[0];
            // console.log("user =>", user);
            return callback(null, result.rows[0]);
          }
        });
      }
    });
  },


  // pool.connect(function(err, connection, done) {
  //   if(err){
  //     return callback(err, null);
  //   }else{
  //     console.log();
  //     connection.query("SELECT * FROM users WHERE googleId = id", function(err, result) {
  //       if(err){
  //         console.log(err);
  //       }else {
  //         console.log("result =>", result);
  //         user = result.rows;
  //         console.log("user =>", user);
  //         return callback(null, user);
  //       }
  //     });
  //   }
  // });
  // },

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
    pool.connect(function(error, db, done){
        console.log("id =>", id, "token =>", token, "name =>", name, "email =>", email, "callback =>", callback);
        db.query('INSERT INTO users (googleid, googletoken, googleemail, googlename) VALUES ($1, $2, $3, $4)', [id, token, email, name],
        function(error, result){
          done();
          if(error) {
            console.log("createGoogleUser error=>", error);
            return callback(null, result.rows[0]);
          } else {
            console.log("result =>", result.rows[0]);
            db.query("SELECT * FROM users WHERE googleid = $1", function(err, result) {
              // let user;
              console.log("result.rows[0] =>", result.rows[0]);
              //  result = result.rows[0];
              return callback(null, result.rows[0]);
            });
          }
        });
    });
  }

  // pool.connect(function(err, connection, done) {
  //   if(err){
  //     console.log(err);
  //     res.sendStatus(400);
  //   } else {
  //     console.log("CONNECTED TO DATABASE =>", id, token, name, email);
  //     connection.query("INSERT INTO users (googleId, googleToken, googleEmail, googleName) VALUES (id, token, email, name)");
  //   }
  // });





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
  // }

}; //end UserService

module.exports = UserService;
