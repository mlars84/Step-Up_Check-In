googleAuthApp.controller('importExportController', ['importExportService', function (importExportService) {
  console.log('loaded importExportController');
  const self = this;

  self.uploadInterns = importExportService.uploadInterns;
  self.importInterns = importExportService.importInterns;

  self.exportResponseData = importExportService.exportResponseData;

  self.searchByLastName = importExportService.searchByLastName;
  self.lastNameIn = importExportService.lastNameIn;
  self.lastNameMatch = importExportService.lastNameMatch;

  self.removeIntern = importExportService.removeIntern;
  self.editPhone = importExportService.editPhone;
  self.showConfirm = importExportService.showConfirm;
  self.confirm = importExportService.confirm;

}]); //end importExportController
