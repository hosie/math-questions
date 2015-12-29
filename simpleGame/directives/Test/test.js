angular.module('DirectiveTest',['mathDirectives','GreatMath.math-util',])
.controller('MainContoller',function($scope,$timeout,$interval,mathUtil){
  function addPlayer(name){
    $scope.opponents.push(
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
  $scope.opponents=[];
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
  $scope.opponents.forEach(function(player){player.start()});
  $scope.timeRemaining=60;  
  
  $scope.stop=function(){
    $scope.timeRemaining=0;
    $scope.opponents.forEach(function(player){player.stop()});
  }
  
  $scope.player={
    score:
    {
      correct:5,
      incorrect:2
    }
  };
});