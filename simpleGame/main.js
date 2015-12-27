'use strict';

// Declare app level module which depends on views, and components
angular.module('SimpleMathGame', [
  'ngRoute',
  'ngKeypad',
  'GreatMath.topic-registry',
  'GreatMath.math-util',
  'GreatMath.times-table-questions',
  'GreatMath.question-generator'
])
.config(['$routeProvider', function($routeProvider) {
  
  $routeProvider.when('/main', {
    templateUrl: 'views/main/main.html',
    controller: 'MainController'
  });
}])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/main'});
}])
.controller('MainController',function($scope,mathUtil,topicRegistry,questionGenerator){
  var topicId;
  function populateQuestion(){
    questionGenerator.generate(
      {
        topicId    : topicId
      },
      function(err,question,diagram,answerTemplate){
        if(!$scope.$$phase) {
          $scope.$apply(function(){
            $scope.question = question;            
          });                   
        }else{
          $scope.question = question;
        }              
      }
    );
  }
  

  topicRegistry.getTopics({class:'timesTable'},function(topics){
    if(topics.length!=1){
      console.dir(topics);
      throw new Error("Unexpected number of times tables topics");
    }
    topicId=topics[0].id;
    populateQuestion();
  });

  $scope.score={
    correct:0,
    incorrect:0
  };
  $scope.answer   = "";
  
  function checkAnswer(){
    $scope.$apply(function(){      
      if(mathUtil.randomInteger(7)==7){
        $scope.correct=false;
        $scope.incorrect=true;
        $scope.score.incorrect++;
      }else{
        $scope.incorrect=false;
        $scope.correct=true;
        $scope.score.correct++;
      }
      setTimeout(function(){
        $scope.$apply(function(){      
          $scope.incorrect = false;
          $scope.correct   = false;
        });
      },1000);
      $scope.answer="";
    });
    populateQuestion();        
  }
  
  $scope.$on(Keypad.KEY_PRESSED, function(event,data){
    if(data=="="){
      checkAnswer();
    }else{
      $scope.$apply(function(){
        $scope.answer=$scope.answer + data;
        
      });      
    }
  });

});
