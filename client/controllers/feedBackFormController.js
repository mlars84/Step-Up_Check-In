googleAuthApp.controller('feedBackFormController', ['$http', 'AuthFactory','feedBackFormService', '$mdDialog','$window', function ($http, AuthFactory, feedBackFormService, $mdDialog, $window) {
  //'feedBackFormService'
  console.log('loaded feedBackFormController');
  var vm = this;

  vm.activeQuestions = [];
  authFactory = AuthFactory;
  vm.internid = 0;
  vm.useremail = '';
  vm.username = '';
  // vm.getQuestions();

  vm.getQuestions = function(){
    console.log("in get questions!");
    return $http({
      method: 'GET',
      url: '/private/getQuestions'
    }).then(function(response){
      // console.log("response from server in get Questions", response.data);
      vm.activeQuestions = response.data;
      console.log(vm.activeQuestions);
      for (var i = 0; i < vm.activeQuestions.length; i++) {
        vm.activeQuestions[i].count = i+1;
        vm.activeQuestions[i].group = "group"+(i+1);
      }
      console.log(vm.activeQuestions);
      return response.data;
    });
  }; // end getQuestions


  authFactory.isLoggedIn()
  .then(function (response) {
    if (response.data.status) {
      vm.displayLogout = true;
      authFactory.setLoggedIn(true);
      vm.username = response.data;
      vm.useremail = response.data.email;
      console.log(response.data);
      console.log(response.data.email);
      checkEmail(response.data.email);

    } else { // is not logged in on server
      vm.displayLogout = false;
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
      vm.internid = response.data[0].primarykey;
      console.log("email checked!!!");
      console.log(vm.internid);
    });
  };

  vm.submitFeedback = function(comment, checkbox){

    console.log(comment, checkbox);
    console.log(vm.activeQuestions);
    vm.showAlert("Your feedback has been submitted.");
    var checkbox2 = false;
    if (checkbox === undefined) {
      checkbox2 = false;
    }
    else {
      checkbox2 = true;
    }

    responseToSend = {
      question1id: vm.activeQuestions[0].id,
      question1: vm.activeQuestions[0].data,
      question2id: vm.activeQuestions[1].id,
      question2: vm.activeQuestions[1].data,
      question3id: vm.activeQuestions[2].id,
      question3: vm.activeQuestions[2].data,
      question4id: vm.activeQuestions[3].id,
      question4: vm.activeQuestions[3].data,
      question5id: vm.activeQuestions[4].id,
      question5: vm.activeQuestions[4].data,
      comment: comment,
      checkbox: checkbox2,
      internid: vm.internid
    };
    console.log(responseToSend);

    return $http({
      method: 'POST',
      url: '/private/postresponse',
      data: responseToSend,
    }).then(function(response){
      console.log("response from server in get Questions", response.data);
      authFactory.setLoggedIn(false);
      authFactory.logout();
      $window.location.href = '/#/login'; // forces a page reload which will update our NavController

      return response.data;
    });
  };

  vm.showAlert = function(message) {
    $mdDialog.show(
      $mdDialog.alert()
      .clickOutsideToClose(true)
      .title(message)
      .ariaLabel(message)
      .ok('Ok')
    );
  };

}]); //end feedBackFormController
