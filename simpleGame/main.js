'use strict';

// Declare app level module which depends on views, and components
angular.module('SimpleMathGame', [
  'ngRoute',
  'ngKeypad',
  'ngAudio',
  'GreatMath.topic-registry',
  'GreatMath.math-util',
  'GreatMath.times-table-questions',
  'GreatMath.question-generator',
  'GreatMath.directives'
  
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
.controller('MainController',function($scope,$timeout,$interval,mathUtil,topicRegistry,questionGenerator,ngAudio){
  initialise();
  var topicId;
  function addPlayer(name){
    $scope.players.push(
      {
        name:name,
        score:{
          correct:0,
          incorrect:0
        },
        answer:function(){
          if($scope.timeRemaining>0){
            if(mathUtil.randomInteger(7)==7){
              this.score.incorrect++;
            }else{
              this.score.correct++;           
            }
            var self=this;          
            this.ticker = $timeout(
              function(){
                  self.answer();            
              },
              mathUtil.randomInteger(1000,5000)
            );
          }
        },
        start:function(){
          var self=this;
          this.ticker = $timeout(
            function(){
                self.answer();            
            },
            mathUtil.randomInteger(1000,5000)
          );
        },
        stop:function(){
          $timeout.cancel(this.ticker);
        },
        ticker:0
        
      }
    );
  }
  function initialise(){
    
    $scope.startGame = startGame;
    
    $scope.player=
    {
      score:
      {
        correct:0,
        incorrect:0
      }
    };
    $scope.sound = ngAudio.load("sounds/clap-tap.mp3");
    $scope.doCheckAnswer=checkAnswer;
    $scope.players=[];
    addPlayer("Danny");
    addPlayer("'Erbert");
    addPlayer("Fatty");
    addPlayer("Plug");
    addPlayer("Sidney");
    addPlayer("Smiffy");
    addPlayer("Spotty");
    addPlayer("Toots");
    addPlayer("Wilfred");
    addPlayer("Cuthbert");
    addPlayer("Winston");
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
    topicRegistry.getTopics(
      {class:'timesTable'},
      function(topics){
        if(topics.length!=1){
          throw new Error("Unexpected number of times tables topics");
        }
        topicId=topics[0].id;        
      }
    );


  }  
  
  function tick(){
    $scope.timeRemaining--;
    if($scope.timeRemaining==0){
      timeUp();      
    }else{
      $timeout(tick,1000);      
    }
  };
      
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

  
  function checkAnswer(){
  
    if($scope.checkAnswer($scope.answer)){
      
      $scope.incorrect=false;
      $scope.correct=true;
      $scope.player.score.correct++;
    }else{
      $scope.correct=false;
      $scope.incorrect=true;
      $scope.player.score.incorrect++;
    }
    $timeout(function(){      
      $scope.incorrect = false;
      $scope.correct   = false;      
    },1000);
    $scope.answer="";
    populateQuestion();        
  }
  
  function startGame(){
    
    $scope.player.score.correct   = 0;
    $scope.player.score.incorrect = 0;
    $scope.answer   = "";
    
    $scope.timeRemaining=60;
    populateQuestion();
    $timeout(tick,1000);
    $scope.timedout=false;
    $scope.sound.play(); 
    $scope.players.forEach(function(player){
      player.start();
    });
    $scope.started=true;
    
  }
  
  function timeUp(){
    $scope.sound.stop();
    $scope.timedout=true;
    $scope.question="Time up";  
    $scope.players.forEach(function(player){
      player.stop();
    });
    $scope.started=false;
  }
  
});

