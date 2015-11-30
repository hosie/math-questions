'use strict';

//A functions to select questions from a set of pre-canned questions
angular.module('GreatMath.question-bank', [])
.config(function ($httpProvider) {
  $httpProvider.useApplyAsync(true);
})
.factory('questionIterator', function(questionList) {
  return {
    nextIndex:0,
    next:function(callback){
      
      var self = this;
      questionList.get(function(list){
        if(self.nextIndex==list.length){
          self.nextIndex=0;
        }  
        callback("" + list[self.nextIndex++]);
      });      
    }
  };
})
.service('questionList',function($http){
  return {
    get:function(callback){      
      $http.get("/questionBank/questions").then(function(response){
        var list = response.data.split("\n");
        callback(list.map(function(item){
          return unescape(item);
        }));
        
      });      
    }
  }
});