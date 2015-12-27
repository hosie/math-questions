'use strict';

// Declare app level module which depends on views, and components
angular.module('SimpleMathGame', [
  'ngRoute',
  'ngKeypad',
  'ngAudio',
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
.controller('MainController',function($scope,$timeout,mathUtil,topicRegistry,questionGenerator,ngAudio){
  $scope.timeRemaining=60;
  function tick(){
    $scope.timeRemaining--;
    if($scope.timeRemaining==0){
      $scope.sound.stop();
      $scope.timedout=true;
      $scope.question="Time up";
    }else{
      $timeout(tick,1000);      
    }
  };
  $timeout(tick,1000);
  var topicId;
  $scope.sound = ngAudio.load("https://trello-attachments.s3.amazonaws.com/5622320600234f27486ed577/5657723aa413cbc6f88f8ddf/03063fea79843f088c137d2d0321dd0e/205_full_clap-tap_0102.mp3");
  $scope.sound.play();
  function populateQuestion(){
    questionGenerator.generate(
      {
        topicId    : topicId
      },
      function(err,question,diagram,answerTemplate,checkAnswer){
        $scope.$apply(function(){
          $scope.checkAnswer=checkAnswer;
          $scope.question = question;                        
        });        
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
  
    if($scope.checkAnswer($scope.answer)){
      
      $scope.incorrect=false;
      $scope.correct=true;
      $scope.score.correct++;
    }else{
      $scope.correct=false;
      $scope.incorrect=true;
      $scope.score.incorrect++;
    }
    $timeout(function(){      
      $scope.incorrect = false;
      $scope.correct   = false;      
    },1000);
    $scope.answer="";
    populateQuestion();        
  }
  $scope.doCheckAnswer=checkAnswer;
  
  
  //keypad event listeners do not fire under an apply so we have to do that
  $scope.$on(Keypad.KEY_PRESSED, function(event,data){
    $scope.$apply(function(){
      if(data=="="){
        checkAnswer();
      }else{        
        $scope.answer=$scope.answer + data;
      }
    });      
  });

});
