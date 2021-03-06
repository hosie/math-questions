'use strict';

describe('GreatMath.key-skills-questions module', function() {
  var EXPECTED_NUMBER_OF_TOPICS=32;
  beforeEach(module('GreatMath.key-skills-questions'));
  
  var mockQuestionIterator = {
    next:function(callback){
      callback("Test question");        
    }
  };

  beforeEach(function(){
    module(function($provide){
      $provide.factory('questionIterator',function(){
          return mockQuestionIterator;
      });
    });    
  });
  
  var mockTopicRegistry =   {
    registeredTopics:[],
    register:function(topic){
      this.registeredTopics.push(topic);      
      return this;
    }                    
  };
  
  beforeEach(function(){
    module(function($provide){
      $provide.factory('topicRegistry',function(){
        return mockTopicRegistry;
      });      
    });    
  });
  
  
  
  it('registers expected number of topics',function(){
    inject();
    expect(mockTopicRegistry.registeredTopics.length).toEqual(EXPECTED_NUMBER_OF_TOPICS);
    
  });
  
  
  describe('generateQuestion functions',function(){
    beforeEach(function(){
      inject();
    });  
    for(var i=0;i<EXPECTED_NUMBER_OF_TOPICS;i++){
      (function(topicIndex){
        
        describe('topic number ' + topicIndex,function(){
          
          var topic;
          
          beforeEach(function(){
              topic = mockTopicRegistry.registeredTopics[topicIndex];          
          });
                    
          it('topic ' + topicIndex + ' has a generateQuestion function',function(){
            expect(topic.generateQuestion).toEqual(jasmine.any(Function));
          });

          it('topic ' + topicIndex + ' generateQuestion function callsback with a question',function(done){
            topic.generateQuestion(function(question){
              expect(question).toEqual(jasmine.any(String));
              done();
            });
          });

          it('topic ' + topicIndex + ' generateQuestion function callsback with a question every time',function(done){
            var numberOfInvokes=20;
            var numberOfCallbacksRemaining = numberOfInvokes;
            var topic = mockTopicRegistry.registeredTopics[topicIndex];

            for(var i=1;i<=numberOfInvokes;i++){
              topic.generateQuestion(function(question){
                
                expect(question).toEqual(jasmine.any(String));
                expect(question.length)
                numberOfCallbacksRemaining--;
                if(numberOfCallbacksRemaining==0){
                  done();
                }
              });  
            }          
          });
          
        });
          
                
      })(i);      
    }        
  });
  
  describe('descriptions',function(){
    beforeEach(function(){
      inject();
    });  
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
    beforeEach(function(){
      inject();
    });  
    for(var i=0;i<EXPECTED_NUMBER_OF_TOPICS;i++){
      (function(topicIndex){
        it('topic number ' + topicIndex + ' has a valid classname',function(){
          var topic = mockTopicRegistry.registeredTopics[topicIndex];
          expect(topic.class).toEqual(jasmine.any(String));
        });  
      })(i);      
    }        
  });
  
  describe('substitution',function(){
    beforeEach(module('GreatMath.key-skills-questions'));
  
     

    var substitution;
    beforeEach(function(done){
      inject(function(_substitution_){
        substitution = _substitution_;
        done();
      })  
    });
    
    it('calls the question bank',function(done){
      substitution(function(question){
        expect(question).toEqual("Test question");
        done();
      });
    });
  });
});
  
  
