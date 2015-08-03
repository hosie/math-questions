'use strict';

angular.module('GreatMath.question-generator', ['GreatMath.topic-registry'])
.factory('questionGenerator', ['topicRegistry',function(topicRegistry) {
  return{
    defaultGeneratorFunction:null,
    setDefault:function(defaultGeneratorFunction){
      this.defaultGeneratorFunction=defaultGeneratorFunction;
    },
    generate:function(questionSpec,callback){
      var generatorFunction;
      var topicId = questionSpec.topicId;
      var self=this;
      topicRegistry.getTopics({class:questionSpec.topicClass},function(err,topics){
        if(err==null){
          generatorFunction = topics[topicId-1].generateQuestion;//TODO this -1 business means that we know something about how the topicRegistry  allocates IDs. This is wrong
          generatorFunction(callback,questionSpec);
        }else if(err==topicRegistry.ERR_UNKNOWN_ID){
          if(null!=self.defaultGeneratorFunction){
            self.defaultGeneratorFunction(questionSpec,callback);                  
          }else{
            setTimeout(function(){
              callback("no function registered for topic " + questionSpec.topicId + " and no default registered");
            },0);
          }
        }
      });
        
    }    
  };
}]);
