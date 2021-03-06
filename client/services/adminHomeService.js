googleAuthApp.service('adminHomeService', function($http, $mdDialog) {
  var self = this;

  self.adminObject = {};

  self.postAdmins = function(adminFirst, adminLast, adminEmail) {
    self.getAdmins();
    var adminToSend = {
      firstname: adminFirst,
      lastname: adminLast,
      email: adminEmail,
      active: true
    };
    return $http({
      method: 'POST',
      url: '/private/postAdmins',
      data: adminToSend
    }).then(function(response) {
      self.clearForm();
    }); //end response
  }; //end postAdmins

  self.getAdmins = function() {
    // console.log("in getAdmins");
    return $http({
      method: 'GET',
      url: '/private/getAdmins'
    }).then(function(response) {
      self.adminObject.admins = response.data;
      self.clearForm();
    });
  }; //end getAdmins

  self.deleteAdmins = function(ev, id) {
    var confirm = $mdDialog.confirm()
      .title('Would you like to delete this user from the system?')
      .ariaLabel('Delete admin')
      .targetEvent(ev)
      .ok('Delete Admin User')
      .cancel('Cancel');

    $mdDialog.show(confirm).then(function() {
      self.status = 'Admin User is deleted';
      $http({
        method: 'DELETE',
        url: '/private/deleteAdmins',
        params: {id: id}
      }).then(function(response) {
        self.getAdmins();
      }); //end then
    }, function() {
      self.status = 'user was not deleted, Thank you.';
    }); // end confirm dialogue
  }; //end showconfirm

  //function to clear inputs
  self.clearForm = function() {
    clearForm1.reset();
    clearForm2.reset();
    clearForm3.reset();
  }; //end clearForm

}); //end adminHomeService
