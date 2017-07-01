googleAuthApp.controller('adminHomeController', ['adminHomeService', function (adminHomeService) {
  console.log('loaded adminHomeController');
  const vm = this;

  //getting admin GET info from service
  vm.getAdmins = adminHomeService.getAdmins;
// console.log(self.getAllAdmins);

  vm.postAdmins = adminHomeService.postAdmins;

  vm.adminObject = adminHomeService.adminObject;
  // console.log('self.adminArray');

  vm.deleteAdmins = adminHomeService.deleteAdmins;

  vm.clearForm = adminHomeService.clearForm;


}]); //end adminHomeController
