googleAuthApp.service('importExportService', function($http) {
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
  vm.removeIntern = function() {
    console.log('in removeIntern');
  }; //end removeIntern

}); //end importExportService
