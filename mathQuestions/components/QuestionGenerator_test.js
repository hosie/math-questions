'use strict';

describe('GreatMath.question-generator module', function() {
  var questionGenerator;

  beforeEach(module('GreatMath.question-generator'));
  
  beforeEach(inject(function(_questionGenerator_){
    questionGenerator=_questionGenerator_;    
  }));
  
  //TODO - refactor the registry and generator out to separate modules? So that we can test the behaviour of each concern separately.
  // topicList belongs in registry?
  describe('registry',function(){
    it('Register a function for a topic id',function(done){
      var questionSpec = {
        topicClass : "mentalStrategies",
        topicId    : 1
      };
      questionGenerator.when(
        {
          topicClass : "mentalStrategies",
          topicId    : 1
        },function(callback){
          callback(null,"question1");
        }
      );
      questionGenerator.generate(
        {
          topicClass : "mentalStrategies",
          topicId    : 1
        },function(err,question){
          expect(err).toBeNull();
          expect(question).toEqual("question1");
          done();
        }
      );    
    });
    
    it('Calls correct function for each topic',function(done){
      var callbacksRecorded=[false,false,false];
      var recordCallback=function(index){
        callbacksRecorded[index]=true;
        if(callbacksRecorded[0] && callbacksRecorded[1] && callbacksRecorded[2]){
          done();
        }
      }
      questionGenerator.when(
        {
          topicClass : "testClass",
          topicId    : 1
        },function(callback){
          callback(null,"question1");
        }
      );
      questionGenerator.when(
        {
          topicClass : "testClass",
          topicId    : 2
        },function(callback){
          callback(null,"question2");
        }
      );
      questionGenerator.when(
        {
          topicClass : "testClass",
          topicId    : 3
        },function(callback){
          callback(null,"question3");
        }
      );
      questionGenerator.generate(
        {
          topicClass : "testClass",
          topicId    : 2
        },function(err,question){
          expect(err).toBeNull();
          expect(question).toEqual("question2");      
          recordCallback(0);
        }
      );
      questionGenerator.generate(
        {
          topicClass : "testClass",
          topicId    : 3
        },function(err,question){
          expect(err).toBeNull();
          expect(question).toEqual("question3");      
          recordCallback(1);
        }
      );    
      questionGenerator.generate(
        {
          topicClass : "testClass",
          topicId    : 1
        },function(err,question){
          expect(err).toBeNull();
          expect(question).toEqual("question1");      
          recordCallback(2);
        }
      );        
    });

    it('Calls correct function for each class',function(done){
      var callbacksRecorded=[false,false,false];
      var recordCallback=function(index){
        callbacksRecorded[index]=true;
        if(callbacksRecorded[0] && callbacksRecorded[1] && callbacksRecorded[2]){
          done();
        }
      }
      questionGenerator.when(
        {
          topicClass : "testClass1",
          topicId    : 1
        },function(callback){
          callback(null,"question1");
        }
      );
      questionGenerator.when(
        {
          topicClass : "testClass2",
          topicId    : 1
        },function(callback){
          callback(null,"question2");
        }
      );
      questionGenerator.when(
        {
          topicClass : "testClass3",
          topicId    : 1
        },function(callback){
          callback(null,"question3");
        }
      );
      questionGenerator.generate(
        {
          topicClass : "testClass2",
          topicId    : 1
        },function(err,question){
          expect(err).toBeNull();
          expect(question).toEqual("question2");      
          recordCallback(0);
        }
      );
      questionGenerator.generate(
        {
          topicClass : "testClass3",
          topicId    : 1
        },function(err,question){
          expect(err).toBeNull();
          expect(question).toEqual("question3");      
          recordCallback(1);
        }
      );    
      questionGenerator.generate(
        {
          topicClass : "testClass1",
          topicId    : 1
        },function(err,question){
          expect(err).toBeNull();
          expect(question).toEqual("question1");      
          recordCallback(2);
        }
      );        
    });

    
    it('Allows chaining for registration methods',function(done){
      var callbacksRecorded=[false,false,false];
      var recordCallback=function(index){
        callbacksRecorded[index]=true;
        if(callbacksRecorded[0] && callbacksRecorded[1] && callbacksRecorded[2]){
          done();
        }
      }
      questionGenerator.when(
        {
          topicClass : "testClass",
          topicId    : 1
        },function(callback){
          callback(null,"question1");
        })
      .when(
        {
          topicClass : "testClass",
          topicId    : 2
        },function(callback){
          callback(null,"question2");
        })
      .when(
        {
          topicClass : "testClass",
          topicId    : 3
        },function(callback){
          callback(null,"question3");
        });
      
      questionGenerator.generate(
        {
          topicClass : "testClass",
          topicId    : 2
        },function(err,question){
          expect(err).toBeNull();
          expect(question).toEqual("question2");      
          recordCallback(0);
        });
    
      questionGenerator.generate(
        {
          topicClass : "testClass",
          topicId    : 3
        },function(err,question){
          expect(err).toBeNull();
          expect(question).toEqual("question3");      
          recordCallback(1);
        });    

      questionGenerator.generate(
        {
          topicClass : "testClass",
          topicId    : 1
        },function(err,question){
          expect(err).toBeNull();
          expect(question).toEqual("question1");      
          recordCallback(2);
        });
    });
    
  });  
  
  describe('generator',function(){
    it('registers default generator function',function(done){
      questionGenerator.otherwise(function(questionSpec,callback){
        callback(null,"placeholder for topic " + questionSpec.topicId);
      });
      
      questionGenerator.generate(
        {
          topicClass : "mentalStrategies",
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
        topicClass : "mentalStrategies",
        topicId    : 1
      };
      questionGenerator.generate(questionSpec,function(err,question){
        expect(err).not.toBeNull();
      });
    });

    it('Additional options are passed to the generator function',function(){
      questionGenerator.when({
        topicClass : "testClass",
        topicId    : 1
      },function(callback,options){
        callback(null,"question1 with additional option " + options.testOption);
      });
      
      questionGenerator.generate({
        topicClass : "testClass",
        topicId    : 1,
        testOption : "foo"
      },function(err,question){
        expect(err).toBeNull();
        expect(question).toEqual("question1 with additional option foo");            
      });
      
    });
    
  });  
  
  
  xit('registers default generator function on a per topic class basis',function(done){});
  
  
  xit('throws exception for topic class if no default generator is registered',function(){});
  
  
  describe('topic list',function(){
    beforeEach(function(){
      questionGenerator.when(
        {
          topicClass       : "testClass",
          topicId          : 1,
          topicDescription : "topic 1 description"
        },function(callback,options){
          callback(null,"question1");
        }
      )
      .when(
        {
          topicClass : "testClass",
          topicId    : 2,
          topicDescription : "topic 2 description"
        },function(callback,options){
          callback(null,"question2");
        }
      )
      .when(
        {
          topicClass : "testClass",
          topicId    : 3,
          topicDescription : "topic 3 description"
        },function(callback,options){
          callback(null,"question3");
        }
      );
    });
    
    it('provides a list of all registered topics',function(done){
      questionGenerator.getTopics(function(topics){
        expect(topics.length).toBe(3);
        done();
      });
    });

    it('topics contain correct description',function(done){
      questionGenerator.getTopics(function(topics){
        expect(topics[1].description).toEqual('topic 2 description');
        done();
      });
    });

    it('topics contain correct id',function(done){
      questionGenerator.getTopics(function(topics){
        expect(topics[1].id).toEqual(2);
        done();
      });
    });     

    xit('getTopics is async');
    
    
  });
  
  
  xit('allows default function to be async',function(){});
  
  xit('calls "no default function" error async',function(){});
  
  xit('duplicate registrations causes error');
});
