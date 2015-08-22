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
      
      it('can swap max and min arguments',function(){
        var actualResults = [];
        while(actualResults.length<100){
          actualResults.push(mathUtil.randomInteger(5,10));
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
      
      it('short range',function(){
        var actualResults = [];
        while(actualResults.length<10){
          var result = mathUtil.randomInteger(
            2,
            1
          )
          actualResults.push(result);
        }
        expect(actualResults).toContain(1);
        expect(actualResults).toContain(2);        
        
      });
      
      it('allows zero',function(){
        var actualResults = [];
        while(actualResults.length<10){
          var result = mathUtil.randomInteger(
            1,
            0
          )
          actualResults.push(result);
        }
        expect(actualResults).toContain(0);
        expect(actualResults).toContain(1);        
        
      });
    
      it('allows negative numbers',function(){
        var actualResults = [];
        while(actualResults.length<10){
          var result = mathUtil.randomInteger(
            -1,
            -2
          )
          actualResults.push(result);
        }
        expect(actualResults).toContain(-1);
        expect(actualResults).toContain(-2);
        
      });
      
      it('can bridge 0',function(){
        var actualResults = [];
        while(actualResults.length<100){
          var result = mathUtil.randomInteger(
            1,
            -1
          )
          actualResults.push(result);
        }
        expect(actualResults).toContain(-1);
        expect(actualResults).toContain(0);
        expect(actualResults).toContain(1);
        
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
        
        var randomDecimal;
        do{
          randomDecimal = mathUtil.randomDecimal(9,1);
        }while(! mathUtil.isNotInteger(randomDecimal))
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

  describe('digitAt',function(){
    it('returns digit at a given index, assuming base 10',function(){
      var number=12345678;
      expect(mathUtil.digitAt(number,0)).toEqual(8);
      expect(mathUtil.digitAt(number,1)).toEqual(7);
      expect(mathUtil.digitAt(number,2)).toEqual(6);
      expect(mathUtil.digitAt(number,3)).toEqual(5);
      expect(mathUtil.digitAt(number,4)).toEqual(4);
      expect(mathUtil.digitAt(number,5)).toEqual(3);
      expect(mathUtil.digitAt(number,6)).toEqual(2);
      expect(mathUtil.digitAt(number,7)).toEqual(1);      
    });
  });
  
  describe('spellNumber',function(){
    
    it('units',function(){
      var number=8;
      var spelling = mathUtil.spellNumber(number);
      var spellingArray = spelling.split(" ");
      expect(spellingArray[spellingArray.length-1]).toEqual("Eight");
    });
    
    it('teens',function(){
      var number=13;
      var spelling = mathUtil.spellNumber(number);
      expect(spelling).toEqual("Thirteen");
      
    });
    
    it('tens',function(){
      var number=30;
      var spelling = mathUtil.spellNumber(number);
      var spellingArray = spelling.split(" ");
      expect(spellingArray[spellingArray.length-1]).toEqual("Thirty");
    });
    
    it('tens and units',function(){
      var number=34;
      var spelling = mathUtil.spellNumber(number);
      expect(spelling).toEqual("Thirty Four");
    });
    
    it('hundreds',function(){
      var number=400;
      var spelling = mathUtil.spellNumber(number);
      expect(spelling).toEqual("Four Hundred");
    });
    
    it('hundreds and units',function(){
      var number=401;
      var spelling = mathUtil.spellNumber(number);
      expect(spelling).toEqual("Four Hundred and One");
    });
    
    it('hundreds and tens',function(){
      var number=450;
      var spelling = mathUtil.spellNumber(number);
      expect(spelling).toEqual("Four Hundred and Fifty");
    });
    
    it('hundreds and tens and units',function(){
      var number=678;
      var spelling = mathUtil.spellNumber(number);
      expect(spelling).toEqual("Six Hundred and Seventy Eight");
    });
    
    it('Thousands',function(){
      var number=5000;
      var spelling = mathUtil.spellNumber(number);
      expect(spelling).toEqual("Five Thousand");
    });
    
    it('Thousands and hundreds',function(){
      var number=5300;
      var spelling = mathUtil.spellNumber(number);
      expect(spelling).toEqual("Five Thousand, Three Hundred");
    });
    
    it('Thousands and tens',function(){
      var number=1080;
      var spelling = mathUtil.spellNumber(number);
      expect(spelling).toEqual("One Thousand and Eighty");
    });
    
    it('Thousands and units',function(){
      var number=1008;
      var spelling = mathUtil.spellNumber(number);
      expect(spelling).toEqual("One Thousand and Eight");
    });
    
    it('Thousands and hundreds and units',function(){
      var number=1808;
      var spelling = mathUtil.spellNumber(number);
      expect(spelling).toEqual("One Thousand, Eight Hundred and Eight");
    });
    
    it('Thousands and hundreds and tens',function(){
      var number=1880;
      var spelling = mathUtil.spellNumber(number);
      expect(spelling).toEqual("One Thousand, Eight Hundred and Eighty");
    });
    
    it('Thousands and hundreds and tens and units',function(){
      var number=1888;
      var spelling = mathUtil.spellNumber(number);
      expect(spelling).toEqual("One Thousand, Eight Hundred and Eighty Eight");
    });
    
    it('Tens of Thousands',function(){
      var number=50000;
      var spelling = mathUtil.spellNumber(number);
      expect(spelling).toEqual("Fifty Thousand");
    });
    
    it('Teen Thousands',function(){
      var number=18000;
      var spelling = mathUtil.spellNumber(number);
      expect(spelling).toEqual("Eighteen Thousand");
    });

    it('Tens and units of Thousands',function(){
      var number=53000;
      var spelling = mathUtil.spellNumber(number);
      expect(spelling).toEqual("Fifty Three Thousand");
    });    
    it('Hundreds of Thousands',function(){
      var number=400000;
      var spelling = mathUtil.spellNumber(number);
      expect(spelling).toEqual("Four Hundred Thousand");
    });
    
    it('handles 8 digit numbers',function(){
      var number=12345678;
      var spelling = mathUtil.spellNumber(number);
      expect(spelling).toEqual('Twelve Million, Three Hundred and Forty Five Thousand, Six Hundred and Seventy Eight');
    });
    
    it('includes and when tens is zero',function(){
      var number=12345608;
      var spelling = mathUtil.spellNumber(number);
      expect(spelling).toEqual('Twelve Million, Three Hundred and Forty Five Thousand, Six Hundred and Eight');
    });
    
    it('no and if units and tens are zero',function(){
      var number=12345600;
      var spelling = mathUtil.spellNumber(number);
      expect(spelling).toEqual('Twelve Million, Three Hundred and Forty Five Thousand, Six Hundred');
    });
    
    it('no and if units, tens and hundreds are zero',function(){
      var number=12345000;
      var spelling = mathUtil.spellNumber(number);
      expect(spelling).toEqual('Twelve Million, Three Hundred and Forty Five Thousand');
    });
    
    it('includes and when ten thousands is zero',function(){
      var number=12305678;
      var spelling = mathUtil.spellNumber(number);
      expect(spelling).toEqual('Twelve Million, Three Hundred and Five Thousand, Six Hundred and Seventy Eight');
    });
    
    it('does not include thousand if there are no thousands, ten thousands or hundred thousands',function(){
      var number=12000008;
      var spelling = mathUtil.spellNumber(number);
      var spellingArray = spelling.split(" ");
      expect(spellingArray).not.toContain('Thousand');
      expect(spellingArray).not.toContain('Thousand,');
    });
    
    it('includes and when all digits bar either extreme are zero',function(){
      var number=10000008;
      var spelling = mathUtil.spellNumber(number);
      expect(spelling).toEqual('Ten Million and Eight');
    });
    
  });
});