googleAuthApp.controller('feedBackFormController', ['$http', 'AuthFactory','feedBackFormService', function ($http, AuthFactory, feedBackFormService) {
  //'feedBackFormService'

  console.log('loaded feedBackFormController');
  const self = this;
  self.activeQuestions = [];
  authFactory = AuthFactory;
  self.internid = 0;
  self.useremail = '';
  self.username = '';
  // self.getQuestions();


self.getQuestions = function(){
  console.log("in get questions!");
  return $http({
    method: 'GET',
    url: '/private/getQuestions'
  }).then(function(response){
    // console.log("response from server in get Questions", response.data);
    self.activeQuestions = response.data;
    console.log(self.activeQuestions);
    for (var i = 0; i < self.activeQuestions.length; i++) {
      self.activeQuestions[i].count = i+1;
      self.activeQuestions[i].group = "group"+(i+1);
    }
    console.log(self.activeQuestions);
    return response.data;
  });
}; // end getQuestions


// Getting user name and email from auth, we still need to go to the database, lookup by email,
//find primary key id, bring back to client, then send intern ID with response
authFactory.isLoggedIn()
.then(function (response) {
  if (response.data.status) {
    self.displayLogout = true;
    authFactory.setLoggedIn(true);
    self.username = response.data;
    self.useremail = response.data.email;
    console.log(response.data);
    console.log(response.data.email);
    checkEmail(response.data.email);
    // console.log("IS THIS THE USER?!?! ->", self.username);

  } else { // is not logged in on server
    self.displayLogout = false;
    authFactory.setLoggedIn(false);
  }
},
function () {
  _this.message.text = 'Unable to properly authenticate user';
  _this.message.type = 'error';
});

  // this function goes to the database, check for email, return the primary key id

  checkEmail = function(email){
  console.log("in check email route on client");
  console.log("checking this email: ", email);

  return $http({
    method: 'GET',
    url: '/private/checkemail/'+email,
  }).then( function( response ){
    console.log("student id -->", response.data[0].primarykey);
    self.internid = response.data[0].primarykey;
    console.log("email checked!!!");
    console.log(self.internid);
  });
};

self.submitFeedback = function(comment, checkbox){

  console.log(comment, checkbox);
  console.log(self.activeQuestions);

  let checkbox2 = false;
  if (checkbox === undefined) {
    checkbox2 = false;
  }
  else {
    checkbox2 = true;
  }

  responseToSend = {
    question1id: self.activeQuestions[0].id,
    question1: self.activeQuestions[0].data,
    question2id: self.activeQuestions[1].id,
    question2: self.activeQuestions[1].data,
    question3id: self.activeQuestions[2].id,
    question3: self.activeQuestions[2].data,
    question4id: self.activeQuestions[3].id,
    question4: self.activeQuestions[3].data,
    question5id: self.activeQuestions[4].id,
    question5: self.activeQuestions[4].data,
    comment: comment,
    checkbox: checkbox2,
    internid: self.internid
  };
  console.log(responseToSend);

  return $http({
    method: 'POST',
    url: '/private/postresponse',
    data: responseToSend,
  }).then(function(response){
    console.log("response from server in get Questions", response.data);
    return response.data;
  });
};



}]); //end feedBackFormController
