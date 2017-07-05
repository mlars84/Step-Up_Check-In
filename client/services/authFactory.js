googleAuthApp.factory('AuthFactory', function ($http) {
  var Status = {
    loggedIn: false,
  };
  console.log("this is the status:" , Status);


  // the public API
  return {
    Status: Status,

    checkLoggedIn: function () {
      return Status.loggedIn;
    },

    isLoggedIn: function () {
      return $http.get('/auth');
    },

    setLoggedIn: function (value) {
      Status.loggedIn = value;
    },

    logout: function () {
      return $http.get('/auth/logout');
    },
  };


});
