'use strict';

(function(){
  angular.module('GreatMath.times-table-questions', ['GreatMath.question-generator'])
  .run(function(questionGenerator){
    questionGenerator.when(
      {
        topicClass : "timesTable",
        topicId    : 1
      }
      ,function(callback,options){
        generateTimestable(options.multiplier,callback);
      })  
    ;
  });

  var box= "\u2610";
  var multiplicationSign = "\u00D7"
  function randomInteger(max,min){
    return min + Math.floor((max-min)*Math.random());  
  }

  function generateTimestable(multiplier,callback){
    var multiplier2 = randomInteger(12,2);
    var missingDigit = randomInteger(2,1);
    var answer       = multiplier * multiplier2;
    if(missingDigit==1){
      multiplier2=box;
    }
    if(missingDigit==2){
      answer=box;
    }
    var reverse = randomInteger(2);
    
    var question = "" + multiplier + multiplicationSign + multiplier2 + " = " + answer; 
    
     
    callback(null,question);
  }
})();