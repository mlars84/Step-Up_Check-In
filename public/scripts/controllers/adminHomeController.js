googleAuthApp.controller('adminHomeController', ['adminHomeService', function (adminHomeService) {
  console.log('loaded adminHomeController');
  const self = this;

  //getting admin GET info from service
    self.getAllAdmins = adminHomeService.getAdmins;
// console.log(self.getAllAdmins);
}]); //end adminHomeController
