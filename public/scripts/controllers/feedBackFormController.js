googleAuthApp.controller('feedBackFormController', ['feedBackFormService', function ($http, feedBackFormService) {



  //'feedBackFormService'
  console.log('loaded feedBackFormController');
  const self = this;

  let comment = this.comment;
  let checkbox = this.checkbox;
  let q1 = this.q1response;
  let q2 = this.q2response;
  let q3 = this.q3response;
  let q4 = this.q4response;
  let q5 = this.q5response;


//we will need to do something with this and authentication to only show on certain pages
  // $http.get('/private/feedback')
  //   .then(function (response) {
  //     if (response.data.err) {
  //       self.data = 'Sorry, you are not logged in!';
  //     } else {
  //       self.data = response.data.message;
  //     }
  //   });

this.submitFeedback = function(q1, q2, q3, q4, q5, comment, checkbox){

  console.log("submitted feedback!");
  console.log(q1);
  console.log(q2);
  console.log(q3);
  console.log(q4);
  console.log(q5);

  // console.log(q1, q2, q3, q4, q5, comment, checkbox);

  // $http.post('/private/feedback')
};



}]); //end feedBackFormController
