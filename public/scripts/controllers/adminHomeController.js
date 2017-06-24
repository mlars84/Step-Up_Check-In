googleAuthApp.controller('adminHomeController', ['adminHomeService', function (adminHomeService) {
  console.log('loaded adminHomeController');
  const self = this;

  //getting admin GET info from service
  self.getAdmins = adminHomeService.getAdmins;
// console.log(self.getAllAdmins);

  self.postAdmins = adminHomeService.postAdmins;
  self.adminArray = adminHomeService.adminArray;

  self.deleteAdmins = adminHomeService.deleteAdmins;

// console.log(self.postAllAdmins);
}]); //end adminHomeController
