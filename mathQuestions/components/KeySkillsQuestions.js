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
   .register(
      {
        class : "keySkills",
        description:"BIDMAS easy",
        generateQuestion: function(callback){
          var variation = mathUtil.randomInteger(4,1);
          var operand1,operand2,operand3; 
          switch(variation){
            case 1:
              operand1 =  mathUtil.randomInteger(10,1);
              operand2 = mathUtil.randomInteger(10,1);
              operand3 = mathUtil.randomInteger(5,1);
              callback("" + operand1 + " + " + operand2 + " " + multiplicationSign + " " + operand3);
              break;
            case 2:
              operand2 = mathUtil.randomInteger(10,1);
              operand3 = mathUtil.randomInteger(5,1);
              operand1 =  mathUtil.randomInteger(100,operand2*operand3);
              
              callback("" + operand1 + " - " + operand2 + " " + multiplicationSign + " " + operand3);
              break;
            case 3:
              operand1 = mathUtil.randomInteger(10,1);              
              operand3 = mathUtil.randomInteger(5,1);
              operand2 = mathUtil.randomInteger(5,1) * operand3;
                            
              callback("" + operand1 + " + " + operand2 + " " + divisionSign + " " + operand3);
              break;  
            case 4:
              operand3 = mathUtil.randomInteger(5,1);
              operand2 = mathUtil.randomInteger(5,1) * operand3;
              operand1 =  mathUtil.randomInteger(100,operand2*operand3);
                            
              callback("" + operand1 + " - " + operand2 + " " + divisionSign + " " + operand3);
              break;  
            
          }           
        }
      }
    )
    .register(
      {
        class : "keySkills",
        description:"BIDMAS harder",
        generateQuestion: function(callback){
          var variation = mathUtil.randomInteger(7,1);
          var operand1,operand2,operand3; 
          switch(variation){
            case 1:
              operand1 =  mathUtil.randomInteger(10,1);
              operand2 = mathUtil.randomInteger(10,1);
              operand3 = mathUtil.randomInteger(5,1);
              callback("(" + operand1 + " + " + operand2 + ") " + multiplicationSign + " " + operand3);
              break;
            case 2:
              operand2 = mathUtil.randomInteger(9,1);
              operand3 = mathUtil.randomInteger(5,1);
              operand1 =  mathUtil.randomInteger(10,operand2);
              
              callback("" + operand1 + " - " + operand2 + " " + multiplicationSign + " " + operand3);
              break;
            case 3:
              operand1 = mathUtil.randomInteger(5,1);              
              operand3 = mathUtil.randomInteger(10,5);
              var answer =mathUtil.randomInteger(10,5); 
              operand2 = (answer * operand3) - operand1;
                            
              callback("(" + operand1 + " + " + operand2 + ") " + divisionSign + " " + operand3);
              break;  
            case 4:
              operand3 = mathUtil.randomInteger(10,5);
              operand2 = mathUtil.randomInteger(5,1);
              var answer = mathUtil.randomInteger(10,1);
              operand1 =  ( answer * operand3 ) + operand2;
                            
              callback("(" + operand1 + " - " + operand2 + ") " + divisionSign + " " + operand3);
              break;
            case 5:
              operand1 = mathUtil.randomInteger(5,1);
              operand2 = mathUtil.randomInteger(5,1);
              operand3 = mathUtil.randomInteger(5,1);
              var answer = ((operand1 * operand1) + operand2) * operand3;
              callback("" + operand1 + squared + " + " + operand2 + " " + multiplicationSign + " " + operand3 + " = " + answer);
              break;
            case 6:
              operand1 = mathUtil.randomInteger(10,1);
              operand2 = mathUtil.randomInteger(operand1,1);
              operand3 = mathUtil.randomInteger(5,1);
              var operand4 = mathUtil.randomInteger(5,1);
              var answer = ((operand1-operand2) * (operand1-operand2)) + (operand3 * operand4);
              callback("(" + operand1 + " - " + operand2 + ")" + squared + " + " + operand3 + " " + multiplicationSign + " " + operand4);
              break;
            case 7:
              var squareRootOperand1 = mathUtil.randomInteger(10,1);
              operand1 = squareRootOperand1 * squareRootOperand1 ;
              operand3 = mathUtil.randomInteger(5,1);
              operand2 = operand3 * squareRootOperand1;
              var answer = Math.sqrt(operand1) + (operand2/operand3);
              callback(squareRoot+operand1 + " + " +  operand2 + " " + divisionSign + " " + operand3 + " = " + answer);
          }           
        }
      }
    )
    .register(
      {
        class : "keySkills",
        description:"Multiply decimals",
        generateQuestion: function(callback){
          var numberOfDecimalPlaces = mathUtil.randomInteger(2,1);
          var multiply2Decimals     = mathUtil.randomBoolean();
          var reverse               = mathUtil.randomBoolean();
          var operand1;
          var operand2 = mathUtil.randomDecimal(
            10,
            1,
            numberOfDecimalPlaces,
            mathUtil.isNotInteger
          );
          if(multiply2Decimals){
            operand1=mathUtil.randomDecimal(
              10,
              0,
              1,
              mathUtil.isNotInteger
            );
          }else{
            operand1=mathUtil.randomInteger(9,2);
          }
          if(reverse){
            callback(''+operand2+' '+multiplicationSign+' '+operand1);
          }else{
            callback(''+operand1+' '+multiplicationSign+' '+operand2);
          }
        }
      }
    )
    .register(
      {
        class : "keySkills",
        description:"Divide decimals",
        generateQuestion: function(callback){
          var variation = mathUtil.randomInteger(5,1);
          var answer;
          var operand2;
          var operand1;
          switch(variation){
            case 1:
              answer   = mathUtil.randomDecimal(99,1,2,mathUtil.isNotInteger);
              operand2 = mathUtil.randomInteger(10,2);
              operand1 = mathUtil.round(answer * operand2,2);
            break;
            case 2:
              answer   = mathUtil.randomDecimal(9,1,2,mathUtil.isNotInteger);
              operand2 = mathUtil.randomInteger(10,2);
              operand1 = mathUtil.round(answer * operand2,2);
              
            break;
            case 3:
              answer   = mathUtil.randomDecimal(99,1,2,mathUtil.isNotInteger);
              operand2 = 0.1;
              operand1 = mathUtil.round(answer * operand2,2);
            break;
            case 4:
              answer   = mathUtil.randomDecimal(99,1,2,mathUtil.isNotInteger);
              operand2 = 0.2;
              operand1 = mathUtil.round(answer * operand2,2);
            break;
            case 5:
              answer   = mathUtil.randomDecimal(99,1,2,mathUtil.isNotInteger);
              operand2 = 0.5;
              operand1 = mathUtil.round(answer * operand2,2);
            break;
          }
          callback(''+operand1+' '+divisionSign+' '+operand2);
        }
      }
    )
    .register(
      {
        class : "keySkills",
        description:"Place value digits of a number",
        generateQuestion: function(callback){
          var maxOrderOfMagnitude = mathUtil.randomInteger(8,5);
          var number = mathUtil.randomInteger(Math.pow(10,maxOrderOfMagnitude),100);
          var spelling = mathUtil.spellNumber(number);
          if(mathUtil.randomBoolean()){
            callback("Write " + spelling + " in digits");
          }else{
            callback("Write " + number + " in words");
          }
          
        }  
      }
    )
    .register(
      {
        class : "keySkills",
        description:"Convert FDP",
        generateQuestion: function(callback){
          var choice = mathUtil.randomInteger(11);
          switch(choice){
              case 1:
              fdpTenths(callback);
              break;
              case 2:
              fdpSimpleFractions(callback);
              break
              case 3:
              fdpHundredths(callback);
              break;
              case 4:
              fdpTenthsAsDecimal(callback);
              break;
              case 5:
              fdpTensPercentAsFraction(callback);
              break;
              case 6:
              fdpDecimalAsPercent(callback);
              break;
              case 7:
              fdpSimpleFractionsAsDecimal(callback);
              break;
              case 8:
              fdpSimpleDecimalAsFraction(callback);
              break;
              case 9:
              fdpDecimalAsPercent(callback);
              break;
              case 10:
              fdpPercentAsDecimal(callback);
              break
          }
        }  
      }
    )
    .register(
      {
        class : "keySkills",
        description:"Mult by 10, 100 and 1000",
        generateQuestion: function(callback){
          var powerOfTen = mathUtil.randomInteger(3,1);
          
          var operand1   = Math.pow(10,powerOfTen);
          var choice     = mathUtil.randomInteger(3,1);
          var operand2;
          switch(choice){
            case 1:
            operand2= mathUtil.randomDecimal(1,0,2);
            break;
            case 2:
            operand2= mathUtil.randomDecimal(10,1,2);
            break;
            case 3:
            operand2= mathUtil.randomDecimal(100,10,3);
            break;
            
          }
          if(mathUtil.randomBoolean()){
            callback("" + operand1 + " " + multiplicationSign + " " + operand2);  
          }else{
            callback("" + operand2 + " " + multiplicationSign + " " + operand1);
          }
          
        }  
      }
    )
    .register(
      {
        class : "keySkills",
        description:"Div by 10, 100 and 1000",
        generateQuestion: function(callback){
          var powerOfTen = mathUtil.randomInteger(3,1);
          
          var operand2   = Math.pow(10,powerOfTen);
          var choice     = mathUtil.randomInteger(3,1);
          var operand1;
          switch(choice){
            case 1:
            operand1= mathUtil.randomDecimal(1,0,2);
            break;
            case 2:
            operand1= mathUtil.randomDecimal(10,1,2);
            break;
            case 3:
            operand1= mathUtil.randomDecimal(100,10,3);
            break;
          }
          
          callback("" + operand1 + " " + divisionSign + " " + operand2);  
        }  
      }
    )
    .register(
      {
        class : "keySkills",
        description:"Add decimal numbers",
        generateQuestion: function(callback){
          var operand1; 
          var operand2; 
          var choice = mathUtil.randomInteger(3);
          switch(choice){
            case 1:
              operand1 = mathUtil.randomInteger(20,2);
              operand2 = mathUtil.randomDecimal(10,1,2);
              break;
            case 2:
              operand1 = mathUtil.randomDecimal(100,1,2);
              operand2 = mathUtil.randomDecimal(10,1,2);
              break;
            case 3:
              operand1 = mathUtil.randomDecimal(10,1,2);
              operand2 = mathUtil.randomDecimal(100,1,2);
              break;
            
          }
          
          callback("" + operand1 + " + " + operand2);
        }
      }
    )
    .register(
      {
        class : "keySkills",
        description:"Subtract decimal numbers",
        generateQuestion: function(callback){
          var operand1; 
          var operand2 = mathUtil.randomDecimal(10,1,2);
          var choice = mathUtil.randomInteger(2);
          switch(choice){
            case 1:
              operand1 = mathUtil.randomInteger(99,11);              
              break;
            case 2:
              operand1 = mathUtil.randomDecimal(100,Math.ceil(operand2),2);              
              break;
          }          
          callback("" + operand1 + " - " + operand2);
          
        }
      }
    )
    .register(
      {
        class : "keySkills",
        description:"Mult negative numbers",
        generateQuestion: function(callback){
          var operand1 = mathUtil.randomInteger(10); 
          var operand2 = mathUtil.randomInteger(10); 
          var operand1Text = "" + operand1;
          var operand2Text = "" + operand2;
          var choice = mathUtil.randomInteger(3);
          switch(choice){
            case 1:
              operand1 = -operand1;
              operand1Text = "("+operand1+")";
              break;
            case 2:
        
              operand2 = -operand2;              
              operand2Text = "("+operand2+")";
              break;
            case 3:
              operand1 = -operand1;
              operand2 = -operand2;
              operand1Text = "("+operand1+")";
              operand2Text = "("+operand2+")";

              break;
              
          }          
          callback("" + operand1Text + " "+ multiplicationSign+ " " + operand2Text);
          
        }
      }
    )
    .register(
      {
        class : "keySkills",
        description:"Divide negative numbers",
        generateQuestion: function(callback){
          var answer = mathUtil.randomInteger(10); 
          var operand2 = mathUtil.randomInteger(10); 
          var operand2Text = "" + operand2;
          var choice = mathUtil.randomInteger(3);
          switch(choice){
            case 1:
              answer = -answer;
              break;
            case 2:
              operand2 = -operand2;              
              operand2Text = "("+operand2+")";
              break;
            case 3:
              answer = -answer;
              operand2 = -operand2;
              operand2Text = "("+operand2+")";

              break;
              
          }
          var operand1=answer * operand2;
          
          var operand1Text = "" + operand1;
          if(operand1<0){
            operand1Text = "(" + operand1 + ")";            
          }          
          callback("" + operand1Text + " "+ divisionSign+ " " + operand2Text);
          
        }
      }
    )
    .register(
      {
        class : "keySkills",
        description:"Simplify fractions",
        generateQuestion: function(callback){
          var simpleDenominator = mathUtil.randomInteger(10,2);
          var simpleNumerator   = mathUtil.randomInteger(simpleDenominator-1,1);
          var multiplier        = mathUtil.randomInteger(10,2);
          var denominator       = multiplier * simpleDenominator;
          var numerator         = multiplier * simpleNumerator;
          if(mathUtil.randomBoolean()){
              callback("Simplify " + numerator + "/" + denominator);
          }else{
            callback("Write " + numerator + "/" + denominator + " in its simplest form");
          }
          
        }
      }
    )
    .register(
      {
        class : "keySkills",
        description:"Round to dp",
        generateQuestion: function(callback){
          var choice=mathUtil.randomInteger(3);
          var number;
          switch(choice){
            case 1:
            number=mathUtil.randomDecimal(1,0,4);
            break;
            case 2:
            number=mathUtil.randomDecimal(10,1,4);
            break;
            case 3:
            number=mathUtil.randomDecimal(100,10,4);
            break;
          }
          var dps=mathUtil.randomInteger(3,1);
          callback("Round " + number + " to " + dps + " decimal places");
          
        }
      }
    )
    .register(
      {
        class : "keySkills",
        description:"Substitution",
        generateQuestion: function(callback){
          var a = mathUtil.randomInteger(10);
          var b = mathUtil.randomInteger(10);
          var c = mathUtil.randomInteger(10);
          var x = mathUtil.randomInteger(10);
          var y = mathUtil.randomInteger(10);
          var z = mathUtil.randomInteger(10);
          callback("If a = " + a + " b = " + b + " and c = " + c + ", what is the value of " + x + " " + multiplicationSign + " a " + " + " + y + " " + multiplicationSign + " b " + " + " + z + " " + multiplicationSign + " c");
        }
      }
    )
    .register(
      {
        class : "keySkills",
        description:"Simple directed number",
        generateQuestion: function(callback){
          var operand1 = mathUtil.randomInteger(10);
          var operand2 = mathUtil.randomInteger(10);
          var choice = mathUtil.randomInteger(10);
          switch(choice){
            case 1:
              callback("(-"+ operand1 +")" + " + " + operand2);
              break;
            case 2:
              callback("(-"+ operand1 +")" + " - " + operand2);
              break;
            case 3:
              if(operand1==10){
                operand1=9;
              }
              operand2 = mathUtil.randomInteger(10,operand1+1);
              callback("" + operand1 + " - " + operand2);
              break;
            case 4:
              callback("Difference between -" + operand1 + " and " + operand2);
              break;
            case 5:
              callback("Difference between " + operand1 + " and -" + operand2);
              break;
            case 6:
              var operand1 = mathUtil.randomInteger(10,2);
              var operand2 = mathUtil.randomInteger(operand1-1,1);
          
              callback("Difference between -" + operand1 + " and -" + operand2);
              break;
            case 7:
              callback("Which is the lowest number, " + operand1 + " or -" + operand2 + "?");
              break;
            case 8:
              var operand1 = mathUtil.randomInteger(10,2);
              var operand2 = mathUtil.randomInteger(operand1-1,1);
              callback("Which is the lowest number, -" + operand1 + " or -" + operand2 + "?");
              break;
            case 9:
            callback("Which is the highest number, " + operand1 + " or -" + operand2 + "?");
              break;
            case 10:
              var operand1 = mathUtil.randomInteger(10,2);
              var operand2 = mathUtil.randomInteger(operand1-1,1);
              callback("Which is the highest number, -" + operand1 + " or -" + operand2 + "?");
              break;              
          }
        }
      }
    )
    .register(
      {
        class : "keySkills",
        description:"Add negative numbers",
        generateQuestion: function(callback){
          var operand1 = mathUtil.randomInteger(10);
          var operand2 = mathUtil.randomInteger(10);
          if(mathUtil.randomBoolean()){
            callback("" + operand1 + " + (-" + operand2 + ")");
          }else{
            callback("(-" + operand1 + ") + (-" + operand2 + ")");            
          }
        }
      }
    )    

    ;
    function fdpTenths(callback){
      var numerator = mathUtil.randomInteger(10,1);
      callback("" + numerator + "/10 = " + box + " %");
    }
    function fdpTenthsAsDecimal(callback){
      var numerator = mathUtil.randomInteger(10,1);
      callback("" + numerator + "/10 as a decimal number");
    }
    function fdpSimpleFractions(callback){
      var numerator = mathUtil.randomInteger(10,1);
      var simpleFractions = [
      "1/2","1/4","2/4","3/4","4/4","1/5","2/5","3/5","4/5","5/5",
      ];
      var choice = mathUtil.randomInteger(simpleFractions.length,1);
      choice=choice-1;
      callback(simpleFractions[choice] + " = " + box + " %");
    }
    function fdpSimpleFractionsAsDecimal(callback){
      var numerator = mathUtil.randomInteger(10,1);
      var simpleFractions = [
      "1/2","1/4","2/4","3/4","4/4","1/5","2/5","3/5","4/5","5/5",
      ];
      var choice = mathUtil.randomInteger(simpleFractions.length,1);
      choice=choice-1;
      callback(simpleFractions[choice] + " as a decimal number");
    }
    function fdpHundredths(callback){
      var numerator = mathUtil.randomInteger(100,1);
      callback("" + numerator + "/100 = " + box + " %");
    }
    function fdpTensPercentAsFraction(callback){
      var multiple = mathUtil.randomInteger(10,1);
      var percent = 10 * multiple;
      callback("" + percent + "% as a fraction");
    }
    function fdpSimpleDecimalAsFraction(callback){
      var simpleDecimals=[
      "0.1","0.2","0.3","0.4","0.5","0.6","0.7","0.8","0.9","0.02","0.26","0.45","0.74","0.82","0.105","0.220"
      ];
      var choice=mathUtil.randomInteger(simpleDecimals.length);
      choice--;
      callback(simpleDecimals[choice] + " as a fraction");
    }
    function fdpDecimalAsPercent(callback){
      var precision=mathUtil.randomInteger(3,2);
      var decimal = mathUtil.randomDecimal(2,0,precision)
      callback("" + decimal + " =" + box + "%");
    }
    function fdpPercentAsDecimal(callback){
      var precision=mathUtil.randomInteger(3,2);
      var decimal = mathUtil.randomDecimal(2,0,precision)
      var percent = decimal * 100;
      callback("" + percent + "% as a decimal number");
    }
  
    
    //from http://www.fileformat.info/info/unicode/char/b2/index.htm
    var divisionSign = "\u00F7";
    var multiplicationSign = "\u00D7"
    var box= "\u2610";
    var squared = "\u00B2"
    var squareRoot = "\u221A"
  });  
})();