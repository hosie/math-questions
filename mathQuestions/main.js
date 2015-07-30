'use strict';

// Declare app level module which depends on views, and components
angular.module('MathQuestions', [
  'ngRoute',
  'MathQuestions.worksheet',
  'MathQuestions.questionPreview',
  'GreatMath.mental-strategy-questions',
  'GreatMath.times-table-questions'
])
.config(['$routeProvider', function($routeProvider) {
  
  $routeProvider.when('/main', {
    templateUrl: 'views/main/main.html'
  });
}])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/main'});
}]);
