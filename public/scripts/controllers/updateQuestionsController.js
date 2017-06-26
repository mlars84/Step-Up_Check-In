googleAuthApp.controller('updateQuestionsController', ['updateQuestionsService', function (updateQuestionsService) {
  console.log('loaded updateQuestionsController');
  const vm = this; // global variable
  vm.addQuestion = updateQuestionsService.addQuestion;// exporting addQuestion from updateQuestionsService.js
  vm.sendQuestion = updateQuestionsService.sendQuestion;// exporting sendQuestion from updateQuestionsService.js
  vm.questionCont = updateQuestionsService.questionCont;// exporting grabQuestion from updateQuestionsService.js
  // vm.userQuestion = '';
}]); //end updateQuestionsController
