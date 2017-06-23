googleAuthApp.service('importExportService', ['$http', '$mdDialog', function($http, $mdDialog) {
  const vm = this;

  vm.interns = [];
  vm.lastNameMatch = {name: []};

  //function to get all interns from database
  vm.importInterns = function() {
    console.log('in importInterns function');
    $http ({
      method: 'GET',
      url: '/private/importInterns'
    }).then(function(res) {
      console.log(res.data);
      for (var i = 0; i < res.data.length; i++) {
        console.log(res.data[i]);
      }
    });
  }; // end importInterns POST function

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

  //function to completely remove an intern from the database
  // vm.removeIntern = function(primarykey) {
  //   console.log('in removeIntern');
  //
  //   vm.showConfirm = function(ev) {
  //     // Appending dialog to document.body to cover sidenav in docs app
  //     var confirm = $mdDialog.confirm()
  //     .title('Are you sure you want to remove this intern?')
  //     .textContent('They will be permanently deleted from the system.')
  //     .ariaLabel('Lucky day')
  //     .targetEvent(ev)
  //     .ok('I am sure!', $http({
  //       method: 'DELETE',
  //       url: '/private/removeIntern',
  //       params: { primarykey: primarykey }
  //     }).then(function(res) {
  //       console.log(res.data);
  //     })); //end removeIntern DELETE)
  //     .cancel('Cancel');
  //     $mdDialog.show(confirm).then(function() {
  //       vm.status = 'You decided to get rid of your debt.';
  //     }, function() {
  //       vm.status = 'You decided to keep your debt.';
  //     });
  //   };
  //
  // }; //end removeIntern

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
