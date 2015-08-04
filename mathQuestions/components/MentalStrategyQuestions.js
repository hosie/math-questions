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
        description : "Number bonds to 20",
        generateQuestion : function(callback){
          generateNumberBonds(20,callback);
        }
      }
    )
    .register(
      {
        class : "mentalStrategies",
        description : "Number bonds to 100",
        generateQuestion: function(callback){
          generateNumberBonds(100,callback);
        }
      }
    )
    .register(
      {
        class : "mentalStrategies",
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
        description:"Doubling two digit",
        generateQuestion: function(callback){
        var theDigit=mathUtil.randomInteger(99,10);
        callback("What is double " + theDigit + "?");
        }
      }
    )
    .register(
      {
        class : "mentalStrategies",
        description:"Halving single digit",
        generateQuestion : function(callback){
          var theDigit=mathUtil.randomInteger(9);
          callback("Halve " + theDigit);
        }
      }
    )
    .register(
      {
        class : "mentalStrategies",
        description:"Halving two digit",
        generateQuestion: function(callback){
          var theDigit=mathUtil.randomInteger(99,10);
          callback("Halve " + theDigit);
        }
      }
    )
    .register(
      {
        class : "mentalStrategies",
        description:"Add 10",
        generateQuestion: function(callback){
          var theDigit=mathUtil.randomInteger(99,1);
          callback("10 + " + theDigit + " = " + box);
        }
      }
    )
    .register(
      {
        class : "mentalStrategies",
        description:"Subtracting 10",
        generateQuestion: function(callback){
          var theDigit=mathUtil.randomInteger(99,11);
          callback("" + theDigit + " - 10 = " + box);
        }
      }
    )
    .register(
      {
        class : "mentalStrategies",
        description:"Adding multiples of 10",
        generateQuestion: function(callback){
          var multiplier = mathUtil.randomInteger(9);
          var operand1  = mathUtil.randomInteger(99,1);
          var multipleOfTen = 10 * multiplier;
          callback("" + operand1 + " + " + multipleOfTen + "=" + box);
        }
      }
    )
    .register(
      {
        class : "mentalStrategies",
        description:"Subtracting multiples of 10",
        generateQuestion: function(callback){
          var answer = mathUtil.randomInteger(89,1);
          var multiplier = mathUtil.randomInteger(9);
          var multipleOfTen = 10 * multiplier;
          
          var operand1  = answer + multipleOfTen;
          
          callback("" + operand1 + " - " + multipleOfTen + " =" + box);
        }
      }
    )
    .register(
      {
        class : "mentalStrategies",
        description:"How many to a multiple of 10",
        generateQuestion: function(callback){
          var multiplier = mathUtil.randomInteger(9);
          var multipleOfTen = 10 * multiplier;
          var operand2  = mathUtil.randomInteger(9);
          var operand1  = multipleOfTen - operand2;
          
          callback("" + operand1 + " + " + box + "=" + multipleOfTen);
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