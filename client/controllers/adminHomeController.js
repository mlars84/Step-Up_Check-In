googleAuthApp.controller('adminHomeController', ['adminHomeService', function (adminHomeService) {
  console.log('loaded adminHomeController');
  var vm = this;

  //getting admin GET info from service
  vm.getAdmins = adminHomeService.getAdmins;

  vm.postAdmins = adminHomeService.postAdmins;

  vm.adminObject = adminHomeService.adminObject;

  vm.deleteAdmins = adminHomeService.deleteAdmins;

  vm.clearForm = adminHomeService.clearForm;


}]); //end adminHomeController
