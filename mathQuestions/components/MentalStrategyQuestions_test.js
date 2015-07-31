'use strict';

describe('GreatMath.mental-strategy-questions module', function() {
  
  beforeEach(module('GreatMath.mental-strategy-questions'));
  var mockQuestionGenerator =   {
    registeredFunctions:{},
    topicDescriptions:{},
    when:function(questionSpec,generatorFunction){
      this.registeredFunctions[questionSpec.topicId]=generatorFunction;
      this.topicDescriptions[questionSpec.topicId]=questionSpec.topicDescription;
      return this;
    }                    
  };
  
  beforeEach(function(){
    module(function($provide){
      $provide.factory('questionGenerator',function(){
        return mockQuestionGenerator;
      });      
    });    
  });
  
  beforeEach(function(){
    inject();
  });  
  
  var topicId=1;
  while (topicId<=5){
    (
      function(id){
        it('registers a function for topic ' + id,function(){
          expect(mockQuestionGenerator.registeredFunctions[id]).not.toEqual(undefined);
        });
        
        it('registers a description for topic ' + id,function(){
          expect(mockQuestionGenerator.topicDescriptions[id]).not.toEqual(undefined);
        });    
        
        it('topic ' + id + ' function callsback with a question',function(done){
          mockQuestionGenerator.registeredFunctions[id](function(err,question){
            expect(err).toBeNull();
            expect(question).not.toBeNull();
            done();
          });
        });        
      }
    )(topicId)
    topicId++;
  }
  
  
  
});
  
  
