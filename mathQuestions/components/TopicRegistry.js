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
      var result = [];
      var classFilter;
      if(callback==undefined){
        callback = filter;
      }else{
        classFilter=filter.class;        
      }
      if(classFilter==undefined){
        result = this.registeredTopics[classFilter];        
      }else{        
        if(this.classNames.lastIndexOf(classFilter)==-1){
          result=[];        
        }else{
          var self=this;
          this.classNames.forEach(function(className){
            result = result.concat(self.registeredTopics[className])
          });
        }
      }      
      
      setTimeout(function(){
        callback(result);
      },0);
    },
    getTopic:function(id,callback){
      var result = this.allTopics[id];
      setTimeout(function(){
        if(result==undefined){
          callback({reason:ERR_UNKNOWN_ID,info:{id:id}},null);
        }else{
          callback(null,result);
        }
        
        
      },0);      
    }
  };
}]);
