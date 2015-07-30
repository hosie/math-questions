'use strict';

angular.module('GreatMath.question-generator', [])
.factory('questionGenerator', [function() {
  return{
    defaultGeneratorFunction:null,
    questionGeneratorFunctions:{},
    otherwise:function(defaultGeneratorFunction){
      this.defaultGeneratorFunction=defaultGeneratorFunction;
    },
    generate:function(questionSpec,callback){
      var generatorFunction;
      if(undefined!=this.questionGeneratorFunctions[questionSpec.topicClass]){
        generatorFunction = this.questionGeneratorFunctions[questionSpec.topicClass][questionSpec.topicId];
      }
        
      if(undefined!=generatorFunction){
        generatorFunction(callback,questionSpec);
      }else{
        if(null!=this.defaultGeneratorFunction){
          this.defaultGeneratorFunction(questionSpec,callback);                  
        }else{
          callback("no function registered for topic " + questionSpec.topicId + " and no default registered");
        }        
      }
      
    
      
    },
    when:function(questionSpec,generatorFunction){
      if(undefined==this.questionGeneratorFunctions[questionSpec.topicClass]){
        this.questionGeneratorFunctions[questionSpec.topicClass]={};
      }
      this.questionGeneratorFunctions[questionSpec.topicClass][questionSpec.topicId]=generatorFunction;
      return this;
    }
    
  };
}]);
