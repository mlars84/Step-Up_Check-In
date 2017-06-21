googleAuthApp.service('importExportService', function($http) {
  const vm = this;

  vm.interns = [];

  //function to get all interns from database
  vm.importInterns = function() {
    console.log('in importInterns function');
    $http ({
      method: 'GET',
      url: '/private/importInterns',
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
  vm.searchByLastName = function() {
    console.log('in searchByLastName');
    $http({
      method: 'GET',
      url: ''
    }).then(function() {

    });

  }; //end searchByLastName

}); //end importExportService
