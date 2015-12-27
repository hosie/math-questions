'use strict';

fdescribe('GreatMath.question-generator module', function() {
  
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
      callback(null,this.testTopic);
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
  
  it('passes diagram if provided',function(done){
    var testDiagram='<svg width="100" height="100"><rect cx="50" cy="50" width="80" height="80"></rect></svg>';
    mockTopicRegistry.testTopic = {
      //TODO use - but how can we expect the callback to be async? callback:jasmine.createSpy('generateQuestion')
      generateQuestion:function(callback){
        callback("testQuestion",testDiagram);
      }
    }
    
    questionGenerator.generate({
      class : "testClass",
      topicId    : 1
    },function(err,question,diagram){
      expect(err).toBeNull();
      expect(diagram).toEqual(testDiagram);            
      done();
    });
  });
  
  it('if diagram is null, it is passed as undefined',function(done){
    
    mockTopicRegistry.testTopic = {
      //TODO use - but how can we expect the callback to be async? callback:jasmine.createSpy('generateQuestion')
      generateQuestion:function(callback){
        callback("testQuestion",null);
      }
    }
    
    questionGenerator.generate({
      class : "testClass",
      topicId    : 1
    },function(err,question,diagram){
      expect(err).toBeNull();
      expect(diagram).not.toBeDefined();            
      done();
    });
  });
  
  it('if diagram is 0, it is passed as undefined',function(done){
    
    mockTopicRegistry.testTopic = {
      //TODO use - but how can we expect the callback to be async? callback:jasmine.createSpy('generateQuestion')
      generateQuestion:function(callback){
        callback("testQuestion",0);
      }
    }
    
    questionGenerator.generate({
      class : "testClass",
      topicId    : 1
    },function(err,question,diagram){
      expect(err).toBeNull();
      expect(diagram).not.toBeDefined();            
      done();
    });
  });
  
  it('answer template if provided',function(done){
    var testTemplate={postfix:'test postfix'};
    mockTopicRegistry.testTopic = {
      //TODO use - but how can we expect the callback to be async? callback:jasmine.createSpy('generateQuestion')
      generateQuestion:function(callback){
        callback("testQuestion",0,testTemplate);
      }
    }
    
    questionGenerator.generate({
      class : "testClass",
      topicId    : 1
    },function(err,question,diagram,template){
      expect(err).toBeNull();
      expect(template).toEqual(testTemplate);            
      done();
    });
  });
  
  it('looks up topics from registry using correct id',function(done){
    spyOn(mockTopicRegistry,'getTopic').and.callThrough();
    questionGenerator.generate({
      class : "testClass",
      topicId    : 101
    },function(err,question){
      expect(mockTopicRegistry.getTopic).toHaveBeenCalledWith(101,jasmine.any(Function));      
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
  
  describe('checkAnswer',function(){
    
    it('checkAnswer is null if answer not provided',function(done){
      mockTopicRegistry.testTopic = {
        generateQuestion:function(callback){
          callback("testQuestion");
        }
      };
      
      questionGenerator.generate({
        class : "testClass",
        topicId    : 1
      },function(err,question,diagram,template,checkAnswer){
        expect(checkAnswer).toBeNull();
        done();
      });      
    });
    
    it('checkAnswer is null if answer is null',function(done){
      mockTopicRegistry.testTopic = {
        generateQuestion:function(callback){
          callback("testQuestion",null,null,null);
        }
      };
      
      questionGenerator.generate({
        class : "testClass",
        topicId    : 1
      },function(err,question,diagram,template,checkAnswer){
        expect(checkAnswer).toBeNull();
        done();
      });      
    });
    
    it('returns true for correct answer',function(done){
      mockTopicRegistry.testTopic = {
        generateQuestion:function(callback){
          callback("testQuestion",null,null,42);
        }
      };
      
      questionGenerator.generate({
        class : "testClass",
        topicId    : 1
      },function(err,question,diagram,template,checkAnswer){
        expect(checkAnswer(42)).toEqual(true);
        done();
      });      
    });

    it('returns false for incorrect answer',function(done){
      mockTopicRegistry.testTopic = {
        generateQuestion:function(callback){
          callback("testQuestion",null,null,42);
        }
      };
      
      questionGenerator.generate({
        class : "testClass",
        topicId    : 1
      },function(err,question,diagram,template,checkAnswer){
        expect(checkAnswer(43)).toEqual(false);
        done();
      });      
    });
    
    it('answer can be zero',function(done){
      mockTopicRegistry.testTopic = {
        generateQuestion:function(callback){
          callback("testQuestion",null,null,0);
        }
      };
      
      questionGenerator.generate({
        class : "testClass",
        topicId    : 1
      },function(err,question,diagram,template,checkAnswer){
        expect(checkAnswer(0)).toEqual(true);
        done();
      });      
    });
    
    it('casts string to integer',function(done){
      mockTopicRegistry.testTopic = {
        generateQuestion:function(callback){
          callback("testQuestion",null,null,42);
        }
      };
      
      questionGenerator.generate({
        class : "testClass",
        topicId    : 1
      },function(err,question,diagram,template,checkAnswer){
        expect(checkAnswer("42")).toEqual(true);
        done();
      });            
    });
    
    it('casts string to decimal',function(done){
      mockTopicRegistry.testTopic = {
        generateQuestion:function(callback){
          callback("testQuestion",null,null,4.2);
        }
      };
      
      questionGenerator.generate({
        class : "testClass",
        topicId    : 1
      },function(err,question,diagram,template,checkAnswer){
        expect(checkAnswer("4.2")).toEqual(true);
        done();
      });            
    });
  });
  
  describe('default generator',function(){
    
    beforeEach(function(){//TODO refactor, use jasmine.mock or something here?
      mockTopicRegistry.ERR_UNKNOWN_ID={reason:"ERR_UNKNOWN_ID"};
      mockTopicRegistry.getTopics = function(filter,callback){
        callback({reason:this.ERR_UNKNOWN_ID},null);
      }
      mockTopicRegistry.getTopic = function(id,callback){
        callback({reason:this.ERR_UNKNOWN_ID},null);
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
  
    it('calls default generator function when topicId is null',function(done){
      questionGenerator.setDefault(function(questionSpec,callback){
        callback(null,"placeholder for null topic");
      });
      
      questionGenerator.generate(
        {
          class : "mentalStrategies",
          topicId    : null
        },function(err,question){
          expect(err).toBeNull();
          expect(question).toEqual("placeholder for null topic");
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
