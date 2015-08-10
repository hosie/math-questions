'use strict';

//A collection of utility functions that build upon the built-in javascript Math module
angular.module('GreatMath.math-util', [])
.factory('mathUtil', function() {
  return {
    randomInteger : function(max,min,criteria){
      if (min==undefined){
        min=1;
      }
      var range=max-min+1;//inclusive
      var result;
      if(criteria==undefined){
        criteria=function(){
          return true;
        }
      }
      do{
        var randomDecimal0To1   = Math.random();
        var randomDecimal0To1   = Math.random();
        var randomDecimal0ToRange  =  range * randomDecimal0To1;
        var randomInteger0ToRangeMinus1   = Math.floor(randomDecimal0ToRange);
        //Math.random never generates exactly 1 but just in case...
        if(randomInteger0ToRangeMinus1==max){
          randomInteger0ToRangeMinus1--;      
        }
        
        var randomIntegerMinToMax = min + randomInteger0ToRangeMinus1;
        result = randomIntegerMinToMax;
        
      }while(criteria(result)==false)
      
      return result;
      
    }                
  };
});