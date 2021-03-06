var googleAuthApp = angular.module('theGoogles', ['ngRoute', 'ngMaterial']);

googleAuthApp.config(['$routeProvider', '$locationProvider','$mdThemingProvider', function ($routeProvider, $locationProvider, $mdThemingProvider) {
  // $locationProvider.html5Mode(true);

//tab palette for angular material
  $mdThemingProvider
    .theme('default')
    .accentPalette('orange');

  $routeProvider
  .when('/login', {
    templateUrl: '/public/views/templates/login.html',
    controller: 'AuthController as auth',
  })
  .when('/admin-home', {
    templateUrl: '/public/views/templates/admin-home.html',
    controller: 'adminHomeController as AHC',
  })
  .when('/admin-intern', {
    templateUrl: '/public/views/templates/admin-intern.html',
    controller: 'adminInternController as AIC',
  })
  .when('/updateQuestions', {
    templateUrl: '/public/views/templates/updateQuestions.html',
    controller: 'updateQuestionsController as UQC',
  })
  .when('/importExport', {
    templateUrl: '/public/views/templates/importExport.html',
    controller: 'importExportController as IEC',
  })
  .when('/feedbackform', {
    templateUrl: '/public/views/templates/feedbackform.html',
    controller: 'feedBackFormController as FBFC',
  })
  .when('/feedbackform2', {
    templateUrl: '/public/views/templates/feedbackform2.html',
    controller: 'feedBackFormController as FBFC',
  })
  .otherwise({
    redirectTo: '/login',
  });

},
]);
