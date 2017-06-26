googleAuthApp.service('importExportService', ['$http', '$mdDialog', function($http, $mdDialog) {
  const vm = this;

  vm.interns = [];
  vm.lastNameMatch = {name: []};
  vm.internCSV = [];

  vm.showAlert = function(message) {
     $mdDialog.show(
       $mdDialog.alert()
         .clickOutsideToClose(true)
         .title(message)
         .ariaLabel(message)
         .ok('Ok')
     );
 };

 // uploadInterns = function(internCSV) {
 //   console.log('uploading interns CSV', internCSV);
 //   $http ({
 //     method: 'POST',
 //     url: '/private/uploadInterns',
 //     data: internCSV
 //   }).then(function(res) {
 //    console.log(res.data);
 //   });
 // };

 vm.sendCSV = function(csv) {
    var csvToPost = {};
    csvToPost.fileContent = csv;
    $http.post('/private/sendCSV', csvToPost).then(function(response) {
      vm.showAlert(response.data);
    });
  };

  //function to get all interns from database
  // vm.importInterns = function() {
  //   console.log('in importInterns function');
  //   $http ({
  //     method: 'GET',
  //     url: '/private/importInterns'
  //   }).then(function(res) {
  //     vm.showAlert(res.data);
  //     console.log(res.data);
  //     for (var i = 0; i < res.data.length; i++) {
  //       console.log(res.data[i]);
  //     }
  //   });
  // }; // end importInterns POST function

  //function to export all intern response data
  vm.exportResponseData = function() {
    console.log('in exportResponseData function');
  }; //end exportResponseData

  //function to search for interns by lastname
  vm.searchByLastName = function(lastName) {
    console.log('in searchByLastName');
    lastNameToSearchBy = lastName;
    console.log(lastNameToSearchBy);
    $http({
      method: 'GET',
      url: '/private/searchByLastName',
    }).then(function(res) {
      // console.log(res.data);
      for (var i = 0; i < res.data.length; i++) {
        // console.log(res.data[i].last_name, lastNameToSearchBy);
        if(res.data[i].last_name === lastNameToSearchBy){
          vm.lastNameMatch.name.push(res.data[i]);
          console.log("vm.lastNameMatch =>", vm.lastNameMatch);
        }
      }
    });
  }; //end searchByLastName

  // function to completely remove an intern from the database
  vm.removeIntern = function(primarykey) {
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
  vm.editPhone = function(primarykey, phone) {
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
