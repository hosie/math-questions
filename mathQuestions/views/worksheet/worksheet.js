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
  
  questionGenerator.setDefault(function(questionSpec,callback){
    callback(null,"Placeholder for " + questionSpec.class + " topic " + questionSpec.topicId);
  });
  
  topicDistributor.createDistribution(function(distribution){
    $scope.$apply(function(){
      
      $scope.generate = function (){
        var promise = {
          then:function(callback){
            this.callback=callback;
          },
          resolve:function(){
            var self=this;
            setTimeout(function(){
              if(self.callback){
                self.callback();
              }
            },0);
          }
        }
        $scope.weeks = [];
        var numberOfQuestionsToGenerate = 0;
        distribution.weeks.forEach(function(week,weekIndex){
          week.mentalStrategies.topics.forEach(function(topic,topicIndex){
            numberOfQuestionsToGenerate = numberOfQuestionsToGenerate + $scope.numberOfWorksheetsPerWeek;
          });
          week.timesTable.questionSpecs.forEach(function(questionSpec,questionIndex){
            numberOfQuestionsToGenerate = numberOfQuestionsToGenerate + $scope.numberOfWorksheetsPerWeek;
          });          
        });
        if(numberOfQuestionsToGenerate==0){
          promise.resolve();
        }else{
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
              
              (function(worksheet){
                week.mentalStrategies.topics.forEach(function(topic,topicIndex){
                  questionGenerator.generate(
                  {
                    class : "mentalStrategies",
                    topicId    : topic.id
                  },              
                  function(err,question){
                    $scope.$apply(function(){
                      worksheet.mentalStrategies.questions[topicIndex]=
                      {
                        number:topicIndex+1,
                        question: question
                      };  
                    });
                    numberOfQuestionsToGenerate--;
                    if(numberOfQuestionsToGenerate==0){
                      promise.resolve();
                    }
                  });              
                });
                worksheet.timesTable={
                  questions:[]                
                };
                
                week.timesTable.questionSpecs.forEach(function(questionSpec,questionIndex){
  
                  questionGenerator.generate(
                  {
                    class:"timesTable",
                    topicId:1,
                    multiplier:questionSpec.multiplier
                  },
                  function(err,question){
                    $scope.$apply(function(){
                      worksheet.timesTable.questions[questionIndex]=
                      {
                        number   : questionIndex+1,
                        question : question
                      };  
                    });
                    numberOfQuestionsToGenerate--;
                    if(numberOfQuestionsToGenerate==0){
                      promise.resolve();
                    }
                  }
                  );  
                });
                
                week.worksheets.push(worksheet);
                
              })(worksheet);
           
            }
            $scope.weeks.push(week);
          });
          
        }
        
        return promise;
      };
    });
  });
}]);
