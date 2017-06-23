// NOTE Jim's work
googleAuthApp.controller('updateQuestionsController', ['updateQuestionsService', function (updateQuestionsService) {
  console.log('loaded updateQuestionsController');
  const self = this;

  // exporting updateQuestion, maybe? ref: importExportController.js
  self.addQuestion = updateQuestionsService.addQuestion;

}]); //end updateQuestionsController
