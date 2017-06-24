googleAuthApp.controller('adminHomeController', ['adminHomeService', function (adminHomeService) {
  console.log('loaded adminHomeController');
  const self = this;

  //getting admin GET info from service
  self.getAdmins = adminHomeService.getAdmins;
// console.log(self.getAllAdmins);

  self.postAdmins = adminHomeService.postAdmins;
  self.adminArray = adminHomeService.adminArray;
  console.log('self.adminArray');

  self.deleteAdmins = function(id){
    adminHomeService.deleteAdmins(id).then(function(){
      self.getAdmins();
  });
};

// console.log(self.postAllAdmins);
}]); //end adminHomeController
