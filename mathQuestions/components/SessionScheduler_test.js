'use strict';

describe('GreatMath.session-scheduler module', function() {
  beforeEach(module('GreatMath.session-scheduler'));
  
  var mockTopicRegistry;
  beforeEach(function(){
    mockTopicRegistry={
      keySkillsTopics:[],
      mentalStrategiesTopics:[],
      getTopics:function(filter,callback){
        var result;
        
        if(filter.class=="mentalStrategies"){
          result = this.mentalStrategiesTopics;
        }else if(filter.class=="keySkills"){
          result = this.keySkillsTopics;
        }else{
          result = [];
        }
        setTimeout(function(){
          callback(result);
        },0);
      }
    };  
  });
  
  var sessionScheduler;
  beforeEach(function(){
    module(function($provide){
      $provide.factory('topicRegistry',function(){
        return mockTopicRegistry;
      });      
    });    
  });
    
  beforeEach(inject(function($rootScope, _sessionScheduler_) {
    
    sessionScheduler=_sessionScheduler_;
  }));
    
  describe('When there are 26 mental strategey topics registered',function(){

    beforeEach(function(){
    
      mockTopicRegistry.mentalStrategiesTopics=[];
      
      for(var i=1;i<=26;i++){
        mockTopicRegistry.mentalStrategiesTopics.push({
          id:100+i,
          description:"mental strategey topic " + i
        });
      }
    });
    
    
    var distribution;
    beforeEach(function(done){
      sessionScheduler.createDistribution(function(result){
        distribution=result;
        done();        
      })      
    });
    
    it("distribution is not null",function(){
      expect(distribution).not.toBeNull();      
    });
    
    it("there are 39 weeks",function(){
      expect(distribution.weeks.length).toBe(39);      
    });
    
    for(var weekNumber=1;weekNumber<=39;weekNumber++){
      var weekIndex=weekNumber-1;
      it("week " + weekNumber + " has 10 questions",function(){
        var week=distribution.weeks[weekIndex];
        var numberOfQuestions=0;
        week.mentalStrategies.topics.forEach(function(topic){
          numberOfQuestions++;          
        });
        expect(numberOfQuestions).toBe(10);
      });
    }
    
    
    //these topic ids match the ones used in the mockTopicRegistry
    for(var topicId=101;topicId<=126;topicId++){     
      var localTopicId=topicId;
      it("topic " + topicId + " has 15 questions",function(){
        var numberOfOccurances=0;        
        distribution.weeks.forEach(function(item){
          item.mentalStrategies.topics.forEach(function(item){
            if(item.id==localTopicId){
              numberOfOccurances++;
            }            
          });          
        });
        //with 39 weeks, 10 questions each week and 26 topics,
        //an even distribution would mean that each topic has 15 questions in total
        expect(numberOfOccurances).toBe(15);        
      })
    };
    
    it('calls back asynchrously',function(done){
      //otherwise we don't know whether or not we are in a digest.
      //best to ensure that it is always async and consumer must make any scope updates in a digest block
      var sync=true;
      sessionScheduler.createDistribution(function(result){
        expect(sync).toBe(false);
        done();
      });
      sync=false;
    });
    
    it('there are 10 mental strategies questions on every sheet',function(){
      distribution.weeks.forEach(function(week,weekIndex){
        expect(week.mentalStrategies.topics.length).toBe(10);        
      });
    });
    
    
  });
  
  describe('When there are less than 26 mental strategey topics registered',function(){
    beforeEach(function(){
      mockTopicRegistry.mentalStrategiesTopics=[
        {
          id:1,
          description:"test topic 1"
        }
        ];  
    });
    
    var distribution;
    beforeEach(function(done){
      sessionScheduler.createDistribution(function(result){
        distribution=result;
        done();        
      })      
    });
    
    it('there are 10 mental strategies questions on every sheet',function(){
      distribution.weeks.forEach(function(week,weekIndex){
        expect(week.mentalStrategies.topics.length).toBe(10);        
      });
    });
    
    it('uses null as placeholders for topic id',function(){
      var numberOfNulls=0;
      var expectedNumberOfNulls = 25 * 15;//25 missing topics, expecting distribution of 15 instances of each
      distribution.weeks.forEach(function(week){
        week.mentalStrategies.topics.forEach(function(questionSpec){
          if(questionSpec.id==null){
            numberOfNulls++;
          }
        });
      });
      expect(numberOfNulls).toEqual(expectedNumberOfNulls);      
    });
    
  });
    
  describe('Times table',function(){
    beforeEach(function(){
      mockTopicRegistry.getTopics=function(filter,callback){
        setTimeout(function(){
          callback([
          {
            id:201
          }
          ]);
        },0);
      };
    });
    
    var distribution;
    beforeEach(function(done){
      sessionScheduler.createDistribution(function(result){
        distribution=result;
        done();        
      })      
    });
    
    it('there are 10 times table questions on every sheet',function(){
      distribution.weeks.forEach(function(week,weekIndex){
        expect(week.timesTable.questionSpecs.length).toBe(10);        
      });
    });
    
    it('each times table question has the correct topicid',function(){
      distribution.weeks.forEach(function(week){
        week.timesTable.questionSpecs.forEach(function(topic){
          expect(topic.id).toEqual(201);              
        });
      });  
    });
    
    it('each times table question has a multiplier',function(){
      distribution.weeks.forEach(function(week){
        week.timesTable.questionSpecs.forEach(function(topic){
          expect(topic.multiplier).toBeDefined();              
        });
      });  
    });
    
    it('multipliers are different',function(){
      var multiplier1 = distribution.weeks[0].timesTable.questionSpecs[0].multiplier;
      var multiplier2 = distribution.weeks[0].timesTable.questionSpecs[1].multiplier;
      var multiplier3 = distribution.weeks[0].timesTable.questionSpecs[2].multiplier;
      var multiplier4 = distribution.weeks[0].timesTable.questionSpecs[3].multiplier;
      var deviation = Math.abs(multiplier1-multiplier2) + Math.abs(multiplier1-multiplier3) + Math.abs(multiplier1-multiplier4);
      expect(deviation).not.toBe(0);        
    });
    
    it('multipliers are 10 or less',function(){
      distribution.weeks.forEach(function(week){
        week.timesTable.questionSpecs.forEach(function(topic){
          expect(topic.multiplier).not.toBeGreaterThan(10);              
        });
      });
    });
    
    it('multipliers are 2 or higher',function(){
      distribution.weeks.forEach(function(week){
        week.timesTable.questionSpecs.forEach(function(topic){
          expect(topic.multiplier).not.toBeLessThan(2);              
        });
      });
    });
    
    xit('multipliers are somewhat random',function(){});
        
  });  
  
  describe('keySkills',function(){
    var keySkillsTopicIds=[];
    for(var i=1;i<=26;i++){
      keySkillsTopicIds[i]=300+i;
    }
    
    beforeEach(function(){
    
      mockTopicRegistry.keySkillsTopics=[];
      
      for(var i=1;i<=26;i++){
        mockTopicRegistry.keySkillsTopics.push({
          id:keySkillsTopicIds[i],
          description:"key skill topic " + i
        });
      }
    });
    
    var distribution;
    beforeEach(function(done){
      sessionScheduler.createDistribution(function(result){
        distribution=result;
        done();        
      })      
    });
    
    it('there are 10 key skills questions on every sheet',function(done){
      distribution.weeks.forEach(function(week,weekIndex){
        expect(week.keySkills.questionSpecs.length).toBe(10);        
        done();
      });
    });
    
    it('each topic appears 15 times',function(done){
      
      keySkillsTopicIds.forEach(function(topicId){
        var numberOfOccurances=0;        
        distribution.weeks.forEach(function(item){
          item.keySkills.questionSpecs.forEach(function(item){
            if(item.id==topicId){
              numberOfOccurances++;
            }            
          });          
        });
        //with 39 weeks, 10 questions each week and 26 topics,
        //an even distribution would mean that each topic has 15 questions in total
        expect(numberOfOccurances).toBe(15);        
        
      });
      done();      
    });
  });

  
  describe('When there are less than 26 key skills topics registered',function(){
    beforeEach(function(){
      mockTopicRegistry.keySkillsTopics=[
        {
          id:1,
          description:"test topic 1"
        }
        ];  
    });
    
    var distribution;
    beforeEach(function(done){
      sessionScheduler.createDistribution(function(result){
        distribution=result;
        done();        
      })      
    });
    
    it('there are 10 key skills questions on every sheet',function(){
      distribution.weeks.forEach(function(week,weekIndex){
        expect(week.keySkills.questionSpecs.length).toBe(10);        
      });
    });
    
    it('uses null as placeholders for topic id',function(){
      var numberOfNulls=0;
      var expectedNumberOfNulls = 25 * 15;//25 missing topics, expecting distribution of 15 instances of each
      distribution.weeks.forEach(function(week){
        week.keySkills.questionSpecs.forEach(function(questionSpec){
          if(questionSpec.id==null){
            numberOfNulls++;
          }
        });
      });
      expect(numberOfNulls).toEqual(expectedNumberOfNulls);
    });    
  });
    
  
});