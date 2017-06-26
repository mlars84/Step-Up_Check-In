googleAuthApp.controller('adminInternController', ['$http','adminInternService', function ($http, adminInternService) {
  console.log('loaded adminInternController');
  const self = this;
  self.internData = [];

  // self.getData = function(){
  //   console.log("in get data!");
  //
  //   return $http({
  //     method: 'GET',
  //     url: '/private/interndata'
  //   }).then(function(response){
  //     console.log("response from server in get Intern Data: ", response.data);
  //     self.internData = response.data;
  //
  //     return response.data;
  //   });
  // }; // end getData


  self.getComments = function(){
    console.log("in get comments!");
    self.comments = [];

    return $http({
      method: 'GET',
      url: '/private/getComments'
    }).then(function(response){
      console.log("response from server in get Intern Comments: ", response.data);
      self.comments = response.data;

      return response.data;
    });
  }; // end getData

  self.getCheckbox = function(){
    console.log("in get checkbox!");
    self.checkbox = [];

    return $http({
      method: 'GET',
      url: '/private/getCheckbox'
    }).then(function(response){
      console.log("response from server in get Intern Checkbox: ", response.data);
      self.checkbox = response.data;

      return response.data;
    });
  }; // end getCheckbox

  self.getFlags = function(){
    console.log("in get responses!");
    self.flags = [];

    return $http({
      method: 'GET',
      url: '/private/getFlags'
    }).then(function(response){
      console.log("response from server in get Intern Flagged Questions: ", response.data);
      self.flags = response.data;

      return response.data;
    });
  }; // end getCheckbox

  // go to database and get intern data
  // - how many interns in each category? achieve, discover
  // - how many of those interns have filled out their feedback form?
  //
  // - get all interns who want to be contacted (firstname, lastname, phone)
  // - get all interns who have chosen 1 or 2 in flagged Questions
  // - get all comments from interns
  self.getComments();
  self.getCheckbox();
  self.getFlags();
}]); //end adminInternController
