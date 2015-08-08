'use strict';

angular.module('GreatMath.session-scheduler', ['GreatMath.topic-registry'])

.factory('sessionScheduler', ['topicRegistry',function(topicRegistry) {
  //rows are weeks,
  //columns are topics
  var distributionTable=[
    [1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0],
    [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
    [0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0],
    [1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
    [0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
    [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1],
    [0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
    [1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
    [0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0],
    [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
    [0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0],
    [1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
    [0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
    [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1],
    [0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
    [1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
    [0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0],
    [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
    [0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0],
    [1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
    [0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
    [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1],
    [0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
    [1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
    [0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1]
   
  
  ];
  
  function scheduleKeySkillsQuestions(week,weekIndex,done){
    
    topicRegistry.getTopics({class:'keySkills'},function(topics){
      var row=distributionTable[weekIndex];
      week.keySkills={questionSpecs:[]};
      row.forEach(function(cell,topicIndex){
        if(cell>0){
          var topicId=null;
          if(topicIndex<topics.length){
            topicId=topics[topicIndex].id;
          }
          week.keySkills.questionSpecs.push({id:topicId});
        }  
      });      
      done();  
    });
    
  }
  
  function scheduleTimesTableQuestions(week,weekIndex,done){
    //times tables
    week.timesTable={
      questionSpecs:[]
    };
    topicRegistry.getTopics({class:'timesTable'},function(ttTopics){
      var ttTopicId;
      if(ttTopics.length==0){
        ttTopicId=null;
      }else{
        ttTopicId=ttTopics[0].id;
      }
      for(var questionNumber=1;questionNumber<=10;questionNumber++){
        var multiplier = 2 + Math.floor( 9 * Math.random());
        
        week.timesTable.questionSpecs.push(
        {
          id         : ttTopicId,
          multiplier : multiplier
        });
        
      }
      done();
    });
  }

  function scheduleMentalStrategyQuestion(week,weekIndex,done){
    
    topicRegistry.getTopics({class:'mentalStrategies'},function(topics){
      var row = distributionTable[weekIndex];
      row.forEach(function(cell,topicIndex){
        //0 means no questions on that topic this week. 
        //1 ( or anything greater than 0, for that matter) means there is one question on that topic this week
        if(cell>0 ){
          week.mentalStrategies.topics.push({
            id: topicIndex>=topics.length ? null : topics[topicIndex].id //use null as placeholder when there are less than 26 topics
          });  
        }
      });
      done();
      
    });
    
  }
  
  return {
    /*calls the callback with an array of objects.  Each object represents a week and contains 3 arrays of topic ids
    
    */
    createDistribution : function (callback){
        var numberOfWeeks                             = 39;
        var numberOfSessionsPerWeek                   =  5;
        var numberOfTimesTableQuestionsPerSession     = 10;
        var numberOfKeySkillsQuestionsPerSession      = 10;
        var i=0;
        
        var result = {
          weeks:[
          ]
        };
        for(var i=0;i<numberOfWeeks;i++){
          var weekIndex=i;
          var week = {
            number : weekIndex+1,
            mentalStrategies:{
              topics : []
            }
          };
          result.weeks.push(week);          
          //mental strategies
          (function(week,weekIndex){
            scheduleMentalStrategyQuestion(
              week,
              weekIndex,
              function(){//TODO refactor: use promise pattern
                scheduleTimesTableQuestions(
                  week,
                  weekIndex,
                  function(){
                    scheduleKeySkillsQuestions(
                      week,
                      weekIndex,
                      function(){
                        setTimeout(function(){
                          callback(result);          
                        },0);
                      }
                    );
                  }
                );                            
              }
            );    
          })(week,
            weekIndex);
          
        }
        
    }    
  };
}]);