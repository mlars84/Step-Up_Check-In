googleAuthApp.service('updateQuestionsService', function($http) {
  console.log('update question from service');

  const vm = this;

  vm.addQuestion = function(questionIn, flaggedIn) {
    console.log('add question button clicked', questionIn);
    if(flaggedIn === undefined){
      flaggedIn = false;
    }
    let objectToSend = {
      q_text: questionIn,
      active: true,
      flagged: flaggedIn
    }; // end objectToSend
    console.log('update objectToSend', objectToSend);

    $http({
      method: 'POST',
      url: '/private/addQuestion',
      data: objectToSend
    }).then(function(res) {
      console.log('back from the server with', res.data);
    });// end $http
    questionIn="";
    // NOTE swal
    // swal("Question Added!", "A new question was added to your database!", "success");
  }; // end updateQuestion

}); //end updateQuestionsService
