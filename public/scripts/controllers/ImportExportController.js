googleAuthApp.controller('importExportController', ['importExportService', function (importExportService) {
  console.log('loaded importExportController');
  const self = this;

  self.importInterns = importExportService.importInterns;

  self.exportResponseData = importExportService.exportResponseData;

  self.searchByLastName = importExportService.searchByLastName;
  self.lastNameIn = importExportService.lastNameIn;

}]); //end importExportController
