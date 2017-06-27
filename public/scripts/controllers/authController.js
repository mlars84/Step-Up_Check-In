
googleAuthApp.controller('AuthController', ['$http', 'AuthFactory', '$window', function ($http, AuthFactory, $window) {

  // ('feedBackFormController', ['$http', 'AuthFactory','feedBackFormService', function ($http, AuthFactory, feedBackFormService)
  const self = this;
  var authFactory = AuthFactory;
  // self.useremail = '';
  // self.username = '';



  self.loggedIn = authFactory.checkLoggedIn(); // NOTE: only updated on page load

  authFactory.isLoggedIn()
  .then(function (response) {
    if (response.data.status) {
      self.displayLogout = true;
      authFactory.setLoggedIn(true);
      self.username = response.data;
      self.useremail = response.data.email;
      console.log(response.data);
      console.log(response.data.email);
      checkEmail(response.data.email);

    } else { // is not logged in on server
      self.displayLogout = false;
      authFactory.setLoggedIn(false);
    }
  },
  function () {
    _this.message.text = 'Unable to properly authenticate user';
    _this.message.type = 'error';
  });

    // this function goes to the database, check for email, return the primary key id

    checkEmail = function(email){
    console.log("in check email route on client");
    console.log("checking this email: ", email);

    return $http({
      method: 'GET',
      url: '/private/checkadmin/'+email,
    }).then( function( response ){
      console.log("user info -->", response);
      // self.internid = response.data[0].primarykey;
      console.log("email checked!!!");
      // console.log(self.internid);
      if (response.data.length === 1){
        console.log("successful login, welcome admin");
        window.location = "/#/admin-intern";

      }
      if (response.data.length === 0){
        console.log("You're not an admin, and you will be logged out");
        authFactory.logout()
          .then(function (response) { // success
            authFactory.setLoggedIn(false);
            self.username = '';
            $window.location.href = '/'; // forces a page reload which will update our NavController
          },

          function (response) { // error
            _this.message.text = 'Unable to logout';
            _this.message.type = 'error';
          });
        // authFactory.setLoggedIn(false);
        // authFactory.logout();
        // window.location = "/#/login";

      }
    });
  };

}]);
>>>>>>> master
