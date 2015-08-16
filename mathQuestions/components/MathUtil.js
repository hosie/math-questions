'use strict';

//A collection of utility functions that build upon the built-in javascript Math module
angular.module('GreatMath.math-util', [])
.factory('mathUtil', function() {
  var INVALID_PRECISION = 'INVALID_PRECISION';
  return {
    INVALID_PRECISION : INVALID_PRECISION,
    randomBoolean : function(){
      var randomInt = this.randomInteger(2,1);
      if(randomInt==1){
        return true;
      }
      return false;
    },
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
      
    },
    randomDecimal : function(max,min,aPrecision){
      var precision=aPrecision || 1;
      if(precision<0){
        throw {
          reason:INVALID_PRECISION
        }
      }
      var multiplier = Math.pow(10,precision); 
      var randomInt  = this.randomInteger(max*multiplier,min*multiplier);
      var result = randomInt/multiplier;
      return result;
    },
    floor : function(input,aPrecision){
      var precision=aPrecision || 0;
      if(precision<0){
        throw {
          reason:INVALID_PRECISION
        }
      }
      var multiplier = Math.pow(10,precision); 
      var x = input * multiplier;
      x = Math.floor(x);
      return x /multiplier;
    },
    round : function(input,aPrecision){
      var precision=aPrecision || 0;
      if(precision<0){
        throw {
          reason:INVALID_PRECISION
        }
      }
      var multiplier = Math.pow(10,precision); 
      var x = input * multiplier;
      x = Math.round(x);
      return x /multiplier;
    }     
  };
});