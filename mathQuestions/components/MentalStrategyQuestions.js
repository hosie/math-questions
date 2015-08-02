'use strict';
(function(){
  angular.module('GreatMath.mental-strategy-questions', ['GreatMath.question-generator','GreatMath.math-util'])
  .run(function(questionGenerator,mathUtil){
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
        var theDigit=mathUtil.randomInteger(9);
        callback(null,"What is double " + theDigit + "?");
      }
    )
    .when(
      {
        topicClass : "mentalStrategies",
        topicId:6,
        topicDescription:"Doubling two digit"
      },function(callback){
        var theDigit=mathUtil.randomInteger(99,10);
        callback(null,"What is double " + theDigit + "?");
      }
    )
    ;
    
    var box= "\u2610";

    function generateNumberBonds(answer,callback){
      var operand1 = mathUtil.randomInteger(answer-1);
      var operand2 = answer - operand1;
      
      var missingDigit = mathUtil.randomInteger(2);
      if(missingDigit==1){
        operand1=box;
      }
      if(missingDigit==2){
        operand2=box;
      }
      var reverse = mathUtil.randomInteger(2);
      var question;
      if(reverse==1){
        question = "" + operand1 + " + " + operand2 + " = " + answer; 
      }else{
        question = answer + " = " + operand1 + " + " + operand2;
        
      }
       
      callback(null,question);
    }
  });

  
})();