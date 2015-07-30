'use strict';

// Declare app level module which depends on views, and components
angular.module('Previews', [
  'ngRoute',
  'MathQuestions.worksheet.preview'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/worksheet'});
}]);
