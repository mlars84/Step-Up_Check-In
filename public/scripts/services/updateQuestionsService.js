googleAuthApp.service('updateQuestionsService', function($http) {
  console.log('update question from service');
  //global
  const vm = this;

  // begin addQuestion
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
    // NOTE not clearing input after adding question
    questionIn="";
    // NOTE swal
    // swal("Question Added!", "A new question was added to your database!", "success");
  }; // end updateQuestion

  // begin sendQuestion
  vm.sendQuestion = function (){
    console.log('Send Question button clicked!');
    $http({
      method: 'GET',
      url: '/private/sendQuestion',
    }).then(function(response){
      for (var i = 0; i < response.data.length; i++) {
        console.log('response.data.[i].phone --->', response.data[i].phone);
      }// end for loop
      // vm.sendLink(response.data[i].data);
    }); // end $http
  };// end sendQuestion

}); //end updateQuestionsService

// // begin sendQuestion
// vm.sendQuestion = function (phone){
//   console.log('Send Question button clicked!', phone);
//   let questionToSend = {
//     phone: "+1" + phone
//   };// end questionToSend
//   console.log('question to send', questionToSend);
//   $http({
//     method: 'POST',
//     url: '/private/sendQuestion',
//     data: questionToSend
//   }).then(function success(res){
//     console.log('res->', res);
//   });// end $http
// };// end sendQuestion
