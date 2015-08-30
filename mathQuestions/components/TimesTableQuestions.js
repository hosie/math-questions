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
            generateTimestable(mathUtil.randomInteger(2,10),callback);  
          }else{
            generateTimestable(options.multiplier,callback);  
          }          
        }
      })  
    ;
  

    var box= "\u2610";
    var multiplicationSign = "\u00D7"
    var divisionSign = "\u00F7";

    function generateTimestable(multiplier,callback){
      var multiplier1 = multiplier;
      var multiplier2 = mathUtil.randomInteger(10,2);
      var missingDigit = mathUtil.randomInteger(3);
      var product       = multiplier1 * multiplier2;
      var answer;
      switch(missingDigit){
        case 1:
          answer      = multiplier1;
          multiplier1 = box;          
        break;
        case 2:
          answer      = multiplier2;
          multiplier2 = box;
        break;
        case 3:
          answer  = product;
          product = box;
        break;
      }
      
      if(mathUtil.randomBoolean()){
        callback(" "+multiplier1+" "+multiplicationSign+" "+multiplier2+" = " + product);
      }else{
        callback("" + product + " " + divisionSign + " " + multiplier1 + " = " + multiplier2);        
      }
    }
  });
})();