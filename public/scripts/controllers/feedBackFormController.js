googleAuthApp.controller('feedBackFormController', ['$http', 'AuthFactory','feedBackFormService', function ($http, AuthFactory, feedBackFormService) {
  //'feedBackFormService'

  console.log('loaded feedBackFormController');
  const self = this;
  self.activeQuestions = [];
  authFactory = AuthFactory;
  self.internid = 0;
  self.useremail = '';
  self.username = '';


self.getQuestions = function(){
  console.log("in get questions!");
  return $http({
    method: 'GET',
    url: '/private/getQuestions'
  }).then(function(response){
    // console.log("response from server in get Questions", response.data);
    self.activeQuestions = response.data;
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
    console.log(response.data);
    console.log(response.data.email);
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


self.checkEmail = function(email, name){
  //go to database, check for email, return the primary key id
  console.log("in check email route on server");
  var emailToSend = {
    name : self.username,
    email : self.useremail
  };
  return $http({
    method: 'GET',
    url: '/private/checkuser',
    data: emailToSend,
  }).then(function(response){
    console.log("response from server in checkuser email thing", response.data);
    return response.data;
  });
};

//we will need to do something with this and authentication to only show on certain pages
  // $http.get('/private/feedback')
  //   .then(function (response) {
  //     if (response.data.err) {
  //       self.data = 'Sorry, you are not logged in!';
  //     } else {
  //       self.data = response.data.message;
  //     }
  //   });

self.submitFeedback = function(q1, q2, q3, q4, q5, comment, checkbox){

  console.log("submitted feedback!");
  console.log(q1);
  console.log(q2);
  console.log(q3);
  console.log(q4);
  console.log(q5);
  console.log(comment);
  console.log(checkbox);

  let checkbox2 = false;

  if (checkbox === undefined) {
    checkbox2 = false;
  }
  else {
    checkbox2 = true;
  }

  responseToSend = {
    question1: q1,
    question2: q2,
    question3: q3,
    question4: q4,
    question5: q5,
    comment: comment,
    checkbox: checkbox2,
    internid: internid
  };

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
