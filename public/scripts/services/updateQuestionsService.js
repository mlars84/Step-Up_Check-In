// NOTE Jim's work
googleAuthApp.service('updateQuestionsService', function($http) {
  console.log('update question from service');

  const vm = this;

  vm.addQuestion = function() {
    console.log('add question button clicked');
    let objectToSend = {
      q_text: vm.questionIn,
    }; // end objectToSend
    console.log('update objectToSend', objectToSend);

    $http({
      method: 'POST',
      url: '/private/updateQuestion',
      data: objectToSend
    }).then(function(res) {
      console.log('back from the server with', response);
    });// end $http
    vm.questionIn="";
    // swal
    swal("Question Added!", "A new question was added to your database!", "success");
  }; // end updateQuestion

}); //end updateQuestionsService
