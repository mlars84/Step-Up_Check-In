googleAuthApp.controller('importExportController', ['importExportService', function (importExportService) {
  console.log('loaded importExportController');
  const self = this;

  self.importInterns = importExportService.importInterns;

}]); //end importExportController
