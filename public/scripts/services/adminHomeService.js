googleAuthApp.service('adminHomeService', function($http, $mdDialog) {
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

 self.deleteAdmins = function(ev, id) {
  var confirm = $mdDialog.confirm()
        .title('Would you like to delete this admin user from the system?')
        .ariaLabel('Delete admin')
        .targetEvent(ev)
        .ok('Delete Admin User')
        .cancel('Cancel');

  $mdDialog.show(confirm).then(function() {
    self.status = 'Admin User is deleted';
    $http({
      method: 'DELETE',
      url: '/private/deleteAdmins',
      params: {id : id}
    }).then(function(response) {
      console.log(response);
      self.getAdmins();
    }); //end then
  }, function() {
    self.status = 'user was not deleted, Thank you.';
  });// end confirm dialogue
}; //end showconfirm


// self.deleteAdmins = function(id) {
//  console.log('in deleteAdmins');
//  $http({
//    method: 'DELETE',
//    url: '/private/deleteAdmins',
//    params: {id : id}
//  }).then(function(response) {
//    console.log(response);
//    self.getAdmins();
//  }); //end then
//  };
}); //end adminHomeService
