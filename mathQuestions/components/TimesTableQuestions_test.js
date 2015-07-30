'use strict';

describe('GreatMath.times-table-questions module', function() {
  
  beforeEach(module('GreatMath.times-table-questions'));
  var mockQuestionGenerator =   {
    registeredFunctions:{},
    when:function(questionSpec,generatorFunction){
      this.registeredFunctions[questionSpec.topicId]=generatorFunction;
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
  
  it('registers a function for topic 1',function(){
    expect(mockQuestionGenerator.registeredFunctions[1]).not.toEqual(undefined);
  });
  
  it('topic 1 function callsback with a question',function(done){
    mockQuestionGenerator.registeredFunctions[1](function(err,question){
      expect(err).toBeNull();
      expect(question).not.toBeNull();
      done();
    },
    {
      multiplier : 1
    }
    );
  });
  
  xit('some times the answer is blanked out and sometime it is one of the operands');//need to do this manually for now
  
  xit('operands range from 2 to 12');//need to do this manually for now
});
  
  
