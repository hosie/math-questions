'use strict';
(function(){
  angular.module('GreatMath.mental-strategy-questions', ['GreatMath.topic-registry','GreatMath.math-util'])
  .run(function(topicRegistry,mathUtil){
    topicRegistry.register(
      {
        class  : "mentalStrategies",
        description : "Number bonds to 5",
        generateQuestion: function(callback){
          generateNumberBonds(5,callback);
        }
      }
    )
      
    .register(
      {
        class : "mentalStrategies",
        description : "Number bonds to 10",
        generateQuestion: function(callback){
        generateNumberBonds(10,callback);
        }
      }
    )
    .register(
      {
        class : "mentalStrategies",
        topicId    : 3,
        description : "Number bonds to 20",
        generateQuestion : function(callback){
          generateNumberBonds(20,callback);
        }
      }
    )
    .register(
      {
        class : "mentalStrategies",
        topicId    : 4,
        description : "Number bonds to 100",
        generateQuestion: function(callback){
          generateNumberBonds(100,callback);
        }
      }
    )
    .register(
      {
        class : "mentalStrategies",
        topicId:5,
        description:"Doubling single digit",
        generateQuestion : function(callback){
          var theDigit=mathUtil.randomInteger(9);
          callback("What is double " + theDigit + "?");
        }
      }
    )
    .register(
      {
        class : "mentalStrategies",
        topicId:6,
        description:"Doubling two digit",
        generateQuestion: function(callback){
        var theDigit=mathUtil.randomInteger(99,10);
        callback("What is double " + theDigit + "?");
        }
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
       
      callback(question);
    }
  });  
})();