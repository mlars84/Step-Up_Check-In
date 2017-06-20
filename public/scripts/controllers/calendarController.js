googleAuthApp.controller('CalendarController', function ($http) {
  console.log('loaded CC');
  const self = this;
  
  self.data = '';

  $http.get('/private/calendar')
    .then(function (response) {
      if (response.data.err) {
        self.data = 'Sorry, you are not logged in!';
      } else {
        self.data = response.data.message;
      }
    });
});
