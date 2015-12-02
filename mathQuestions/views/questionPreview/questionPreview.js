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
  $scope.generator={
    numberOfQuestions:1
  };
  topicRegistry.getTopics(function(topics){
    $scope.$apply(function(){
      $scope.availableTopics = topics;      
    });
  });
   
  function populateQuestion(){
    
    $scope.questions=[];
    
    
    function populateScope(question,diagram,answerTemplate){
      var thisQuestion = {
        question:question
        
      }  
      if(diagram != undefined){
        thisQuestion.diagram=$sce.trustAsHtml(diagram);
        thisQuestion.hasDiagram=true;
        
      }else{
        thisQuestion.hasDiagram=false;
      }
      
      if(answerTemplate != undefined){
        thisQuestion.answerTemplate= {postfix:answerTemplate.postfix};
        thisQuestion.hasAnswerTemplate=true;
      }else{
        thisQuestion.hasAnswerTemplate=false;
      }
      
      $scope.questions.push(thisQuestion);
      
    }
    
    var numberOfQuestions = $scope.generator.numberOfQuestions || 1;
    for(var i=0;i<numberOfQuestions;i++){
      questionGenerator.generate(
        {
          topicId    : $scope.selectedTopic
        },
        function(err,question,diagram,answerTemplate){
          if(!$scope.$$phase) {
            $scope.$apply(function(){
              populateScope(question,diagram,answerTemplate);
            });
            
            
          }else{
            populateScope(question,diagram,answerTemplate);
          }
                
        });
      }      
    }
    
  $scope.$watch(
    function(){
      return $scope.selectedTopic;
    },
    function(){
      populateQuestion();
    }
  );
  $scope.generator.regenerate=function(){
    populateQuestion();
  }
  //setInterval(populateQuestion,500);
}]);
