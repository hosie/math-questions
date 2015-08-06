'use strict';

describe('GreatMath.topic-registry module', function() {
  var topicRegistry;

  beforeEach(module('GreatMath.topic-registry'));
  
  beforeEach(inject(function(_topicRegistry_){
    topicRegistry=_topicRegistry_;    
  }));
  
  
  it('Register a topic',function(done){    
    topicRegistry.register(
      {
        class : "testClass",
        generateQuestion : function(){}
      }
    );    
    topicRegistry.getTopics(function(topics){
      expect(topics.length).toBe(1);
      done();
    });    
  });
  
  it('returns empty array if filter does not match',function(done){
    topicRegistry.getTopics(function(topics){
      expect(topics.length).toBe(0);
      done();
    })
  });
  
  it('class name in filter is optional',function(done){    
    topicRegistry.register(
      {
        class : "testClass",
        generateQuestion : function(){}
      }
    );    
    topicRegistry.getTopics({},function(topics){
      expect(topics.length).toBe(1);
      done();
    });    
  });
    
  it('Register more than one topic',function(done){    
    topicRegistry.register(
      {
        class : "testClass",
        generateQuestion : function(){}
      }
    );
    topicRegistry.register(
      {
        class : "testClass",
        generateQuestion : function(){}
      }
    );    
    topicRegistry.register(
      {
        class : "testClass",
        generateQuestion : function(){}
      }
    );        
    topicRegistry.getTopics(function(topics){
      expect(topics.length).toBe(3);
      done();
    });    
  });
  
  it('registers topics from different classes separately',function(done){
    topicRegistry.register(
      {
        class : "testClass1",
        generateQuestion : function(){}
      }
    );    
    topicRegistry.register(
      {
        class : "testClass2",
        generateQuestion : function(){}
      }
    );

    topicRegistry.getTopics({class:"testClass1"},function(topics){
      expect(topics.length).toBe(1);
      done();
    });    
    
  });
  
  it('injects an id into topic',function(){
    topicRegistry.register(
      {
        class : "testClass",
        generateQuestion : function(){}
      }
    );
    topicRegistry.getTopics(function(topics){
      expect(topics[0].id).toEqual(jasmine.any(Number)) ;
    });
    
  });
  
  it('each topic contains a unique id',function(done){
    topicRegistry.register(
      {
        class : "testClass",
        generateQuestion : function(){}
      }
    );    
    topicRegistry.register(
      {
        class : "testClass",
        generateQuestion : function(){}
      }
    );    
    topicRegistry.register(
      {
        class : "testClass1",
        generateQuestion : function(){}
      }
    );    
    var observedIds=[];
    topicRegistry.getTopics(function(topics){
      topics.forEach(function(topic){
        expect(observedIds).not.toContain(topic.id);
        observedIds.push(topic.id);
      });
      done();
    });
            
  });
  
  it('topic can be retrieved by id',function(done){
    topicRegistry.register(
      {
        class : "testClass",
        generateQuestion : function(){}
      }
    );    
    topicRegistry.register(
      {
        class : "testClass",
        generateQuestion : function(){}
      }
    );    
    topicRegistry.register(
      {
        class : "testClass1",
        generateQuestion : function(){}
      }
    );
    
    topicRegistry.getTopics(function(topics){
      var numberOfTopicsToCheck = topics.length;
      topics.forEach(function(topic){
        topicRegistry.getTopic(topic.id,function(err,thetopic){
          expect(err).toBeNull();
          expect(thetopic.generateQuestion).toBe(topic.generateQuestion);
          numberOfTopicsToCheck--;
          if(0==numberOfTopicsToCheck){
            done();            
          }
        });
      });
    });        
  });
  
  it('reports error if invalid topic id is used',function(done){
    topicRegistry.register(
      {
        class : "testClass1",
        generateQuestion : function(){}
      }
    );
    
    topicRegistry.getTopics(function(topics){
      var wrongId = topics[0].id + 1;
      topicRegistry.getTopic(wrongId,function(err,topic){
        expect(err).not.toBeNull();
        expect(err.reason).toEqual(topicRegistry.ERR_UNKNOWN_ID);
        expect(err.info.id).toEqual(wrongId);
        expect(topic).toBeNull();    
        done();
      
      });
    });
    
  });
  
  it('Allows chaining for registration methods',function(done){
    topicRegistry.register(
      {
        class : "testClass",
        generateQuestion : function(){}
      }
    )
    .register(
      {
        class : "testClass",
        generateQuestion : function(){}
      }
    )
    .register(
      {
        class : "testClass",
        generateQuestion : function(){}
      }
    )
    .getTopics(function(topics){
      expect(topics.length).toBe(3);
      done();
    }); 
  });
  
  //DEBT: behaviour known to be true but not tested
  xit('always returns the same topic id for the same topic regarless of which filters were applied');
  
  //DEBT: behaviour known to be true but not tested
  xit('getTopics is async');
   
  
});
