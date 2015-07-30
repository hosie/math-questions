'use strict';
(function(){
  angular.module('GreatMath.mental-strategy-questions', ['GreatMath.question-generator'])
  .run(function(questionGenerator){
    questionGenerator.when(
      {
        topicClass : "mentalStrategies",
        topicId    : 1
      }
      ,function(callback){
        generateNumberBonds(5,callback);
      })
    .when(
      {
        topicClass : "mentalStrategies",
        topicId    : 2
      },function(callback){
        generateNumberBonds(10,callback);
      })
    .when(
      {
        topicClass : "mentalStrategies",
        topicId    : 3
      }
      ,function(callback){
      generateNumberBonds(20,callback);
    })
    .when(
      {
        topicClass : "mentalStrategies",
        topicId    : 4
      },function(callback){
      generateNumberBonds(100,callback);
    })
    ;
  });

  var box= "\u2610";

  function randomInteger(max){
    return 1 + Math.floor(max*Math.random());  
  }

  function generateNumberBonds(answer,callback){
    var operand1 = randomInteger(answer-1);
    var operand2 = answer - operand1;
    
    var missingDigit = randomInteger(2);
    if(missingDigit==1){
      operand1=box;
    }
    if(missingDigit==2){
      operand2=box;
    }
    var reverse = randomInteger(2);
    var question;
    if(reverse==1){
      question = "" + operand1 + " + " + operand2 + " = " + answer; 
    }else{
      question = answer + " = " + operand1 + " + " + operand2;
      
    }
     
    callback(null,question);
  }
})();