'use strict';

angular.module('GreatMath.topic-registry', [])
.factory('topicRegistry', [function() {
  var ERR_UNKNOWN_ID="ERR_UNKNOWN_ID";
  return{
    nextId:1,
    registeredTopics:{},
    classNames:[],
    allTopics:[],
    ERR_UNKNOWN_ID:ERR_UNKNOWN_ID,
    register:function(topic){
      //default to the empty string class name
      topic.id= ++this.nextId;
      var className = topic.class || "";
      if(this.registeredTopics[className]==undefined){
        this.registeredTopics[className]=[];
        this.classNames.push(className);        
      }
      this.allTopics[topic.id]=topic;
      this.registeredTopics[className].push(topic);
      return this;
    },
    getTopics:function(filter,callback){
      var targetClass;
      var result = [];
      
      if(callback==undefined){
        callback = filter;
        var self=this;
        this.classNames.forEach(function(className){
          result = result.concat(self.registeredTopics[className])
        });
      }else{
        targetClass=filter.class;
        result = this.registeredTopics[targetClass];
      }
      
      setTimeout(function(){
        callback(result);
      },0);
    },
    getTopic:function(id,callback){
      var result = this.allTopics[id];
      setTimeout(function(){
        if(result==undefined){
          callback(ERR_UNKNOWN_ID,null);
        }else{
          callback(null,result);
        }
        
        
      },0);      
    }
  };
}]);
