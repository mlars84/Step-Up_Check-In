var googleAuthApp = angular.module('theGoogles', ['ngRoute']);

googleAuthApp.config(['$routeProvider', function ($routeProvider) {

  $routeProvider
  .when('/admin-home', {
    templateUrl: '/public/views/templates/admin-home.html',
    controller: 'adminHomeController',
    controllerAs: 'AHC',
  })
  .when('admin-intern', {
    templateUrl: '/public/views/templates/admin-intern.html',
    controller: 'adminInternController',
    controllerAs: 'AIC',
  })
  .when('updateQuestions', {
    templateUrl: '/public/views/templates/updateQuestions.html',
  controller: 'updateQuestionsController',
    controllerAs: 'UQC',
  })
  .when('importExport', {
    templateUrl: '/public/views/templates/importExport.html',
  controller: 'importExportController',
    controllerAs: 'IEC',
  })
  .when('/calendar', {
    templateUrl: '/public/views/templates/calendar.html',
    controller: 'CalendarController',
    controllerAs: 'calendar',
  })
  .when('/login', {
    templateUrl: '/public/views/templates/login.html',
    controller: 'AuthController',
    controllerAs: 'auth',
  })
  .when('/feedbackform', {
    templateUrl: '/public/views/templates/feedbackform.html',
    controller: 'feedBackFormController',
    controllerAs: 'FBFC',
  })
  .otherwise({
    redirectTo: 'login',
  });
},
]);
