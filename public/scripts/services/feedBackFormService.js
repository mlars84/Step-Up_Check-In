googleAuthApp.service('feedBackFormService', ['$http', function($http){
  console.log("feedback form service");
  const vm = this;

//   this.getQuestions = function(){
//     console.log("in get questions");
//     return $http({
//       method: 'GET',
//       url: '/private/getquestions'
//     }).then(function(response){
//       console.log("response from server in get questions: ", response);
//       return response.data;
//     });
//   };
//
//
//
// this.submitFeedback = function(q1, q2, q3, q4, q5, checkbox, comment){
//   console.log("in submit feedback function");
//
//   //gathers data from DOM and sends to server in this object
//
//   //this will need to also grab the question ID
//   var responseToSend = {
//     q1: q1,
//     q2: q2,
//     q3: q3,
//     q4: q4,
//     q5: q5,
//     checkbox: checkbox,
//     comment: comment
//   };
//
//   return $http({
//     method: 'POST',
//     url: '/private/responses',
//     data: responseToSend
//   }).then(function(response){
//     console.log(".then in the submit feedback route");
//     return response;
//   });
// };
}]);
