googleAuthApp.service('adminHomeService', function($http) {
  const vm = this;

  vm.adminArray = [];

  this.getAdmins = function(firstname, lastname, email) {
    console.log("in getAdmins");
    return $http({
      method: 'GET',
      url: '/private/getAdmins'
    }).then(function(response) {
      console.log('response', response);
      for (var i = 0; i < response.data.length; i++) {
        console.log(response.data[i]);
      }//end for
    });
  }; //end getAdmins

  //admin to send info
  var adminToSend = {
    firstname: firstname,
    lastname: lastname,
    email: email,
    active: active,
  };
  this.postAdmins = function() {
    console.log("in postAdmins");
    return $http({
      method: 'POST',
      url: '/private/postAdmins',
      data: adminToSend
    }).then(function(response) {
      console.log('postAdmins to send response', response);
      return response;
    }); //end response
  };//end postAdmins
}); //end adminHomeService
