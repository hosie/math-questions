'use strict';

describe('GreatMath.question-generator module', function() {
  
  var mockTopicRegistry={
    
    getTopics:function(filter,callback){
      
    }
  };
  
  var questionGenerator;

  beforeEach(module('GreatMath.question-generator'));

  beforeEach(module(function($provide){
    $provide.factory('topicRegistry',function(){
      //return a mock topicRegistry 
      return mockTopicRegistry;
    });            
  }));
  
  beforeEach(inject(function(_questionGenerator_){
    questionGenerator=_questionGenerator_;    
  }));
  
  beforeEach(function(){
    mockTopicRegistry.getTopic=function(id,callback){        
      callback(this.testTopic);
    };
    mockTopicRegistry.getTopics=function(filter,callback){        
      callback([this.testTopic]);
    };
  });
  
  it('calls the question module to generate a question',function(done){
    mockTopicRegistry.testTopic = {
      //TODO use - but how can we expect the callback to be async? callback:jasmine.createSpy('generateQuestion')
      generateQuestion:function(callback){
        callback("testQuestion")
      }
    }
    
    questionGenerator.generate({
      class : "testClass",
      topicId    : 1
    },function(err,question){
      expect(err).toBeNull();
      expect(question).toEqual("testQuestion");            
      done();
    });
  });
  
  it('Additional options are passed to the generator function',function(done){
    mockTopicRegistry.testTopic = {
      //TODO use - but how can we expect the callback to be async? callback:jasmine.createSpy('generateQuestion')
      generateQuestion:function(callback,errorCallback,options){
        callback("question1 with additional option " + options.testOption);
      }
    }
    
    questionGenerator.generate({
      class : "testClass",
      topicId    : 1,
      testOption : "foo"
    },function(err,question){
      expect(err).toBeNull();
      expect(question).toEqual("question1 with additional option foo");            
      done();
    });
    
  });
  
  it('Question modules may throw exceptions synchronously',function(done){
    mockTopicRegistry.testTopic = {
      generateQuestion:function(){
        throw "Synchronous Error";
      }
    }
    
    questionGenerator.generate({
      class : "testClass",
      topicId    : 1
    },function(err,question){
      expect(err).not.toBeNull();
      expect(err).toEqual("Synchronous Error");            
      done();
    });        
  });
  
  it('Question modules may report exceptions asynchronously',function(done){
    mockTopicRegistry.testTopic = {
      //TODO use - but how can we expect the callback to be async? callback:jasmine.createSpy('generateQuestion')
      generateQuestion:function(callback,errorCallback,options){
        setTimeout(function(){
          errorCallback("Asynchronous Error");
        },0);
      }
    }
    
    questionGenerator.generate({
      class : "testClass",
      topicId    : 1
    },function(err,question){
      expect(err).not.toBeNull();
      expect(err).toEqual("Asynchronous Error");            
      done();
    });
  });
  
  describe('default generator',function(){
    
    beforeEach(function(){//TODO refactor, use jasmine.mock or something here?
      mockTopicRegistry.ERR_UNKNOWN_ID={reason:"ERR_UNKNOWN_ID"};
      mockTopicRegistry.getTopics = function(filter,callback){
        callback(this.ERR_UNKNOWN_ID,null);
      }
    });
    
    it('registers default generator function',function(done){
      questionGenerator.setDefault(function(questionSpec,callback){
        callback(null,"placeholder for topic " + questionSpec.topicId);
      });
      
      questionGenerator.generate(
        {
          class : "mentalStrategies",
          topicId    : 1
        },function(err,question){
          expect(err).toBeNull();
          expect(question).toEqual("placeholder for topic 1");
          done();
        }
      );
    });
  
    it('throws exception for unkown topic id if no default generator is registered',function(){
      var questionSpec = {
        class : "mentalStrategies",
        topicId    : 1
      };
      questionGenerator.generate(questionSpec,function(err,question){
        expect(err).not.toBeNull();
      });
    });

  });  
   
  //Not implemented yet - do we need this?
  xit('registers default generator function on a per topic class basis',function(done){});
    
  xit('allows default function to be async',function(){});
  
  //DEBT:implemented but not tested
  xit('calls "no default function" error async',function(){});
  
  
  
});
