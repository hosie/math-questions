'use strict';

angular.module('GreatMath.session-scheduler', ['GreatMath.topic-registry'])
.factory('default26TopicDistributionTable',function(){
  //from will's spreadsheet..
  //columns are weeks
  //rows are question number
  //cell is topic number
  var inputTable=[
    [1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1],
    [4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4],
    [7,8,9,7,8,9,7,8,9,7,8,9,7,8,9,7,8,9,7,8,9,7,8,9,7,8,9,7,8,9,7,8,9,7,8,9,7,8,9,7],
    [10,11,12,10,11,12,10,11,12,10,11,12,10,11,12,10,11,12,10,11,12,10,11,12,10,11,12,10,11,12,10,11,12,10,11,12,10,11,12,10],
    [13,14,15,13,14,15,13,14,15,13,14,15,13,14,15,13,14,15,13,14,15,13,14,15,13,14,15,13,14,15,13,14,15,13,14,15,13,14,15,13],
    [16,17,18,16,17,18,16,17,18,16,17,18,16,17,18,16,17,18,16,17,18,16,17,18,16,17,18,16,17,18,16,17,18,16,17,18,16,17,18,16],
    [19,20,21,19,20,21,19,20,21,19,20,21,19,20,21,19,20,21,19,20,21,19,20,21,19,20,21,19,20,21,19,20,21,19,20,21,19,20,21,19],
    [22,23,24,22,23,24,22,23,24,22,23,24,22,23,24,22,23,24,22,23,24,22,23,24,22,23,24,22,23,24,22,23,24,22,23,24,22,23,24,22],
    [25,1,2,25,6,5,25,9,10,25,13,14,25,18,17,25,21,22,25,25,26,25,3,4,25,7,8,25,12,11,25,15,16,25,19,20,25,24,23,25],
    [26,3,4,26,7,8,26,12,11,26,15,16,26,19,20,26,24,23,26,1,2,26,6,5,26,9,10,26,13,14,26,18,17,26,21,22,26,25,26,26]
  ];
  var outputTable=[];
  for(var weekIndex=0;weekIndex<40;weekIndex++){
    var nextWeek=[];
    for(var topicIndex=0;topicIndex<26;topicIndex++){
      //initialise all topics to 0
      nextWeek[topicIndex]=0;
    }
    //iterate through all topics appearing in that week on the input table, and set 1 for those topics in the output row
    for(var questionIndex=0;questionIndex<10;questionIndex++){
      var nextTopicIndex=inputTable[questionIndex][weekIndex] -1;
      nextWeek[nextTopicIndex]=1;
    }
    outputTable.push(nextWeek);
  };
  
  return outputTable;
}
)
.factory('default32TopicDistributionTable',function(){
    var inputTable=
    [
      [ 1,2,3,31,32,28,25,26,29,22,23,24,19,20,21,16,17,18,13,14,15,10,11,12,7,8,9,4,5,6,1,2,3,31,32,30,27,28,29,24],
      [ 4,5,6,1,2,3,31,32,30,27,28,29,22,25,26,19,20,23,16,17,18,13,14,15,10,11,12,7,8,9,4,5,6,1,2,3,31,32,30,27],
      [ 7,8,9,4,5,6,1,2,3,31,32,30,27,28,29,24,25,26,21,22,23,16,19,20,13,14,17,10,11,12,7,8,9,4,5,6,1,2,3,31],
      [ 10,11,12,7,8,9,4,5,6,1,2,3,31,32,30,27,28,29,24,25,26,21,22,23,18,19,20,15,16,17,10,13,14,7,8,11,4,5,6,1],
      [ 13,14,15,10,11,12,7,8,9,4,5,6,1,2,3,31,32,30,27,28,29,24,25,26,21,22,23,18,19,20,15,16,17,12,13,14,9,10,11,4],
      [ 16,17,18,13,14,15,10,11,12,7,8,9,4,5,6,1,2,3,31,32,30,27,28,29,24,25,26,21,22,23,18,19,20,15,16,17,12,13,14,9],
      [ 19,20,21,16,17,18,13,14,15,10,11,12,7,8,9,4,5,6,1,2,3,31,32,30,27,28,29,24,25,26,21,22,23,18,19,20,15,16,17,12],
      [ 22,23,24,19,20,21,16,17,18,13,14,15,10,11,12,7,8,9,4,5,6,1,2,3,31,32,30,27,28,29,24,25,26,21,22,23,18,19,20,15],
      [ 25,26,27,22,23,24,19,20,21,16,17,18,13,14,15,10,11,12,7,8,9,4,5,6,1,2,3,31,32,30,27,28,29,24,25,26,21,22,23,18],
      [ 28,29,30,25,26,27,22,23,24,19,20,21,16,17,18,13,14,15,10,11,12,7,8,9,4,5,6,1,2,3,31,32,30,27,28,29,24,25,26,21]
    ]
    var outputTable=[];
      for(var weekIndex=0;weekIndex<40;weekIndex++){
        var nextWeek=[];
        for(var topicIndex=0;topicIndex<32;topicIndex++){
          //initialise all topics to 0
          nextWeek[topicIndex]=0;
        }
        //iterate through all topics appearing in that week on the input table, and set 1 for those topics in the output row
        for(var questionIndex=0;questionIndex<10;questionIndex++){
          var nextTopicIndex=inputTable[questionIndex][weekIndex] -1;
          nextWeek[nextTopicIndex]=1;
        }
        outputTable.push(nextWeek);
      };

      return outputTable;
})
.factory('sessionScheduler', ['topicRegistry','default26TopicDistributionTable','default32TopicDistributionTable','$q','$rootScope',function(topicRegistry,default26TopicDistributionTable,default32TopicDistributionTable,$q,$rootScope) {
  
  
  function Distribution (){
    
    this.topics=null;
    
    this.setTopics=function(topics){
      this.topics=topics;
    };
    
    this.getTopicsForWeek=function(weekIndex){
      var distributionRow = this.table[weekIndex];
      var result = [];
      var self=this;
      distributionRow.forEach(function(cell,topicIndex){
        if(cell>0){
          var topicId=null;
          if(topicIndex<self.topics.length){
            topicId=self.topics[topicIndex].id;
          }
          result.push(topicId);
        }  
      });
      return result;
    };
    
    this.getDistributionOfTopicAt=function(topicIndex){
      return this.table.map(function(item){
        if(item[topicIndex]==1){
          return true;
        }else{
          return false;
        }
      });
    }
  
  } 
  Distribution.fromTable = function(table,topics){
    var result = new Distribution();
    result.table = table;
    result.topics=topics;
    return result;
  }
  
  
  function scheduleKeySkillsQuestions(ksDistribution,week,weekIndex){
    var thisWeeksTopics = ksDistribution.getTopicsForWeek(weekIndex);
    thisWeeksTopics.forEach(function(topicId){
      week.keySkills.questionSpecs.push({
        id: topicId
      });
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

  function scheduleMentalStrategyQuestion(msDistribution,week,weekIndex){
        
    var thisWeeksTopics = msDistribution.getTopicsForWeek(weekIndex);
    thisWeeksTopics.forEach(function(topicId){
      week.mentalStrategies.topics.push({
        id: topicId
      });
    });
      
  }
  
  return {
    
    Distribution:Distribution,
    initialiseDistributions : function(){
      var deferred = $q.defer();
      var self=this;
      setTimeout(function(){
        var mentalStrategies = Distribution.fromTable(default26TopicDistributionTable);
        var keySkills        = Distribution.fromTable(default32TopicDistributionTable);
        topicRegistry.getTopics({class:'mentalStrategies'},function(topics){
          mentalStrategies.setTopics(topics);
          topicRegistry.getTopics({class:'keySkills'},function(ksTopics){
            keySkills.setTopics(ksTopics);
            
            deferred.resolve({
              mentalStrategies :mentalStrategies,
              keySkills        : keySkills
            });
            $rootScope.$apply();
            
          });            
        });
        
      
      },0);
      return deferred.promise;
    
    },
    /*calls the callback with an array of objects.  Each object represents a week and contains 3 arrays of topic ids
    
    */
    createDistribution : function (callback){
      var numberOfWeeks                             = 40;
      var numberOfSessionsPerWeek                   =  5;
      var numberOfTimesTableQuestionsPerSession     = 10;
      var numberOfKeySkillsQuestionsPerSession      = 10;
      var i=0;
      var result = {
        weeks:[
        ]
      };
      
      this.initialiseDistributions()
      .then(function(distributions){
        for(var i=0;i<numberOfWeeks;i++){
          var weekIndex=i;
          var week = {
            number : weekIndex+1,
            mentalStrategies:{
              topics : []
            },
            keySkills:{
              questionSpecs:[]
            }
            
          };
          result.weeks.push(week);          
          //mental strategies
          (function(week,weekIndex){
            scheduleMentalStrategyQuestion(
              distributions.mentalStrategies,
              week,
              weekIndex);
              
              
            scheduleTimesTableQuestions(
              week,
              weekIndex,
              function(){
                scheduleKeySkillsQuestions(
                  distributions.keySkills,
                  week,
                  weekIndex);
                  
                setTimeout(function(){
                  callback(result);          
                },0);
              }
            );    
          })(week,
            weekIndex);
        }
      });
      
    }    
  };
}]);