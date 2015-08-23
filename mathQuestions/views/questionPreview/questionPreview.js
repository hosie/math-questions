'use strict';

angular.module('MathQuestions.questionPreview', ['ngRoute','GreatMath.question-generator'])

.config(['$routeProvider', function($routeProvider) {
  
  $routeProvider.when('/questionPreview', {
    templateUrl: 'views/questionPreview/questionPreview.html',
    controller: 'QuestionPreviewController'
  });
}])

.controller('QuestionPreviewController', ['$scope','$sce','questionGenerator','topicRegistry',function($scope,$sce,questionGenerator,topicRegistry) {
  $scope.topicId=1;
  topicRegistry.getTopics(function(topics){
    $scope.$apply(function(){
      $scope.availableTopics = topics;      
    });
  });

  function populateQuestion(){
    questionGenerator.generate(
    {
      topicId    : $scope.selectedTopic
    },
    function(err,question,diagram){
      $scope.$apply(function(){
        $scope.question=question;
        
        if(diagram != undefined){
          $scope.diagram=$sce.trustAsHtml(diagram);
          $scope.hasDiagram=true;
          
        }else{
          $scope.hasDiagram=false;
        }
      });      
    });
  }
  $scope.$watch(
    function(){
      return $scope.selectedTopic;
    },
    function(){
      populateQuestion();
    }
  );
  
  setInterval(populateQuestion,500);
}]);
