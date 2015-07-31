'use strict';

angular.module('GreatMath.question-generator', [])
.factory('questionGenerator', [function() {
  return{
    defaultGeneratorFunction:null,
    topics:[],
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
          setTimeout(function(){
            callback("no function registered for topic " + questionSpec.topicId + " and no default registered");
          },0);
        }        
      }
      
    
      
    },
    when:function(questionSpec,generatorFunction){
      this.topics.push({
        id:questionSpec.topicId,
        description:questionSpec.topicDescription
      });
      if(undefined==this.questionGeneratorFunctions[questionSpec.topicClass]){
        this.questionGeneratorFunctions[questionSpec.topicClass]={};
      }
      this.questionGeneratorFunctions[questionSpec.topicClass][questionSpec.topicId]=generatorFunction;
      return this;
    },
    getTopics:function(callback){
      //needs to be asynchronous in case it is called from within a digest or apply and the callback wants to run apply
      var self = this;
      setTimeout(function(){
        callback(self.topics);  
      },0);
      
    }
    
  };
}]);
