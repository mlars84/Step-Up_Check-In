googleAuthApp.service('adminHomeService', function($http) {
  const vm = this;

      this.getAdmins = function(){
        console.log("in getAdmins");
        return $http({
          method: 'GET',
          url: '/private/getAdmins'
        }).then(function(response){
          console.log( 'response', response);
          return response.data;
        });
      };//end getAdmins
}); //end adminHomeService
