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
    
    //declare variables for the selections that we touch on the redraw
    var svg=null;
    var correctScoreBars,incorrectScoreBars,maxScoreLine,netScoreLine;
    var myCorrectScoreBar,myIncorrectScoreBar;  
    var myPlayerLabel;
    var playersLabels;

    return {
      scope:{
        opponents:'=',
        player:'='
      },
      restrict: 'AE',
      link: link
    };
    
    
    
    function link(scope,iElement,iAttrs){
      
      function render(){
      
          dataPreperation.prepareLeaderboardData(scope)
          .then(function(data){        
            
            function redraw(){          
              
              if(null==svg){
                //first time through, set up all of the static elements
                svg = d3.select(iElement[0])
                      .append("svg")
                      .attr('width',1000)
                      .attr("height",opponentYPossition(null,data.opponents.length+1));
                
                myPlayerLabel = svg.append('text')
                .text("You:" + data.player.score.correct + " | " + data.player.score.incorrect )
                .attr('fill','black')
                .attr('y','1em');
                myCorrectScoreBar=svg.append('rect')
                  .attr('height',barHeight)
                  .attr('fill','#17AF4B')
                  .attr('width',correctScoreBarWidth(data.player))
                  .attr('y','1em');
                
                myIncorrectScoreBar=svg.append('rect')
                  .attr('height',barHeight/2)
                  .attr('fill','#D9182D')
                  .attr('width',incorrectXPossition(data.player))
                  .attr('y','20')
                  .attr('x',incorrectBarWidth(data.player));
                
                
                var players = svg.selectAll('.player')
                            .data(data.opponents)
                            .enter()
                            .append('g');
              
                players.classed('player');
                
                playersLabels = players.append('text')
                .text(function(d){
                  return d.name + ": " + d.score.correct + " | " + d.score.incorrect;
                })
                .attr('x',0)
                .attr('fill','black')
                .attr('y',opponentYPossition);
                
                //visualise the number of correct answers with a green rectangle
                correctScoreBars = players.append('rect')
                  .attr('height',barHeight)
                  .attr('fill','#97DBAE')
                  .attr('width',correctScoreBarWidth)
                  .attr('y',opponentYPossition);
                  
                //visualise the number of incorrect answers with a red rectangle
                incorrectScoreBars = players.append('rect')
                .attr('height',barHeight/2)
                .attr('fill','#E87481')
                .attr('width',incorrectBarWidth)
                .attr('x',incorrectXPossition)
                .attr('y',opponentIncorrectYPossition);
                
                //draw a vertical line for the maximum net score to make it easy to compare
                //only draw that line if there is a difference between max score and max net score
                netScoreLine = svg.append('line')
                  .attr('x1',barWidthMultiplier*data.maxNetScorer.netScore)
                  .attr('x2',barWidthMultiplier*data.maxNetScorer.netScore)
                  .attr('y1',0)
                  .attr('y2',opponentYPossition(null,data.maxNetScorer.index));
                  
                if(data.maxNetScorer.netScore<data.maxCorrectScorer.score){
                  netScoreLine.attr('style','stroke:rgb(255,0,0);stroke-width:2');
                }    
                //draw a vertical line for the maximum score to make it easy to compar
                maxScoreLine = svg.append('line')
                .attr('x1',barWidthMultiplier*data.maxCorrectScorer.score)
                .attr('x2',barWidthMultiplier*data.maxCorrectScorer.score)
                .attr('y1',0)
                .attr('y2',opponentYPossition(null,data.maxCorrectScorer.index))
                .attr('style','stroke:#97DBAE;stroke-width:2');
                
                
                
              }else{
                myPlayerLabel.text("You:" + data.player.score.correct + " | " + data.player.score.incorrect );
                
                playersLabels.transition().text(function(d){
                  return d.name + ": " + d.score.correct + " | " + d.score.incorrect;
                });
              
                myCorrectScoreBar.transition()
                  .attr('width',correctScoreBarWidth(data.player));
                myIncorrectScoreBar.transition()
                  .attr('x',incorrectXPossition(data.player))
                  .attr('width',incorrectBarWidth(data.player));
                
                
                correctScoreBars.transition().attr('width',correctScoreBarWidth);
                
                incorrectScoreBars.transition()
                .attr('x',incorrectXPossition)
                .attr('width',incorrectBarWidth);
                
                maxScoreLine.transition()
                  .attr('y2',opponentYPossition(null,data.maxCorrectScorer.index))
                  .attr('x1',barWidthMultiplier*data.maxCorrectScorer.score)
                  .attr('x2',barWidthMultiplier*data.maxCorrectScorer.score);
                
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
            }
            redraw();
            

          });
        }
        render();
        scope.$watch('player',render,true);
        scope.$watch('opponents',render,true);                         
    }
}
