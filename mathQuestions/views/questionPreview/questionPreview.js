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
  $scope.availableTopics = [
    {id:1, description:'number bonds to 5'},
    {id:2, description:'number bonds to 10'},
    {id:3, description:'number bonds to 20'},
    {id:4, description:'number bonds to 100'}
    
];

  setInterval(function(){
    questionGenerator.generate(
    {
                topicClass : "mentalStrategies",
                topicId    : $scope.topicId
    },
    function(err,question){
      $scope.$apply(function(){
        $scope.question=question;
      });      
    });
  },500);
}]);
