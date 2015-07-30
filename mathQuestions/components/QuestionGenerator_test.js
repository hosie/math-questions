'use strict';

describe('GreatMath.question-generator module', function() {
  var questionGenerator;
  
  beforeEach(module('GreatMath.question-generator'));
  
  beforeEach(inject(function(_questionGenerator_){
    questionGenerator=_questionGenerator_;    
  }));
  
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
  
  xit('registers default generator function on a per topic class basis',function(done){});
  
  it('throws exception for unkown topic id if no default generator is registered',function(){
    var questionSpec = {
      topicClass : "mentalStrategies",
      topicId    : 1
    };
    questionGenerator.generate(questionSpec,function(err,question){
      expect(err).not.toBeNull();
    });
  });
  
  xit('throws exception for topic class if no default generator is registered',function(){});
  
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
  
  xit('allows default function to be async',function(){});
  
  xit('duplicate registrations causes error');
});
