googleAuthApp.controller('updateQuestionsController', ['updateQuestionsService', function (updateQuestionsService) {
  console.log('loaded updateQuestionsController');
  const self = this; // global variable
  self.addQuestion = updateQuestionsService.addQuestion;// exporting addQuestion from updateQuestionsService.js
  self.sendQuestion = updateQuestionsService.sendQuestion;// exporting sendQuestion from updateQuestionsService.js
  self.grabQuestion = updateQuestionsService.grabQuestion;// exporting grabQuestion from updateQuestionsService.js
}]); //end updateQuestionsController
