'use strict';
(function(){
  angular.module('GreatMath.key-skills-questions', ['GreatMath.topic-registry','GreatMath.math-util'])
  .run(function(topicRegistry,mathUtil){
    topicRegistry.register(
      {
        class : "keySkills",
        description:"Multiply whole numbers using Gelosia",
        generateQuestion: function(callback){
          var numberOfDigits = mathUtil.randomInteger(3,2);
          var operand1 = numberOfDigits==2 ? mathUtil.randomInteger(99,11) : mathUtil.randomInteger(999,101);
          numberOfDigits = mathUtil.randomInteger(3,2);
          var operand2 = numberOfDigits==2 ? mathUtil.randomInteger(99,11) : mathUtil.randomInteger(999,101);
          
          
          callback("" + operand1 + " " + multiplicationSign + " " + operand2 + " =" + box);
        }
      }
    ).register(
      {
        class : "keySkills",
        description:"Division of whole numbers using Bus Stop",
        generateQuestion: function(callback){
          var divisor = mathUtil.randomInteger(9,2);
          var answer  = mathUtil.randomInteger(99,11);
          var numerator = divisor * answer;
          callback("" + numerator + " " + divisionSign + " " + divisor + " =" + box);
        }
      }
    )
    .register(
      {
        class : "keySkills",
        description:"Add whole numbers",
        generateQuestion: function(callback){
          var variation = mathUtil.randomInteger(2,1);
          var operand2  = mathUtil.randomInteger(9999,20);
          var operand1;
          if(variation==1){
            operand1=mathUtil.randomInteger(999,20);
          }else{
            operand1=mathUtil.randomInteger(9999,20);
          }
          callback("" + operand1 + " + " + operand2);
        }
      }
    )
    .register(
      {
        class : "keySkills",
        description:"Subtract whole numbers",
        generateQuestion: function(callback){
          var variation = mathUtil.randomInteger(2,1);
          var operand1,operand2,answer;
          
          if(variation==1){
            answer=mathUtil.randomInteger(999,20);
            operand2=mathUtil.randomInteger(999,answer);
            
          }else{
            answer=mathUtil.randomInteger(9999,20);
            operand2=mathUtil.randomInteger(9999,answer);
          }
          operand1=answer+operand2;
          
          callback("" + operand1 + " - " + operand2);
        }
      }
    )
    ;
    
    var divisionSign = "\u00F7";
    var multiplicationSign = "\u00D7"
    var box= "\u2610";

    
  });  
})();