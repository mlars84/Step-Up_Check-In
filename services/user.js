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
// const pg = require('pg');
var pool = require('../modules/pool.js');

const UserService = {
  findUserById: function (id, callback) {
    pool.connect(function(error, db, done){
      if(error) {
        console.log(' findUserById error1=>', error);
        return callback(error, null);
      } else {
        db.query('SELECT * FROM users WHERE id = $1', [id],
        function(error, result){
          done();
          if(error) {
            console.log('findUserById error2=>', error);
          } else {
            console.log('result.rows =>', result.rows[0]);
            let user = result.rows[0];
            // return callback(null, user);
            return callback(null, user);
          }
        });
      }
    });
  },

  findUserByGoogleId: function (id, callback, res) {
    pool.connect(function(error, db, done){
      if(error) {
        console.log('findUserByGoogleId error1=>', 'id =>', id, error);
        return callback(error, null);
      } else {
        db.query('SELECT * FROM users WHERE googleid = $1', [id],
        function(error, result){
          done();
          if(error) {
            console.log('findUserByGoogleId error2=>', error);
            return callback(error, null);
          } else {
            console.log('result.rows =>', result.rows[0]);
            let user = result.rows[0];
            console.log('user =>', user);
            // return callback(null, user);
            return callback(null, user);
          }
        });
      }
    });
  },

  createGoogleUser: function (id, token, name, email, callback) {
    pool.connect(function(error, db, done){
      // let user = new User();
      //   user.googleid = id;
      //   user.googletoken = token;
      //   user.googlename = name;
      //   user.googleemail = email;
        console.log('id =>', id, 'token =>', token, 'name =>', name, 'email =>', email, 'callback =>', callback);
        db.query('INSERT INTO users (googleid, googletoken, googleemail, googlename) VALUES ($1, $2, $3, $4)', [id, token, email, name],
        function(error, result){
          done();
          if(error) {
            console.log('createGoogleUser error=>', error);
            return callback(error, null);
          } else {
            console.log('result =>', result.rows[0]);
            db.query('SELECT * FROM users WHERE googleid = $1', [googleid] , function(err, result) {
              console.log('result.rows[0] =>', result.rows[0]);
               let user = result.rows[0];
              // return callback(null, user);
              return callback(null, user);
            });
          }
        });
    });
  } //end createGoogleUser

}; //end UserService

module.exports = UserService;
