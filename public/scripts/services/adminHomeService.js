googleAuthApp.service('adminHomeService', function($http) {
  const vm = this;

  vm.adminArray = [];

  vm.getAdmins = function(firstname, lastname, email) {
    console.log("in getAdmins");
    return $http({
      method: 'GET',
      url: '/private/getAdmins'
    }).then(function(response) {
      console.log('response =>', response.data);
      for (var i = 0; i < response.data.length; i++) {
        console.log(response.data[i]);
        vm.adminArray.push(response.data[i]);
        console.log(vm.adminArray);
      }//end for
    });
  }; //end getAdmins
  //admin to send info

  vm.postAdmins = function(adminFirst, adminLast, adminEmail) {
    console.log("in postAdmins");
    var adminToSend = {
      firstname: adminFirst,
      lastname: adminLast,
      email: adminEmail,
      active: true
    };
    console.log("adminToSend =>", adminToSend);
    return $http({
      method: 'POST',
      url: '/private/postAdmins',
      data: adminToSend
    }).then(function(response) {
      console.log('postAdmins to send response', response.data);
      // return response;
    }); //end response
  };//end postAdmins
}); //end adminHomeService
