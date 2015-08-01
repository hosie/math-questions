'use strict';
(function(){
  angular.module('GreatMath.mental-strategy-questions', ['GreatMath.question-generator'])
  .run(function(questionGenerator){
    questionGenerator.when(
      {
        topicClass : "mentalStrategies",
        topicId    : 1,
        topicDescription : "Number bonds to 5"
      }
      ,function(callback){
        generateNumberBonds(5,callback);
      })
    .when(
      {
        topicClass : "mentalStrategies",
        topicId    : 2,
        topicDescription : "Number bonds to 10"
      },function(callback){
        generateNumberBonds(10,callback);
      })
    .when(
      {
        topicClass : "mentalStrategies",
        topicId    : 3,
        topicDescription : "Number bonds to 20"
      }
      ,function(callback){
      generateNumberBonds(20,callback);
    })
    .when(
      {
        topicClass : "mentalStrategies",
        topicId    : 4,
        topicDescription : "Number bonds to 100"
      },function(callback){
      generateNumberBonds(100,callback);
    })
    .when(
    {
      topicClass : "mentalStrategies",
      topicId:5,
      topicDescription:"Doubling single digit"
    },function(callback){
      var theDigit=randomInteger(9);
      callback(null,"What is double " + theDigit + "?");
    }
    )
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