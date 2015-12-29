angular.module('mathDirectives',[])
.directive('leaderBoard',leaderBoardDirective);
function leaderBoardDirective($rootScope,$timeout,$interval){
   return {
      scope:{
        opponents:'=',
        player:'='
      },
      restrict: 'AE',
      link: link
    };
    

    function link(scope,iElement,iAttrs){
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
      function redraw(){
        var data = scope.opponents;
        
        //TODO put the following in a controller or a service so that it can be tested
        var correctScores = data.map(function(item,i){
            return {
              index:i,
              score:item.score.correct,
              netScore:item.score.correct-item.score.incorrect
            }
        });
        
        var maxCorrectScorer = correctScores.sort(function(a,b){
          //if both scores are the same, sort the later index to the front 
          //so that the vertical line would extend all the way down past all opponents with the same max
          if(b.score==a.score){
            return b.index-a.index;
          }else{
            return b.score-a.score;  
          }          
        })[0];
        
        
        var maxCorrectScore=maxCorrectScorer.score;
        
        //find the player whose net score (correct - incorrect) is best
        var maxNetScorer = correctScores.sort(function(a,b){
          //if both scores are the same, sort the later index to the front 
          //so that the vertical line would extend all the way down past all opponents with the same max          
          if(b.netScore==a.netScore){
            return b.index-a.index;
          }else{
            return b.netScore-a.netScore;  
          }          
        })[0];
        var maxNetScore=maxNetScorer.netScore;
        
        
        if(null==svg){
          svg = d3.select(iElement[0])
                .append("svg")
                .attr('width',1000)
                .attr("height",opponentYPossition(null,data.length+1));
          svg.append('text')
          .text("You")
          .attr('fill','black')
          .attr('y','1em');
          myCorrectScoreBar=svg.append('rect')
            .attr('height',barHeight)
            .attr('fill','#17AF4B')
            .attr('width',correctScoreBarWidth(scope.player))
            .attr('y','1em');
          
          myIncorrectScoreBar=svg.append('rect')
            .attr('height',barHeight/2)
            .attr('fill','#D9182D')
            .attr('width',incorrectXPossition(scope.player))
            .attr('y','20')
            .attr('x',incorrectBarWidth(scope.player));
          
          
          var players = svg.selectAll('.player')
                      .data(data)
                      .enter()
                      .append('g');
        
          players.classed('player');
          
          players.append('text')
          .text(function(d){
            return d.name;
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
            .attr('x1',barWidthMultiplier*maxNetScore)
            .attr('x2',barWidthMultiplier*maxNetScore)
            .attr('y1',0)
            .attr('y2',opponentYPossition(null,maxNetScorer.index));
            
          if(maxNetScorer.netScore<maxNetScorer.score){
            netScoreLine.attr('style','stroke:rgb(255,0,0);stroke-width:2');
          }    
          //draw a vertical line for the maximum score to make it easy to compar
          maxScoreLine = svg.append('line')
          .attr('x1',barWidthMultiplier*maxCorrectScore)
          .attr('x2',barWidthMultiplier*maxCorrectScore)
          .attr('y1',0)
          .attr('y2',opponentYPossition(null,maxCorrectScorer.index))
          .attr('style','stroke:#97DBAE;stroke-width:2');
          
          
          
        }else{
          
          myCorrectScoreBar.transition()
            .attr('width',correctScoreBarWidth(scope.player));
          myIncorrectScoreBar.transition()
            .attr('x',incorrectXPossition(scope.player))
            .attr('width',incorrectBarWidth(scope.player));
          
          
          correctScoreBars.transition().attr('width',correctScoreBarWidth);
          
          incorrectScoreBars.transition()
          .attr('x',incorrectXPossition)
          .attr('width',incorrectBarWidth);
          
          maxScoreLine.transition()
            .attr('y2',opponentYPossition(null,maxCorrectScorer.index))
            .attr('x1',barWidthMultiplier*maxCorrectScore)
            .attr('x2',barWidthMultiplier*maxCorrectScore);
          
          netScoreLine.transition()
            .attr('y2',opponentYPossition(null,maxNetScorer.index))
            .attr('x1',barWidthMultiplier*maxNetScore)
            .attr('x2',barWidthMultiplier*maxNetScore);
            
          if(maxNetScorer.netScore<maxCorrectScorer.score){            
            netScoreLine.attr('style','stroke:#E87481;stroke-width:2');              
          }else{
            netScoreLine.attr('style','stroke:#E87481;stroke-width:0');              
          }
        }
      }
      redraw();
      scope.$watch('player',redraw,true);
      scope.$watch('opponents',redraw,true);
      
                         
    }
    
    
  
}
