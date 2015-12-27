'use strict';

describe('GreatMath.times-table-questions module', function() {
  var mockTopicRegistry =   {
    registeredTopics:[],
    register:function(topic){
      this.registeredTopics.push(topic);      
      return this;
    }                    
  };
  
  beforeEach(module('GreatMath.times-table-questions'));
    
  beforeEach(function(){
    module(function($provide){
      $provide.factory('topicRegistry',function(){
        return mockTopicRegistry ;
      });      
    });    
  });
  
  beforeEach(function(){
    inject();
  });
  
  it('registers a function for the only topic',function(){
    expect(mockTopicRegistry.registeredTopics.length).toEqual(1);
  });
  
  it('has a generateQuestion function',function(){
    expect(mockTopicRegistry.registeredTopics[0].generateQuestion).toEqual(jasmine.any(Function));
  });
  
  it('has a description',function(){
    expect(mockTopicRegistry.registeredTopics[0].description).toEqual(jasmine.any(String));
  });
  
  it('has a valid classname',function(){
    expect(mockTopicRegistry.registeredTopics[0].class).toEqual(jasmine.any(String));
  });
  
  it('callsback with a question',function(done){
    var topic = mockTopicRegistry.registeredTopics[0];
    topic.generateQuestion(
      function(question){
        expect(question).toEqual(jasmine.any(String));
        done();
      },
      null,
      {
        multiplier:1
      }
    );

  });
  
  it('multiplier is optional',function(done){
    var topic = mockTopicRegistry.registeredTopics[0];
    topic.generateQuestion(
      function(question){
        expect(question).toEqual(jasmine.any(String));
        done();
      },
      function(err){
        expect(false).toEqual(true);
        
      },
      {        
      }
    );
  });
  
  it('options parameter is optional',function(done){
    var topic = mockTopicRegistry.registeredTopics[0];
    topic.generateQuestion(
      function(question){
        expect(question).toEqual(jasmine.any(String));
        done();
      },
      function(err){
        expect(false).toBe(true);        
      }
    );
  });
  
  it('callsback with answer',function(done){
    var topic = mockTopicRegistry.registeredTopics[0];
    topic.generateQuestion(
      function(question,diagram,template,answer){
        expect(question).toEqual(jasmine.any(String));
        expect(answer).toBeDefined();
        done();
      },
      null,
      {
        multiplier:1
      }
    );    
  });
  
  xit('some times the answer is blanked out and sometime it is one of the operands');//need to do this manually for now
  
  xit('operands range from 2 to 12');//need to do this manually for now
});
  
  
