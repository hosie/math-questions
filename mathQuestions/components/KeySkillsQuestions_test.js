'use strict';

describe('GreatMath.key-skills-questions module', function() {
  var EXPECTED_NUMBER_OF_TOPICS=29;
  beforeEach(module('GreatMath.key-skills-questions'));
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
  
  beforeEach(function(){
    inject();
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
  
});
  
  
