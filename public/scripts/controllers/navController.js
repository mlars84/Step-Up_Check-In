googleAuthApp.controller('NavController', ['$scope', 'AuthFactory', '$window', '$location', function ($scope, AuthFactory, $window, $location) {
  var _this = this;
  var authFactory = AuthFactory;
  $scope.$location = $location;
  _this.displayLogout = false; // should we display the logout option on the DOM?
  _this.message = {
    text: false,
    type: 'info',
  };

  authFactory.isLoggedIn()
  .then(function (response) {
    if (response.data.status) {
      _this.displayLogout = true;
      _this.navBar = true;
      _this.toolbar = true;
      authFactory.setLoggedIn(true);
      _this.username = response.data.name;
      // window.location = "/#/admin-intern";

    } else { // is not logged in on server
      _this.displayLogout = false;
      authFactory.setLoggedIn(false);
    }
  },

  function () {
    _this.message.text = 'Unable to properly authenticate user';
    _this.message.type = 'error';
  });

  _this.logout = function () {
    authFactory.logout()
      .then(function (response) { // success
        authFactory.setLoggedIn(false);
        _this.username = '';
        $window.location.href = '/'; // forces a page reload which will update our NavController
      },

      function (response) { // error
        _this.message.text = 'Unable to logout';
        _this.message.type = 'error';
      });
  };

}]);
