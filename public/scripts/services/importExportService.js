googleAuthApp.service('importExportService', ['$http', '$mdDialog', function($http, $mdDialog) {
  const self = this;

  self.interns = [];
  self.lastNameMatch = {name: []};
  self.internCSV = [];

  //function for mdDialog alerts
  self.showAlert = function(message) {
    $mdDialog.show(
      $mdDialog.alert()
      .clickOutsideToClose(true)
      .title(message)
      .ariaLabel(message)
      .ok('Ok')
    );
  }; //end showAlert

  self.sendCSV = function(csv) {
    let csvToPost = {};
    csvToPost.fileContent = csv;
    $http.post('/private/sendCSV', csvToPost).then(function(response) {
      self.importInterns();
      console.log(response.data);
      self.showAlert(response.data);
    });
  };

  //function to get all interns from database after CSV has been uploaded
  self.importInterns = function() {
    console.log('in importInterns function');
    $http ({
      method: 'GET',
      url: '/private/importInterns'
    }).then(function(res) {
      self.showAlert(res.data);
      console.log(res.data);
      for (var i = 0; i < res.data.length; i++) {
        console.log(res.data[i]);
      }
    });
  }; // end importInterns GET function

  //function to export all intern response data
  self.exportResponseData = function() {
    console.log('in exportResponseData function');
    $http({
      method: 'GET',
      url: '/private/exportResponseData/'
    }).then(function(res) {
      console.log(res.data);
      window.open('/private/exportResponseData/');
    });
  }; //end exportResponseData

  //function to search for interns by lastname
  self.searchByLastName = function(lastName) {
    console.log('in searchByLastName', lastName);
    $http({
      method: 'GET',
      url: '/private/searchByLastName/' + lastName
    }).then(function(res) {
      console.log(res.data);
      self.lastNameMatch.name = [];
      for (var i = 0; i < res.data.length; i++) {
        console.log(res. data[i].last_name, lastName);
        if(res.data[i].last_name === lastName){
          self.lastNameMatch.name.push(res.data[i]);
          console.log("self.lastNameMatch =>", self.lastNameMatch);
        }
      }
    });
  }; //end searchByLastName

  //function to completely remove an intern from the database
  self.removeIntern = function(ev, primarykey, lastname) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
      .title('Would you like to remove this intern?')
      .textContent('They will be permanently removed from the system.')
      .ariaLabel('Lucky day')
      .targetEvent(ev)
      .ok('Please do it!')
      .cancel('Cancel!');
    $mdDialog.show(confirm).then(function() {
      self.status = 'You deleted the intern.';
      $http({
        method: 'DELETE',
        url: '/private/removeIntern',
        params: { primarykey: primarykey }
      }).then(function(res) {
        console.log(res.data);
        self.searchByLastName(lastname);
        self.clearForm();
      });
    }, function() {
      self.status = 'You decided to keep the intern.';
    });
  }; //end removeIntern

  //function to edit an intern's phone number
  self.editPhone = function(primarykey, phone) {
    console.log('in editPhone function =>', phone);
    let internToEdit = {
      primarykey: primarykey,
      phone: phone
    };
    console.log(internToEdit);
    $http({
      method: 'PUT',
      url: '/private/editPhone',
      data: internToEdit
    }).then(function(res) {
      console.log('editPhone =>', res.data);
      self.phoneIn = '';
      self.searchByLastName();
      self.showAlert('New phone number saved!');
      self.clearForm();
    }); //end editPhone PUT
  }; //end editPhone function

  //function to clear input on button clicks
  self.clearForm = function() {
    clearForm.reset();
  }; //end clearForm

}]); //end importExportService
