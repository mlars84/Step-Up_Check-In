// NOTE Jim's work
googleAuthApp.service('updateQuestionsService', function($http) {
  console.log('update question from service');

  const vm = this;

  vm.addQuestion = function() {
    console.log('add question button clicked');
    let objectToSend = {
      q_text: vm.questionIn,
      flagged: vm.flaggedIn,
      q_type: vm.typeIn
    }; // end objectToSend
    console.log('update objectToSend', objectToSend);

    $http({
      method: 'GET',
      url: '/private/updateQuestion',
      data: objectToSend
    }).then(function(res) {
      console.log('this is the response for get ');
    })
  }; // end updateQuestion

}); //end updateQuestionsService
