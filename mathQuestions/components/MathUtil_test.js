'use strict';

describe('GreatMath.math-util module', function() {
  beforeEach(module('GreatMath.math-util'));
  
  var mathUtil;
  
  beforeEach(inject(function( _mathUtil_) {
    
    mathUtil=_mathUtil_;
  }));    

  
  describe('floor',function(){
    
    it('rounds to zero decimal places',function(){
      var input=5.1;
      var expected=5;
      var precision=0;
      expect(mathUtil.floor(input,precision)).toEqual(expected);
      
    });
    
    it('precision defaults to zero',function(){
      var input=5.1;
      var expected=5;
      expect(mathUtil.floor(input)).toEqual(expected);
      
    });
    
    it('rounds to 1 decimal place',function(){
      var input=7.11;
      var expected=7.1;
      var precision=1;
      expect(mathUtil.floor(input,precision)).toEqual(expected);
      
    });
    
    it('rounds to 10 decimal place',function(){
      var input    = 10.99999999999;
      var expected = 10.9999999999;
      var precision=10;
      expect(mathUtil.floor(input,precision)).toEqual(expected);
      
    });
    
    it('throws an error if negative precision is given',function(){
      try{
        mathUtil.floor(11.1,-1);
        var gotHere=true;
        expect(gotHere).toBeFalse();
      }catch(err){
        expect(err.reason).toBeDefined();
        expect(err.reason).toEqual(mathUtil.INVALID_PRECISION);
      }
      
    });
    
  });
    
  describe('round',function(){
     
    it('is happy if no-op',function(){
      var input=5;
      var expected=5;
      var precision=0;
      expect(mathUtil.round(input,precision)).toEqual(expected);
      
    });
    
    it('rounds to zero decimal places',function(){
      var input=5.1;
      var expected=5;
      var precision=0;
      expect(mathUtil.round(input,precision)).toEqual(expected);
      
    });
    
    it('precision defaults to zero',function(){
      var input=5.1;
      var expected=5;
      expect(mathUtil.round(input)).toEqual(expected);
      
    });
    
    it('rounds up for .5 or higher',function(){
       var input    = 10.5;
       var expected = 11;
       var precision = 0;
       expect(mathUtil.round(input,precision)).toEqual(expected);
       
     });
      
    it('rounds down for less than .5',function(){
       var input    = 10.499;
       var expected = 10;
       var precision = 0;
       expect(mathUtil.round(input,precision)).toEqual(expected);
       
     });
    
    it('rounds to 1 decimal place',function(){
      var input=7.11;
      var expected=7.1;
      var precision=1;
      expect(mathUtil.round(input,precision)).toEqual(expected);
      
    });
    
    it('rounds to 10 decimal place',function(){
      var input    = 10.99999999985;
      var expected = 10.9999999999;
      var precision = 10;
      expect(mathUtil.round(input,precision)).toEqual(expected);
      
    });
    
    it('throws an error if negative precision is given',function(){
      try{
        mathUtil.round(11.1,-1);
        var gotHere=true;
        expect(gotHere).toBeFalse();
      }catch(err){
        expect(err.reason).toBeDefined();
        expect(err.reason).toEqual(mathUtil.INVALID_PRECISION);
      }  
    });
    
    
    
  });  
  
  describe('random numbers',function(){
    
    describe('random integers',function(){
      it('generate all integers up to a maximum of 10',function(){
        var actualResults = [];
        while(actualResults.length<100){
          actualResults.push(mathUtil.randomInteger(10));
        }
        for(var exectedResult=1;exectedResult<=10;exectedResult++){
          expect(actualResults).toContain(exectedResult);        
        }      
        expect(actualResults).not.toContain(11);
        expect(actualResults).not.toContain(0);
      });
      
      it('generate all integers between a range',function(){
        var actualResults = [];
        while(actualResults.length<100){
          actualResults.push(mathUtil.randomInteger(10,5));
        }
        for(var exectedResult=5;exectedResult<=10;exectedResult++){
          expect(actualResults).toContain(exectedResult);        
        }      
        expect(actualResults).not.toContain(11);
        expect(actualResults).not.toContain(4);
      });
      
      
      it('can generate all integers up to a maximum of 100',function(){
        var actualResults = [];
        while(actualResults.length<1000){
          actualResults.push(mathUtil.randomInteger(100));
        }
        for(var exectedResult=1;exectedResult<=100;exectedResult++){
          expect(actualResults).toContain(exectedResult);        
        }      
        expect(actualResults).not.toContain(101);
        expect(actualResults).not.toContain(0);
      });
      
      it('does not generate numbers bellow the minimum',function(){
        var actualResults = [];
        while(actualResults.length<100){
          actualResults.push(mathUtil.randomInteger(10,5));
        }
        for(var exectedResult=5;exectedResult<=10;exectedResult++){
          expect(actualResults).toContain(exectedResult);        
        }      
        expect(actualResults).not.toContain(11);
        expect(actualResults).not.toContain(4);
      });
      
      it('takes an acceptance function',function(){
        var actualResults = [];
        while(actualResults.length<100){
          var result = mathUtil.randomInteger(
            3,
            1,
            function(candidate){
              if(candidate==2){
                return false;              
              }else{
                return true;
              }
            }
          )
          actualResults.push(result);
        }
        expect(actualResults).not.toContain(2);        
        
      });
    
      
    });
  
    describe('random decimals',function(){
      var MAX=7;
      var MIN=5;
      var PRECISION=1;
      var actualResults = [];

      beforeEach(function(){
        while(actualResults.length<200){
          actualResults.push(mathUtil.randomDecimal(MAX,MIN,PRECISION));
        }
      });
      
      it('generates less than the max',function(){
        actualResults.forEach(function(actual){
          expect(actual<= MAX).toBeTruthy();
        });
      });
      
      it('generates less than the max',function(){
        actualResults.forEach(function(actual){
          expect(actual >= MIN).toBeTruthy();
        });
      });
      
      it('generates all decimals between max and min at the given precision',function(){
        
        var step=1/(Math.pow(10,PRECISION));
        step = mathUtil.round(step,PRECISION);
        for(var expected=MIN;expected<=MAX;expected+=step){
          expected = mathUtil.round(expected,PRECISION);
          expect(actualResults).toContain(expected);
        };
        
      });
      
      it('precision defaults to 1',function(){
        var randomDecimal = mathUtil.randomDecimal(9,1);
        var decimalString = ''+randomDecimal;
        expect(decimalString).not.toEqual('NaN');
        expect(decimalString.length).toEqual(3);
      });
      
      
      it('throws an error if precision is less than 0',function(){
        try{
          mathUtil.randomDecimal(10,1,-1);
          var gotHere=true;
          expect(gotHere).toBeFalse();
        }catch(err){
          expect(err.reason).toBeDefined();
          expect(err.reason).toEqual(mathUtil.INVALID_PRECISION);
        }
        
      });
      
      it('takes an acceptance function',function(){
        var actualResults = [];
        while(actualResults.length<100){
          var result = mathUtil.randomDecimal(
            3,
            2,
            1,
            function(candidate){
              if(candidate==2.5){
                return false;              
              }else{
                return true;
              }
            }
          )
          actualResults.push(result);
        }
        expect(actualResults).not.toContain(2.5);        
        
      });
      
    });
    
  });

  describe('random boolean',function(){
   it('both boolena valies',function(){
      var actualResults = [];
      while(actualResults.length<10){
        actualResults.push(mathUtil.randomBoolean());
      }
      expect(actualResults).toContain(true);
      expect(actualResults).toContain(false);
    });
    

  });
  
  describe('isNotInteger',function(){
    it('returns true if it is not an integer',function(){
      expect(mathUtil.isNotInteger(1.1)).toBe(true);
    });
    it('returns false if it is an integer',function(){
      expect(mathUtil.isNotInteger(1.0)).toBe(false);
    });
  });

});