googleAuthApp.service('importExportService', ['$http', '$mdDialog', function($http, $mdDialog) {
  const self = this;

  self.interns = [];
  self.lastNameMatch = {name: []};
  self.internCSV = [];

  self.showAlert = function(message) {
    $mdDialog.show(
      $mdDialog.alert()
      .clickOutsideToClose(true)
      .title(message)
      .ariaLabel(message)
      .ok('Ok')
    );
  };

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
  }; //end exportResponseData

  //function to search for interns by lastname
  self.searchByLastName = function(lastName) {
    console.log('in searchByLastName');
    let lastNameToSearchBy = lastName;
    console.log(lastNameToSearchBy);
    $http({
      method: 'GET',
      url: '/private/searchByLastName'
    }).then(function(res) {
      console.log(res.data);
      for (var i = 0; i < res.data.length; i++) {
        console.log(res. data[i].last_name, lastNameToSearchBy);
        if(res.data[i].last_name === lastNameToSearchBy){
          self.lastNameMatch.name.push(res.data[i]);
          console.log("self.lastNameMatch =>", self.lastNameMatch);
        }
      }
    });
  }; //end searchByLastName

  // function to completely remove an intern from the database
  self.removeIntern = function(primarykey) {
    console.log('in removeIntern');
    $http({
      method: 'DELETE',
      url: '/private/removeIntern',
      params: { primarykey: primarykey }
    }).then(function(res) {
      console.log(res.data);
    }); //end removeIntern DELETE)
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
    }); //end editPhone PUT
  }; //end editPhone function

}]); //end importExportService
