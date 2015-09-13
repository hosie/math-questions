'use strict';

describe('GreatMath.mental-strategy-questions module', function() {
  var EXPECTED_NUMBER_OF_TOPICS=26;
  beforeEach(module('GreatMath.mental-strategy-questions'));
  
  var mockTopicRegistry =   {
    registeredTopics:[],
    register:function(topic){
      this.registeredTopics.push(topic);      
      return this;
    },
    //let the module know that this registry is used for unit testing so that it will expose some of its functions in a white box
    isUnitTest:true                 
  };
  
  beforeEach(function(){
    module(function($provide){
      $provide.factory('topicRegistry',function(){
        return mockTopicRegistry;
      });            
    });    
  });
  
  var tellTheTime12HourClock;
  var mathUtil;
  beforeEach(function(){
    inject(function(_tellTheTime12HourClock_,_mathUtil_){
      tellTheTime12HourClock = _tellTheTime12HourClock_;
      mathUtil               = _mathUtil_;
    });
  });  
  
  it('registers expected number of topics',function(){
    expect(mockTopicRegistry.registeredTopics.length).toEqual(EXPECTED_NUMBER_OF_TOPICS);
    
  });
  
  describe('generateQuestion functions',function(){
    for(var i=0;i<EXPECTED_NUMBER_OF_TOPICS;i++){
      (function(topicIndex){
        it('topic number ' + topicIndex + ' has a generateQuestion function',function(){
          var topic = mockTopicRegistry.registeredTopics[topicIndex];
          expect(topic.generateQuestion).toEqual(jasmine.any(Function));
        });

        it('topic number ' + topicIndex + ' generateQuestion function callsback with a question',function(){
          var topic = mockTopicRegistry.registeredTopics[topicIndex];
          topic.generateQuestion(function(question){
            expect(question).toEqual(jasmine.any(String));
          });
        });        
      })(i);      
    }        
  });
  
  describe('descriptions',function(){
    for(var i=0;i<EXPECTED_NUMBER_OF_TOPICS;i++){
      (function(topicIndex){
        it('topic number ' + topicIndex + ' has a valid description',function(){
          var topic = mockTopicRegistry.registeredTopics[topicIndex];
          expect(topic.description).toEqual(jasmine.any(String));
        });  
      })(i);      
    }        
  });
  
  describe('class names',function(){
    for(var i=0;i<EXPECTED_NUMBER_OF_TOPICS;i++){
      (function(topicIndex){
        it('topic number ' + topicIndex + ' has a valid classname',function(){
          var topic = mockTopicRegistry.registeredTopics[topicIndex];
          expect(topic.class).toEqual(jasmine.any(String));
        });  
      })(i);      
    }        
  });
  
  describe('Tell the time 12 hour clock',function(){
    
    describe('generate',function(){
      beforeEach(function(){
        spyOn(tellTheTime12HourClock,'generateVariation');        
      });
      
      afterEach(function(){
        tellTheTime12HourClock.generateVariation.calls.reset();
      });
      
      it('calls the generateVariation function',function(){
        tellTheTime12HourClock.generate(function(){});
        expect(tellTheTime12HourClock.generateVariation).toHaveBeenCalled();                
        
      });
      
      it('calls the generateVariation function once only',function(){
        tellTheTime12HourClock.generate(function(){});        
        expect(tellTheTime12HourClock.generateVariation.calls.count()).toEqual(1);        
      });
      
      it('calls generateVariation with the value returned from chooseVariation',function(){
        var chooseVariation = tellTheTime12HourClock.chooseVariation;
        tellTheTime12HourClock.chooseVariation=function(){
          return 'potato';
        }
        tellTheTime12HourClock.generate(function(){});
        expect(tellTheTime12HourClock.generateVariation).toHaveBeenCalledWith('potato',jasmine.any(Function));                
        tellTheTime12HourClock.chooseVariation=chooseVariation;
      });
      
      
    });
    
    describe('variation choice',function(){
      
      it('varies between tell and draw',function(){
        //call it a few times and make sure that we have instances of both
        var totalCalls=20;
        var variations=[];
        for(var i=1;i<=totalCalls;i++){
          variations.push(tellTheTime12HourClock.chooseVariation());
        }
        expect(variations).toContain(jasmine.objectContaining({form:'tell'}));
        expect(variations).toContain(jasmine.objectContaining({form:'draw'}),jasmine.any(Function));
      });
      
      it('varies between am and pm for telling and drawing',function(){
        //call it a few times and make sure that we have instances of both
        var totalCalls=20;
        var variations=[];
        for(var i=1;i<=totalCalls;i++){
          variations.push(tellTheTime12HourClock.chooseVariation());
        }
        expect(variations).toContain({form:'tell',period:'am'});
        expect(variations).toContain({form:'tell',period:'pm'});
        expect(variations).toContain({form:'draw',period:'am'});
        expect(variations).toContain({form:'draw',period:'pm'});
        
      });
    });
    
    describe('generate svg',function(){
      it('without hands',function(){
        var diagram = tellTheTime12HourClock.generateSvg();        
        expect(diagram).toMatch(/<svg.*<\/svg>/);
        expect(diagram).not.toMatch(/class="minute-hand"/);
        expect(diagram).not.toMatch(/class="hour-hand"/);          
          
      });
      
      it('with hands',function(){
        var diagram = tellTheTime12HourClock.generateSvg({hour:12,minute:30});        
        expect(diagram).toMatch(/<svg.*<\/svg>/);
        expect(diagram).toMatch(/class="minute-hand"/);
        expect(diagram).toMatch(/class="hour-hand"/);          
          
      });
      
    });
    
    it('generates random time',function(){
      var totalCalls=100;
      var results=[];
      for (var i = 1;i<=totalCalls;i++){
        results.push(tellTheTime12HourClock.randomTime());
      }
      for(var i=0;i<12;i++){
        var hour=i+1;//hours 1-12
        var minute=i*5;//minutes 0-60 in multiples of 5
        expect(results).toContain(jasmine.objectContaining({hour:hour}));
        expect(results).toContain(jasmine.objectContaining({minute:minute}));
      }        
      
    });      
  
    describe('possition of hands',function(){
      it('12 Oclock',function(){
        var handPositions = tellTheTime12HourClock.handPositions({hour:12,minute:0});
        
        expect(handPositions.minuteHand.X).toBe(0);
        expect(handPositions.hourHand.X).toBe(0);
        expect(handPositions.minuteHand.Y).toBeLessThan(0);
        expect(handPositions.hourHand.Y).toBeLessThan(0);  
      });
      
      it('3:00',function(){
        var handPositions = tellTheTime12HourClock.handPositions({hour:3,minute:0});
        
        expect(handPositions.minuteHand.X).toBe(0);
        expect(handPositions.minuteHand.Y).toBeLessThan(0);
        expect(handPositions.hourHand.X).toBeGreaterThan(0);  
        expect(handPositions.hourHand.Y).toBe(0);  
        
      });
      
      it('12:45',function(){
        var handPositions = tellTheTime12HourClock.handPositions({hour:12,minute:45});
        expect(handPositions.minuteHand.Y).toBe(0);
        expect(handPositions.minuteHand.X).toBeLessThan(0);
        expect(handPositions.hourHand.X).toBeGreaterThan(0);  
        expect(handPositions.hourHand.Y).toBeLessThan(0);  
      });
      
    });  
    
    describe('Read the hands',function(){
      it('question is correct',function(done){
        tellTheTime12HourClock.generateVariation({form:'tell'},function(question,diagram,answerTemplate){
          
          expect(question).toEqual("What time is shown on the clock?");
          done();        
        });
      });

      it('adds pm to the answer template',function(done){
        tellTheTime12HourClock.generateVariation({form:'tell',period:'pm'},function(question,diagram,answerTemplate){
          expect(answerTemplate.postfix).toEqual('pm');
          done();
        });
      });
      
      it('adds am to the answer template',function(done){
        tellTheTime12HourClock.generateVariation({form:'tell',period:'am'},function(question,diagram,answerTemplate){
          expect(answerTemplate.postfix).toEqual('am');
          done();
        });
      });
      
      it('diagram has hands',function(done){
        spyOn(tellTheTime12HourClock,'generateSvg');
        tellTheTime12HourClock.generateVariation({form:'tell'},function(question,diagram,answerTemplate){
          expect(tellTheTime12HourClock.generateSvg).toHaveBeenCalledWith(jasmine.objectContaining({hour:jasmine.any(Number),minute:jasmine.any(Number)}));
          tellTheTime12HourClock.generateSvg.calls.reset();
          done();        
        });
      });
    });

    describe('Draw the hands',function(){
      it('question is correct',function(done){
        tellTheTime12HourClock.generateVariation({form:'draw'},function(question,diagram,answerTemplate){
          
          expect(question).toMatch("Draw hands on the clock face showing.*");
          done();        
        });
      });
      
      it('diagram has no hands',function(done){
        spyOn(tellTheTime12HourClock,'generateSvg');
        tellTheTime12HourClock.generateVariation({form:'draw'},function(question,diagram){
          expect(tellTheTime12HourClock.generateSvg).toHaveBeenCalledWith();
          tellTheTime12HourClock.generateSvg.calls.reset();
          done();        
        });
      });

      it('question contains the time from randomTime',function(done){
        var randomTime=tellTheTime12HourClock.randomTime;
        tellTheTime12HourClock.randomTime=function(){
          return {
            hour:10,
            minute:15
          };
        };
        tellTheTime12HourClock.generateVariation({form:'draw'},function(question){
          expect(question).toMatch(/.*10:15.*/);
          done();
        });
        
        tellTheTime12HourClock.randomTime=randomTime;
        
      })
    
      it('question includes am period from variation',function(done){
        tellTheTime12HourClock.generateVariation({form:'draw',period:'am'},function(question){
          expect(question).toMatch(/.*am$/);
          done();
        });        
      });
      
      it('question includes pm period from variation',function(done){
        tellTheTime12HourClock.generateVariation({form:'draw',period:'pm'},function(question){
          expect(question).toMatch(/.*pm$/);
          done();
        });        
      });
    });

    describe('timeToString',function(){
      it('HH:MM',function(){
        var timeString = tellTheTime12HourClock.timeToString({hour:12,minute:30});
        expect(timeString).toEqual("12:30");
      });
      
      it('does not pad hours for <10',function(){
        var timeString = tellTheTime12HourClock.timeToString({hour:9,minute:30});
        expect(timeString).toEqual("9:30");
      });
      
      it('pads minutes for <10',function(){
        var timeString = tellTheTime12HourClock.timeToString({hour:10,minute:0});
        expect(timeString).toEqual("10:00");
      });
    });
    
    describe('errors',function(){
      it('throws exception for invalid form',function(done){
        try{
          tellTheTime12HourClock.generateVariation({form:'invalid'},function(question,diagram,answerTemplate){          
            expect(true).toEqual(false);
            done();        
          });  
        }catch(err){
          done();
        }                
      });
      
      it('throws exception for missing form',function(done){
        try{
          tellTheTime12HourClock.generateVariation({},function(question,diagram,answerTemplate){          
            expect(true).toEqual(false);
            done();        
          });  
        }catch(err){
          done();
        }                
      });
      
    });
  
  });
  
});
  
  
