googleAuthApp.controller('AuthController', function (AuthFactory) {
  const self = this;
  var authFactory = AuthFactory;
  self.loggedIn = authFactory.checkLoggedIn(); // NOTE: only updated on page load
});
