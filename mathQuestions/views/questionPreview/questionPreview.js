'use strict';

angular.module('MathQuestions.questionPreview', ['ngRoute','GreatMath.question-generator'])

.config(['$routeProvider', function($routeProvider) {
  
  $routeProvider.when('/questionPreview', {
    templateUrl: 'views/questionPreview/questionPreview.html',
    controller: 'QuestionPreviewController'
  });
}])

.controller('QuestionPreviewController', ['$scope','questionGenerator',function($scope,questionGenerator) {
  $scope.topicId=1;
  setInterval(function(){
    questionGenerator.generate($scope.topicId,function(err,question){
      $scope.$apply(function(){
        $scope.question=question;
      });      
    });
  },500);
}]);
