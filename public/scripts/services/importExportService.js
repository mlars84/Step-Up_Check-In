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

}); //end importExportService
