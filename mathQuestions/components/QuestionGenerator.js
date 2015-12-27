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
      topicRegistry.getTopic(topicId,function(err,topic){
        if(err==null){
          generatorFunction=topic.generateQuestion;  
          try{
            
            generatorFunction(
              function(question,diagram,template,answer){//success handler
                if(null==diagram || diagram==0){
                  diagram=undefined;
                }
                var checkAnswer;
                if(typeof answer === 'undefined' || answer==null){
                  checkAnswer=null;
                }else{
                  checkAnswer=function(candidate){
                    if(candidate==answer){
                      return true;
                    }else{
                      return false;
                    }
                  };
                }
                
                callback(null,question,diagram,template,checkAnswer);
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
        }else if(err.reason==topicRegistry.ERR_UNKNOWN_ID){
          if(null!=self.defaultGeneratorFunction){
            self.defaultGeneratorFunction(questionSpec,callback);                  
          }else{
            setTimeout(function(){
              callback("no function registered for topic " + questionSpec.topicId + " and no default registered");
            },0);
          }
        }else{
          //unexpected error
        }
      });        
    }    
  };
}]);
