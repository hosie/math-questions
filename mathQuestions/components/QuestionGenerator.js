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
      topicRegistry.getTopics({class:questionSpec.class},function(topics){
        if((topicId-1) < topics.length){
          generatorFunction = topics[topicId-1].generateQuestion;//TODO this -1 business means that we know something about how the topicRegistry  allocates IDs. This is wrong
          try{
            
            generatorFunction(
              function(question){//success handler
                callback(null,question);
              },              
              function(err){//async error handler
                callback(err,null);                                
              },
              questionSpec//options
            );
          }catch(err){//synchronous error handler
            //error from generateQuestion
            setTimeout(function(){
              callback(err,null);
            },0);
          }
          
          
        }else{
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
