'use strict';

describe('GreatMath.topic-distributor module', function() {
  beforeEach(module('GreatMath.topic-distributor'));
  beforeEach(function(){
    module(function($provide){
      $provide.factory('topicProvider',function(){
        return{
          getTopics : function(callback){
            callback([
            {
              id:1,
              name:"topic1"              
            },
            {
              id:2,
              name:"topic2"              
            },
            {
              id:3,
              name:"topic3"              
            },
            {
              id:4,
              name:"topic4"              
            }
            ]);            
          }          
        }
      });      
    });    
  });

  var topicDistributor;
  
  beforeEach(inject(function($rootScope, _topicDistributor_) {
    
    topicDistributor=_topicDistributor_;
  }));
    
  describe('BasicDistribution',function(){
    
    var distribution;
    beforeEach(function(done){
      topicDistributor.createDistribution(function(result){
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
    for (var i=1;topicId<=26;topicId++){
      var topicId=i;
    
      it("topic " + topicId + " has 15 questions",function(){
        var numberOfOccurances=0;        
        distribution.weeks.forEach(function(item){
          item.topics.forEach(function(item){
            if(item.id==topicId){
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
      topicDistributor.createDistribution(function(result){
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
    
    it('there are 10 times table questions on every sheet',function(){
      distribution.weeks.forEach(function(week,weekIndex){
        expect(week.timesTable.questionSpecs.length).toBe(10);        
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
});