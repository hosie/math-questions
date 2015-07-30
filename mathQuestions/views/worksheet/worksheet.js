'use strict';

angular.module('MathQuestions.worksheet', ['ngRoute','GreatMath.topic-distributor','GreatMath.question-generator'])

.config(['$routeProvider', function($routeProvider) {
  
  $routeProvider.when('/worksheet', {
    templateUrl: 'views/worksheet/worksheet.html',
    controller: 'WorksheetController'
  });
}])

.controller('WorksheetController', ['$scope','$sce','topicDistributor','questionGenerator',function($scope,$sce,topicDistributor,questionGenerator) {
  
  $scope.numberOfTimesTableQuestions     = 10;
  $scope.numberOfWorksheetsPerWeek       = 5;
  
  questionGenerator.otherwise(function(questionSpec,callback){
    callback(null,"Placeholder for " + questionSpec.topicClass + " topic " + questionSpec.topicId);
  });
  
  topicDistributor.createDistribution(function(distribution){
    $scope.$apply(function(){
      $scope.generate = function (){
        $scope.weeks = [];
        
        distribution.weeks.forEach(function(week,weekIndex){
          week.number=weekIndex+1;
          week.worksheets=[];
          for(var j=0;j<$scope.numberOfWorksheetsPerWeek;j++){
            var worksheet={
              number:j+1,
              mentalStrategies:{
                questions:[]                
              }
            };
            
            week.mentalStrategies.topics.forEach(function(topic,topicIndex){
              questionGenerator.generate(
              {
                topicClass : "mentalStrategies",
                topicId    : topic.id
              },              
              function(err,question){
                worksheet.mentalStrategies.questions.push({
                  number:topicIndex+1,
                  question: question
                });                
              });              
            });
            worksheet.timesTable={
              questions:[]                
            };
            
            week.timesTable.questionSpecs.forEach(function(questionSpec,questionIndex){
              var timesTableQuestionNumber=questionIndex+1;
              questionGenerator.generate(
              {
                topicClass:"timesTable",
                topicId:1,
                multiplier:questionSpec.multiplier
              },
              function(err,question){
                worksheet.timesTable.questions.push({
                  number   : timesTableQuestionNumber,
                  question : question
                });
                
              }
              );
                       
              timesTableQuestionNumber++;
            });
            
            week.worksheets.push(worksheet);
          }
          $scope.weeks.push(week);
        });
      };
    });
  });
}]);
