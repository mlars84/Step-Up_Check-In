googleAuthApp.service('updateQuestionsService', ['$http', '$mdDialog', function($http, $mdDialog) {
  console.log('update question from service');
  //global
  var self = this;
  self.questionCont = {};

  // angular alert dialog
  self.showAlert = function(message) {
    $mdDialog.show(
      $mdDialog.alert()
      .clickOutsideToClose(true)
      .title(message)
      .ariaLabel(message)
      .ok('Ok')
    );
  };

  // begin addQuestion
  self.addQuestion = function(ev, question, flaggedIn) {
    if(flaggedIn === undefined){
      flaggedIn = false;
    }// end if
    var objectToSend = {
      q_text: question,
      active: false,
      flagged: flaggedIn
    }; // end objectToSend
    console.log('update objectToSend', objectToSend);
    var confirm = $mdDialog.confirm()
      .title('Add Question to System?')
      .textContent('Question will be added to System.')
      .ariaLabel('Lucky day')
      .targetEvent(ev)
      .ok('ADD')
      .cancel('Cancel');
    $mdDialog.show(confirm).then(function() {
    self.status = 'Question was not ADDED!';
    $http({
      method: 'POST',
      url: '/private/addQuestion',
      data: objectToSend
    }).then(function(response) {
      self.clearForm();
    });// end $http

    }, function() {
      self.status = 'Question Added!';
    });// end angular alert
  }; // end updateQuestion


  // begin sendQuestion
  self.sendQuestion = function (ev){
    var confirm = $mdDialog.confirm()
      .title('Send Feedback Link?')
      .textContent('SMS will be sent to Interns.')
      .ariaLabel('Lucky day')
      .targetEvent(ev)
      .ok('Send')
      .cancel('Cancel');
    $mdDialog.show(confirm).then(function() {
      self.status = 'Feedback Link NOT sent!';
    $http({
      method: 'GET',
      url: '/private/sendQuestion',
    }).then(function(response){
      console.log('response.data for send question', response.data);
    }); // end $http
  }, function() {
    self.status = 'Feedback Link Sent!';
  });
  };// end sendQuestion

  // begin grabQuestion
  self.grabQuestion = function(){
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

  self.submitQuestion = function (ev, active1In, active2In, active3In){
    var questionToSubmit = {
      active1: active1In,
      active2: active2In,
      active3: active3In,
    };// end questionToSubmit
    $http({
      method: 'PUT',
      url: '/private/submitQuestion',
      data: questionToSubmit
    }).then(function(response){
      self.showAlert('Feedback Form Created.');
    });
  };// end submitQuestion

  //function that clears form inputs after submit click
  self.clearForm = function() {
    clearForm.reset();
  }; //end clearForm function

}]); //end updateQuestionsService
