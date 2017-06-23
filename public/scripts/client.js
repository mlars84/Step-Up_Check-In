var googleAuthApp = angular.module('theGoogles', ['ngRoute', 'ngMaterial']);

googleAuthApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  // $locationProvider.html5Mode(true);

  $routeProvider
  .when('/login', {
    templateUrl: '/public/views/templates/login.html',
    controller: 'AuthController',
    controllerAs: 'auth',
  })
  .when('/admin-home', {
    templateUrl: '/public/views/templates/admin-home.html',
    controller: 'adminHomeController',
    controllerAs: 'AHC',
  })
  .when('/admin-intern', {
    templateUrl: '/public/views/templates/admin-intern.html',
    controller: 'adminInternController',
    controllerAs: 'AIC',
  })
  .when('/updateQuestions', {
    templateUrl: '/public/views/templates/updateQuestions.html',
    controller: 'updateQuestionsController',
    controllerAs: 'UQC',
  })
  .when('/importExport', {
    templateUrl: '/public/views/templates/importExport.html',
    controller: 'importExportController',
    controllerAs: 'IEC',
  })
  .when('/feedbackform', {
    templateUrl: '/public/views/templates/feedbackform.html',
    controller: 'feedBackFormController',
    controllerAs: 'FBFC',
  })
  .otherwise({
    redirectTo: '/login',
  });
},
]);
