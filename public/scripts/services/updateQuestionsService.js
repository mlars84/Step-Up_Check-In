googleAuthApp.service('updateQuestionsService', function($http) {
  console.log('update question from service');
  //global
  const self = this;
  self.questionCont = {};

  // begin addQuestion
  self.addQuestion = function(questionIn, flaggedIn) {
    console.log('add question button clicked', questionIn);
    if(flaggedIn === undefined){
      flaggedIn = false;
    }
    let objectToSend = {
      q_text: questionIn,
      active: false,
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
    // self.questionIn="";
    // self.true="";
    // self.flaggedIn="";
    // NOTE swal
    // swal("Question Added!", "A new question was added to your database!", "success");
  }; // end updateQuestion

  // begin sendQuestion
  self.sendQuestion = function (){
    console.log('Send Question button clicked!');
    $http({
      method: 'GET',
      url: '/private/sendQuestion',
    }).then(function(response){
      console.log('response.data for send question', response.data);
    }); // end $http
    // REVIEW SWAL
    swal("Feedback Link Sent!", "A link to the feedback form was has beed sent to interns!", "success");
  };// end sendQuestion

  // begin grabQuestion
  self.grabQuestion = function(){
    console.log('grabing question function running');
    $http({
      method: 'GET',
      url: '/private/grabQuestion'
    }).then(function(response){
      console.log('grabbing questions ----->', response.data);
      self.questionCont.questions = response.data;
      console.log('self.questionCont --->', self.questionCont);
    });// end $http
  };// end grabQuestion

  // NOTE
  self.grabQuestion(); // call function in order to see questions being grab

  self.submitQuestion = function (){
    console.log('Submit Question button clicked!');
    let questionToSubmit = {
      active: true
    };// end questionToSubmit
    console.log('questionToSubmit->', questionToSubmit);
    $http({
      method: 'PUT',
      url: '/private/submitQuestion',
      data: questionToSubmit
    }).then(function(response){
      console.log('active/inactive->', response.data);
    });
  };// end submitQuestion

}); //end updateQuestionsService
