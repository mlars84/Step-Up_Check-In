googleAuthApp.service('adminHomeService', function($http) {
  const self = this;

  self.adminObject = {};

  self.getAdmins = function() {
    console.log("in getAdmins");
    return $http({
      method: 'GET',
      url: '/private/getAdmins'
    }).then(function(response) {
      console.log('response =>', response.data);
      self.adminObject.admins = response.data;
      // for (var i = 0; i < response.data.length; i++) {
      //   console.log('this is the response log',response.data[i]);
      //   vm.adminArray.push(response.data[i]);
      //   console.log('vm.adminArray',vm.adminArray);
      // return response.data;
      // }//end for
    });
  }; //end getAdmins

  //admin to send info
  self.postAdmins = function(adminFirst, adminLast, adminEmail) {
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
      self.getAdmins();
    }); //end response
  }; //end postAdmins

  self.deleteAdmins = function(id) {
    console.log('in deleteAdmins');
    $http({
      method: 'DELETE',
      url: '/private/deleteAdmins',
      params: {id : id}
    }).then(function(response) {
      console.log(response);
      self.getAdmins();
    });
  }; //end deleteAdmins

}); //end adminHomeService
