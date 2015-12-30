angular.module('GreatMath.directives',[])
.factory('dataPreperation',function($q,$timeout,$rootScope){
  return {
    prepareLeaderboardData:function(scope){
      var deferred = $q.defer();
      var data = {
        player: scope.player,
        opponents:scope.opponents
      };
      
      var correctScores = data.opponents.map(function(item,i){
          return {
            index:i,
            score:item.score.correct,
            netScore:item.score.correct-item.score.incorrect
          }
      });
      
      data.maxCorrectScorer = correctScores.sort(function(a,b){
        //if both scores are the same, sort the later index to the front 
        //so that the vertical line would extend all the way down past all opponents with the same max
        if(b.score==a.score){
          return b.index-a.index;
        }else{
          return b.score-a.score;  
        }          
      })[0];


      //find the player whose net score (correct - incorrect) is best
      data.maxNetScorer = correctScores.sort(function(a,b){
        //if both scores are the same, sort the later index to the front 
        //so that the vertical line would extend all the way down past all opponents with the same max          
        if(b.netScore==a.netScore){
          return b.index-a.index;
        }else{
          return b.netScore-a.netScore;  
        }          
      })[0];
      
      deferred.resolve(data);
      return deferred.promise;
    }
  };
})
.directive('leaderBoard',leaderBoardDirective);

function leaderBoardDirective($rootScope,$timeout,$interval,dataPreperation){
    //constants and helpers
    var barHeight = 20;
    var barWidthMultiplier = 15;
    function opponentYPossition(opponent,index){
        return 50 + 2*barHeight*index;
    }
    
    function correctScoreBarWidth(player){
      return barWidthMultiplier*player.score.correct;
    }
    
    function opponentIncorrectYPossition(opponent,index){
      return 50 + 2*barHeight*index +barHeight/4;
    }
    
    function incorrectXPossition(player){
      return barWidthMultiplier * (player.score.correct-player.score.incorrect);
    }
    
    function incorrectBarWidth(player){
      return barWidthMultiplier*player.score.incorrect;
    }
    
    var leaderboardDirective = {
      redrawHandlers:[]      ,
      onRedraw : function(handler){
        this.redrawHandlers.push(handler);
      },
      redraw : function(data){
        this.redrawHandlers.forEach(function(item,i){
          item(data);
        });
      }      
    };
    function onRedraw(handler){
        leaderboardDirective.onRedraw(handler);
    }            
    
    return {
      scope:{
        opponents:'=',
        player:'='
      },
      restrict: 'AE',
      link: link
    };
    
    function link(scope,iElement,iAttrs){
      function redraw(){
        dataPreperation.prepareLeaderboardData(scope)
        .then(function(data){        
          leaderboardDirective.redraw(data);              
        });
        
      }
      
      function render(){
      
          dataPreperation.prepareLeaderboardData(scope)
          .then(function(data){        

            //first time through, set up all of the static elements
            var svg = d3.select(iElement[0])
                  .append("svg")
                  .attr('width',1000)
                  .attr("height",opponentYPossition(null,data.opponents.length+1));
                  
            
            {// label for the current player including text for the current score
              var myPlayerLabel = svg.append('text')
              .attr('fill','black')
              .attr('y','1em');
                              
              onRedraw(
                function(data){
                  myPlayerLabel.text("You:" + data.player.score.correct + " | " + data.player.score.incorrect );                  
                }
              );                  
            }
            
            {//green bar to visualise the player's current gross score
              var myCorrectScoreBar=svg.append('rect')
                .attr('height',barHeight)
                .attr('fill','#17AF4B')
                .attr('y','1em');
              
              onRedraw(
                function(data){
                  myCorrectScoreBar.transition()
                  .attr('width',correctScoreBarWidth(data.player));
                }
              );
            }
            
            {//red bar to visualse player's current incorrect score
              var myIncorrectScoreBar=svg.append('rect')
                .attr('height',barHeight/2)
                .attr('fill','#D9182D')
                .attr('y','20');

              onRedraw(
                function(data){
                    myIncorrectScoreBar.transition()
                      .attr('x',incorrectXPossition(data.player))
                      .attr('width',incorrectBarWidth(data.player));
                }
              );
            }
            
            //create a group for each opponent
            var players = svg.selectAll('.player')
                        .data(data.opponents)
                        .enter()
                        .append('g');
          
            players.classed('player');
            
            {//text label with each opponents name and current scores
              var opponentsLabels = players.append('text')
              .attr('x',0)
              .attr('fill','black')
              .attr('y',opponentYPossition);
              onRedraw(                  
                function(){
                  opponentsLabels.transition().text(function(d){
                    return d.name + ": " + d.score.correct + " | " + d.score.incorrect;
                  });                    
                }
              );                  
            }
            
            {//green bar for each opponents' correct score
              var correctScoreBars = players.append('rect')
                .attr('height',barHeight)
                .attr('fill','#97DBAE')
                .attr('y',opponentYPossition);
                
              onRedraw(function(data){
                correctScoreBars.transition().attr('width',correctScoreBarWidth);
              });
            }
            
            {//red bar for each opponents' incorrect score
              var incorrectScoreBars = players.append('rect')
              .attr('height',barHeight/2)
              .attr('fill','#E87481')
              .attr('y',opponentIncorrectYPossition);
              
              onRedraw(
                function(data){
                  incorrectScoreBars.transition()
                  .attr('x',incorrectXPossition)
                  .attr('width',incorrectBarWidth);
                }
              );
            }  
            
            {
              //draw a vertical line for the maximum net score to make it easy to compare
              //only draw that line if there is a difference between max score and max net score
              var netScoreLine = svg.append('line')
                .attr('y1',0);
              
              onRedraw(
                function(data){
                  netScoreLine.transition()
                  .attr('y2',opponentYPossition(null,data.maxNetScorer.index))
                  .attr('x1',barWidthMultiplier*data.maxNetScorer.netScore)
                  .attr('x2',barWidthMultiplier*data.maxNetScorer.netScore);
                  
                  if(data.maxNetScorer.netScore<data.maxCorrectScorer.score){            
                    netScoreLine.attr('style','stroke:#E87481;stroke-width:2');              
                  }else{
                    netScoreLine.attr('style','stroke:#E87481;stroke-width:0');              
                  }                      
                }
              );
            }
            
            {
              //draw a vertical line for the maximum score to make it easy to compar
              var maxScoreLine = svg.append('line')
              .attr('y1',0)
              .attr('style','stroke:#97DBAE;stroke-width:2');
              
              onRedraw(
                function(data){
                  maxScoreLine.transition()
                  .attr('y2',opponentYPossition(null,data.maxCorrectScorer.index))
                  .attr('x1',barWidthMultiplier*data.maxCorrectScorer.score)
                  .attr('x2',barWidthMultiplier*data.maxCorrectScorer.score);                    
                }  
              );
                
            }
          });
        }

      render();
      redraw();
      
      scope.$watch('player',redraw,true);
      scope.$watch('opponents',redraw,true);                         
    }
}
