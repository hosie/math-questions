'use strict';

//A functions to select questions from a set of pre-canned questions
angular.module('GreatMath.question-bank', [])
.factory('questionIterator', function(questionList) {
  return {
    nextIndex:0,
    next:function(callback){
      if(this.nextIndex==questionList.length){
        this.nextIndex=0;
      }
      callback("" + questionList[this.nextIndex++]);      
    }
  };
})
.service('questionList',function($http){
  return {
    get:function(callback){      
      $http.get("/questionBank/questions.json").then(function(response){
        
        callback(response.data.split("\n"));    
      });      
    }
  }
  
  
});