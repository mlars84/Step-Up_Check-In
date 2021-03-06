googleAuthApp.controller('adminHomeController', ['adminHomeService', function (adminHomeService) {
  console.log('loaded adminHomeController');
  var vm = this;

  vm.getAdmins = adminHomeService.getAdmins;

  vm.postAdmins = adminHomeService.postAdmins;

  vm.deleteAdmins = adminHomeService.deleteAdmins;

  vm.adminObject = adminHomeService.adminObject;

  vm.clearForm = adminHomeService.clearForm;


}]); //end adminHomeController
