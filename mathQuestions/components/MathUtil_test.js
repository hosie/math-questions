'use strict';

describe('GreatMath.math-util module', function() {
  beforeEach(module('GreatMath.math-util'));
  
  var mathUtil;
  
  beforeEach(inject(function( _mathUtil_) {
    
    mathUtil=_mathUtil_;
  }));    
  
  describe('random numbers',function(){
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
    
});