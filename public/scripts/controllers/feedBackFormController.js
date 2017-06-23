googleAuthApp.controller('feedBackFormController', ['$http','feedBackFormService', function ($http, feedBackFormService) {
  //'feedBackFormService'
  console.log('loaded feedBackFormController');
  const self = this;

self.getQuestions = function(){
  console.log("in get questions!");
  return $http({
    method: 'GET',
    url: '/private/getQuestions'
  }).then(function(response){
    console.log("response from server in get Questions", response.data);
    return response.data;
  });
}; // end getQuestions

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

  responseToSend = {
    question1: q1,
    question2: q2,
    question3: q3,
    question4: q4,
    question5: q5,
    comment: comment,
    checkbox: checkbox
  };


  return $http({
    method: 'POST',
    url: '/private/postresponse',
    data: responseToSend,
  }).then(function(response){
    console.log("response from server in get Questions", response.data);
    return response.data;
  });

  // $http.post('/private/feedback')
};



}]); //end feedBackFormController
