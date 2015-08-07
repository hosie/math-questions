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
    var divisionSign = "÷";
    var multiplicationSign = "\u00D7"
    var box= "\u2610";

    
  });  
})();