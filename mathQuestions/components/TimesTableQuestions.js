'use strict';

(function(){
  angular.module('GreatMath.times-table-questions', ['GreatMath.topic-registry','GreatMath.math-util'])
  .run(function(topicRegistry,mathUtil){
    topicRegistry.register(
      {
        class : "timesTable",
        description: "Times table",
        generateQuestion : function(callback,errcallback,options){
          if((options== undefined) || (options.multiplier == undefined)){
            errcallback("Multiplier missing");
          }else{
            generateTimestable(options.multiplier,callback);  
          }          
        }
      })  
    ;
  

    var box= "\u2610";
    var multiplicationSign = "\u00D7"
    

    function generateTimestable(multiplier,callback){
      var multiplier2 = mathUtil.randomInteger(12,2);
      var missingDigit = mathUtil.randomInteger(2,1);
      var answer       = multiplier * multiplier2;
      if(missingDigit==1){
        multiplier2=box;
      }
      if(missingDigit==2){
        answer=box;
      }
      var reverse = mathUtil.randomInteger(2);
      
      var question = "" + multiplier + multiplicationSign + multiplier2 + " = " + answer; 
      
       
      callback(question);
    
    }
  });
})();