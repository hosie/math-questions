'use strict';

//A collection of utility functions that build upon the built-in javascript Math module
angular.module('GreatMath.math-util', [])
.factory('mathUtil', function() {
  var INVALID_PRECISION = 'INVALID_PRECISION';
  function digitAt(number,index){
      
    //get rid of all digits to the right
    var digit = number/(Math.pow(10,index));
    digit = Math.floor(digit);
    //get rid of all digits to the left
    digit = digit % 10;
    return digit;
  }
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
    randomDecimal : function(max,min,aPrecision,aAcceptance){
      var acceptance = aAcceptance || function(){return true;};
      
      var precision=aPrecision || 1;
      if(precision<0){
        throw {
          reason:INVALID_PRECISION
        }
      }      
      var multiplier = Math.pow(10,precision); 
      var result;
      do{
        var randomInt  = this.randomInteger(max*multiplier,min*multiplier);
        result = randomInt/multiplier;
        
      }while(acceptance(result)==false)
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
    },
    isNotInteger : function(number){
      if(number==Math.round(number)){
        return false;
      }
      return true;
    },
    spellNumber : function(number){
      var units = ['','One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Eleven','Twelve','Thirteen','Fourteen','Fifteen','Sixteen','Seventeen','Eighteen','Nineteen'];
      var tens  = ['','Ten','Twenty','Thirty','Forty','Fifty','Sixty','Seventy','Eighty','Ninety'];
      function getName(digit, oom){
        switch(oom){
          case 0:
          case 3:
          case 6:          
            return units[digit];
            break;
          case 1:
          case 4:
          case 7:
            return tens[digit];  
            break;
          case 2:
          case 5:
            return units[digit] + ' Hundred';            
            break;
        }            
      }
      var spelling='';
      //order of magnitude is 
      //     1=>0
      //     10=>1
      //100,000=>5
      for(var orderOfMagnitude=7;orderOfMagnitude>=0;orderOfMagnitude--){
        var multiplier=digitAt(number,orderOfMagnitude);
        if (0==multiplier){
          continue;
        }
        if (((orderOfMagnitude%3)==1) && multiplier<2){
          //we are in the 'teens          
          orderOfMagnitude--;
          multiplier=multiplier*10 + digitAt(number,orderOfMagnitude);;
        }
        
        spelling=spelling+getName(multiplier,orderOfMagnitude);
        
        var commaNeeded=false;
        var spaceNeeded=false;
        var andNeeded=false;        
        var largeNumberNameNeeded=false;
        //do we need an 'and' at this point?
        if(orderOfMagnitude%3==2){
          //hundreds
          if (digitAt(number,orderOfMagnitude-1)>0 || digitAt(number,orderOfMagnitude-2)>0){
            //have tens and units
            andNeeded=true;
          }
        }
        if((orderOfMagnitude>0)&&(orderOfMagnitude%3==0)){
          //thousands ( or other large named number)
          
          largeNumberNameNeeded=true;
        }else if(orderOfMagnitude>1 && (orderOfMagnitude%3==1)){
          //tens of thousands ( or other large named number)
          if(digitAt(number,orderOfMagnitude-1)==0){
            largeNumberNameNeeded=true;
          }
          
        }else if(orderOfMagnitude>2 && (orderOfMagnitude%3==2)){
          //tens of thousands ( or other large named number)
          if(digitAt(number,orderOfMagnitude-1)==0 && digitAt(number,orderOfMagnitude-2)==0){
            largeNumberNameNeeded=true;  
          }
          
        }
        for(var i=orderOfMagnitude-1;i>=0;i--){
          if(digitAt(number,i)>0){
            spaceNeeded=true;
          }
        }
        if(largeNumberNameNeeded){
          
        
          //commas are needed unless the only remaining non zero digits are in the tens or units
          for(var i=orderOfMagnitude-1;i>=2;i--){
            if(digitAt(number,i)>0){
              commaNeeded=true;
            }
          }
          if(!commaNeeded){
           if((digitAt(number,0)>0) || (digitAt(number,1)>0)){
             andNeeded=true;
           }             
          }
        }
        
        var largeNumberNames=['Thousand','Million']
        if(largeNumberNameNeeded){
          spelling=spelling + ' ' + largeNumberNames[Math.floor(orderOfMagnitude/3)-1];            
        }
        if(commaNeeded){
          spelling=spelling + ',';            
        }
        if(andNeeded){
          spelling=spelling + ' and';            
        }
        if(spaceNeeded){
          spelling=spelling + ' ';
        }
        
      }
      return spelling;
    },    
    digitAt : digitAt
    
  };
});