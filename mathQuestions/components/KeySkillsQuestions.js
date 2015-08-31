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
          if(numberOfDigits==3){
            numberOfDigits=2;
          }else{
            numberOfDigits = mathUtil.randomInteger(3,2);          
          }
          var operand2 = numberOfDigits==2 ? mathUtil.randomInteger(99,11) : mathUtil.randomInteger(999,101);
          callback("" + operand1 + " " + symbol.multiplicationSign + " " + operand2 + " = " + symbol.box);
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
          callback("" + numerator + " " + symbol.divisionSign + " " + divisor + " = " + symbol.box);
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
          var variation = mathUtil.randomInteger(8);
          var a,b,c;
          
          switch(variation){
            case 1:
            case 2:
              //a + b * c or b * c + a 
              a =  mathUtil.randomInteger(10,1);
              b = mathUtil.randomInteger(10,1);
              c = mathUtil.randomInteger(5,1);
              if(variation==1){
                callback("" + a + " + " + b + " " + symbol.multiplicationSign + " " + c);                
              }else{
                callback("" + b + " " + symbol.multiplicationSign + " " + c + " + " + a);              
              }
              break;
            case 3:
              // a - b * c  
              b = mathUtil.randomInteger(10,1);
              c = mathUtil.randomInteger(5,1);
              //a must be larger enough that the answer is greater than 0
              a =  mathUtil.randomInteger(100,b*c);
              callback("" + a + " - " + b + " " + symbol.multiplicationSign + " " + c);
              
              break;
            case 4:
              // a * b - c
              a = mathUtil.randomInteger(10,1);
              b = mathUtil.randomInteger(10,1);
              //c must be less than the product of a and b so that it can be subtracted to leave a positive number
              c =  mathUtil.randomInteger(a*b);
              callback("" + a + " " + symbol.multiplicationSign + " " + b + " - " + c );
              break;
            case 5:
            case 6:
              //a + b / c  or b / c + a
              a = mathUtil.randomInteger(10);
              //b must be a multiple of c so lets create c first
              c = mathUtil.randomInteger(5);
              b = mathUtil.randomInteger(5) * c;
              if(variation==5){
                callback("" + a + " + " + b + " " + symbol.divisionSign + " " + c);  
              }else{
                callback("" + b + " " + symbol.divisionSign + " " + c + " + " + a);  
              }
              break;
            case 7:
              //a - b / c
              //a must be higher than b/c so lets create those first
              //b must be a multiple of c
              c = mathUtil.randomInteger(5);
              b = mathUtil.randomInteger(5) * c;
              a =  mathUtil.randomInteger(b*c,100);
                            
              callback("" + a + " - " + b + " " + symbol.divisionSign + " " + c);
              break;  
            case 8:
              // a / b - c
              b = mathUtil.randomInteger(5);
              a = mathUtil.randomInteger(5) * b;
              //c must be less than a/b
              c = mathUtil.randomInteger(a/b);
              callback("" + a + " " + symbol.divisionSign + " " + b + " - " + c);              
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
              callback("(" + operand1 + " + " + operand2 + ") " + symbol.multiplicationSign + " " + operand3);
              break;
            case 2:
              operand2 = mathUtil.randomInteger(9,1);
              operand3 = mathUtil.randomInteger(5,1);
              operand1 =  mathUtil.randomInteger(10,operand2);
              
              callback("" + operand1 + " - " + operand2 + " " + symbol.multiplicationSign + " " + operand3);
              break;
            case 3:
              operand1 = mathUtil.randomInteger(5,1);              
              operand3 = mathUtil.randomInteger(10,5);
              var answer =mathUtil.randomInteger(10,5); 
              operand2 = (answer * operand3) - operand1;
                            
              callback("(" + operand1 + " + " + operand2 + ") " + symbol.divisionSign + " " + operand3);
              break;  
            case 4:
              operand3 = mathUtil.randomInteger(10,5);
              operand2 = mathUtil.randomInteger(5,1);
              var answer = mathUtil.randomInteger(10,1);
              operand1 =  ( answer * operand3 ) + operand2;
                            
              callback("(" + operand1 + " - " + operand2 + ") " + symbol.divisionSign + " " + operand3);
              break;
            case 5:
              operand1 = mathUtil.randomInteger(5,1);
              operand2 = mathUtil.randomInteger(5,1);
              operand3 = mathUtil.randomInteger(5,1);
              var answer = ((operand1 * operand1) + operand2) * operand3;
              callback("" + operand1 + symbol.squared + " + " + operand2 + " " + symbol.multiplicationSign + " " + operand3);
              break;
            case 6:
              operand1 = mathUtil.randomInteger(10,1);
              operand2 = mathUtil.randomInteger(operand1,1);
              operand3 = mathUtil.randomInteger(5,1);
              var operand4 = mathUtil.randomInteger(5,1);
              var answer = ((operand1-operand2) * (operand1-operand2)) + (operand3 * operand4);
              callback("(" + operand1 + " - " + operand2 + ")" + symbol.squared + " + " + operand3 + " " + symbol.multiplicationSign + " " + operand4);
              break;
            case 7:
              var squareRootOperand1 = mathUtil.randomInteger(10,1);
              operand1 = squareRootOperand1 * squareRootOperand1 ;
              operand3 = mathUtil.randomInteger(5,1);
              operand2 = operand3 * squareRootOperand1;
              var answer = Math.sqrt(operand1) + (operand2/operand3);
              callback(symbol.squareRoot+operand1 + " + " +  operand2 + " " + symbol.divisionSign + " " + operand3);
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
            callback(''+operand2+' '+symbol.multiplicationSign+' '+operand1);
          }else{
            callback(''+operand1+' '+symbol.multiplicationSign+' '+operand2);
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
          callback(''+operand1+' '+symbol.divisionSign+' '+operand2);
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
            callback("Write " + number + " in words. Use the opposite page for your answer.");
          }
          
        }  
      }
    )
    .register(
      {
        class : "keySkills",
        description:"Convert FDP",
        generateQuestion: function(callback){
          var choice = mathUtil.randomInteger(10);
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
            callback("" + operand1 + " " + symbol.multiplicationSign + " " + operand2);  
          }else{
            callback("" + operand2 + " " + symbol.multiplicationSign + " " + operand1);
          }
          
        }  
      }
    )
    .register(
      {
        class : "keySkills",
        description:"Div by 10, 100 and 1000",
        generateQuestion: function(callback){
          var powerOfTen = mathUtil.randomInteger(3);
          
          var operand2   = Math.pow(10,powerOfTen);
          var choice     = mathUtil.randomInteger(5);
          var precision  = mathUtil.randomInteger(3);
          var operand1;
          switch(choice){
            case 1:
            operand1= mathUtil.randomDecimal(1,0,precision);
            break;
            case 2:
            operand1= mathUtil.randomDecimal(10,1,precision);
            break;
            case 3:
            operand1= mathUtil.randomDecimal(100,10,precision);
            break;
            case 4:
            operand1= mathUtil.randomDecimal(1000,100,precision);
            break;
            case 5:
            operand1= mathUtil.randomDecimal(10000,1000,precision);
            break;
          }
          
          callback("" + operand1 + " " + symbol.divisionSign + " " + operand2);  
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
          var operand2;
          var choice = mathUtil.randomInteger(2);
          switch(choice){
            case 1:
              operand2 = mathUtil.randomDecimal(10,1,2);
              operand1 = mathUtil.randomInteger(99,11);              
              break;
            case 2:
              operand2 = mathUtil.randomDecimal(99,1,2);
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
          callback("" + operand1Text + " "+ symbol.multiplicationSign+ " " + operand2Text);
          
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
          callback("" + operand1Text + " "+ symbol.divisionSign+ " " + operand2Text);
          
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
          var question = "Round " + number + " to " + dps + " decimal place";
          if(dps>1){
            question=question+"s";
          }
          callback(question);
          
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
          var question = "If a = " + a + " b = " + b + " and c = " + c + ", what is the value of ";
          var variation = 6;//mathUtil.randomInteger(7);
          switch(variation){
            case 1:
              //xa + yb + zc
              question += x + "a " + " + " + y + "b " + " + " + z + "c"            
              break;
            case 2:
              // (xa+b)^2
              question += "(" + x + "a + b)"+symbol.squared;
              break;
            case 3:
              // xa - b^2
              question += x + "a - b" + symbol.squared;
              break;
            case 4:
              // yb^2
              question += y + "b" + symbol.squared;
              break;
            case 5:
              // xab - zc
              question += x + "ab - " + z + "c";
              break;
            case 6:
              // xbc/a  where x=a/x
              question += a +"bc" + symbol.divisionSign + "a";
              break;
            case 7:
              // yb^3
              question += y +"b" + symbol.cubed;
              break;
          
          }          
          question +="?";
          callback(question);
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
    .register(
      {
        class : "keySkills",
        description:"Subtract negative numbers",
        generateQuestion: function(callback){
          var operand1 = mathUtil.randomInteger(10);
          var operand2 = mathUtil.randomInteger(10);
          if(mathUtil.randomBoolean()){
            callback("" + operand1 + " - (-" + operand2 + ")");
          }else{
            callback("(-" + operand1 + ") - (-" + operand2 + ")");            
          }
        }
      }
    )
    .register(
      {
        class : "keySkills",
        description:"Round to sf",
        generateQuestion: function(callback){
          var significantFigures = mathUtil.randomInteger(3);
          var number;
          var choice = mathUtil.randomInteger(8);
          switch(choice){
            case 1:
              number = mathUtil.randomDecimal(10,1,4);
              break;
            case 2:
              number = mathUtil.randomDecimal(100,11,4);
              break;
            case 3:
              number = mathUtil.randomDecimal(1,0,4);
              break;
            case 4:
              number = mathUtil.randomDecimal(0.01,0,6);
              break;
            case 5:
              number = mathUtil.randomInteger(10,1);
              break;
            case 6:
              number = mathUtil.randomInteger(100,10);
              break;
            case 7:
              number = mathUtil.randomInteger(1000,100);
              break;
            case 8:
              number = mathUtil.randomInteger(10000,1000);
              break;              

          }
          callback("Round " + number + " to " + significantFigures + " s.f.");
        }
      }
    )
    .register(
      {
        class : "keySkills",
        description : "Read a number off a numberline",
        generateQuestion : function(callback){
          var numberLinesData=[
            {
              min:0,
              max:10,
              increments:5
            },
            {
              min:0,
              max:30,
              increments:10
            },
            {
              min:0,
              max:20,
              increments:8
            },
            {
              min:25,
              max:75,
              increments:5
            }
          ];
          function xPos(tickPosition,numberLine){
            return 10 + (tickPosition * 150/numberLine.increments);
          }
          var choice          = mathUtil.randomInteger(0,3);
          var numberLine      = numberLinesData[choice];
          var position        = mathUtil.randomInteger(1,numberLine.increments-1);
          var incrementSize   = (numberLine.max-numberLine.min)/numberLine.increments;
          var answer          = numberLine.min + (position * incrementSize);
          var dotXPosition    = xPos(position,numberLine);
          var svg = '<style>.numberLine>line{  stroke:#777777;} .numberLine > text{  text-anchor:middle;} .dot{fill:#777777}</style>';
          
          svg = svg + '<svg id="canvas" width="170" height="320">';
          svg = svg + '<g class="numberLine" ><line x1="10" y1="30" x2="160" y2="30"></line><text x="10" y="60">';
          svg = svg + numberLine.min;
          svg = svg + '</text><text x="160" y="60">';
          svg = svg + numberLine.max;
          svg = svg + '</text>';
          for(var nextTick=0; nextTick<=numberLine.increments; nextTick++){
            var nextTickXPos = xPos(nextTick,numberLine);
            svg = svg + '<line class="tick" x1="' + nextTickXPos + '" x2="'+nextTickXPos+'" y1="30" y2="50"></line>';
          }
          //put in the circle
          svg = svg + '<circle class="dot" r="5" cx="' + dotXPosition + ' " cy="20"></circle>';
          svg = svg + '</g></svg>';
          callback('Value of the dot',svg);
        }
        
      }
    )
    .register(
      {
        class : "keySkills",
        description:"Factors",
        generateQuestion: function(callback){
          var choice = mathUtil.randomInteger(3);
          switch(choice){
            case 1:
              var number=mathUtil.randomInteger(40,2);
              callback("List all the factors of " + number);
              break;
            case 2:
              var number=mathUtil.randomInteger(40,2);
              var factor = mathUtil.randomInteger(Math.floor(number/2),1);
              callback("Is " + factor + " a factor of " + number +"?");
              break;
            case 3:
              var number1 = mathUtil.randomInteger(30,2);
              var number2 = mathUtil.randomInteger(30,2,function(candidate){return candidate!=number1;});
              callback("What is the highest common factor of " + number1 + " and " + number2 + "?");
              break;              
          }
        }
      }
    )
    .register(
      {
        class : "keySkills",
        description:"Multiples",
        generateQuestion: function(callback){
          var choice = mathUtil.randomInteger(3);
          switch(choice){
            case 1:
              var number=mathUtil.randomInteger(15,2);
              callback("List the first 4 multiples of " + number);
              break;
            case 2:
              var number=mathUtil.randomInteger(10,2);
              var multiple = mathUtil.randomInteger(50,number);
              callback("Is " + multiple + " a multiple of " + number +"?");
              break;
            case 3:
              var number1 = mathUtil.randomInteger(7,2);
              var number2 = mathUtil.randomInteger(8,number1+1 );
              callback("What is the lowest common multiple of " + number1 + " and " + number2 + "?");
              break;              
          }
        }
      }
    )
    .register(
      {
        class : "keySkills",
        description : "Coordinates",
        generateQuestion : function(callback){
          var x = mathUtil.randomInteger(-2,2);
          var y = mathUtil.randomInteger(-2,2);
          callback("What is the letter at (" + x + "," + y + ")?",
          '<svg id="canvas"><defs><marker style="overflow:visible" id="Arrow" refX="0" refY="0" orient="auto"><path d="M -3,-3 L 0,0 L -3,3 " style="stroke-width:0.625;stroke-linejoin:round;stroke:#000000;stroke-opacity:1;fill:none;" orient="auto" id="path4942"></path></marker></defs><path d="M45,110L45,15" class="axis" style="marker-end: url(#Arrow);"></path><path d="M5,70L100,70" class="axis" style="marker-end: url(#Arrow);"></path><path d="M5,30L5,110" class="line"></path><path d="M5,30L85,30" class="line"></path><path d="M25,30L25,110" class="line"></path><path d="M5,50L85,50" class="line"></path><path d="M45,30L45,110" class="line"></path><path d="M5,70L85,70" class="line"></path><path d="M65,30L65,110" class="line"></path><path d="M5,90L85,90" class="line"></path><path d="M85,30L85,110" class="line"></path><path d="M5,110L85,110" class="line"></path><g class="letter"><text x="5" y="35">A</text></g><g class="letter"><text x="25" y="35">B</text></g><g class="letter"><text x="45" y="35">C</text></g><g class="letter"><text x="65" y="35">D</text></g><g class="letter"><text x="85" y="35">E</text></g><g class="letter"><text x="5" y="55">F</text></g><g class="letter"><text x="25" y="55">G</text></g><g class="letter"><text x="45" y="55">H</text></g><g class="letter"><text x="65" y="55">I</text></g><g class="letter"><text x="85" y="55">J</text></g><g class="letter"><text x="5" y="75">K</text></g><g class="letter"><text x="25" y="75">L</text></g><g class="letter"><text x="45" y="75">M</text></g><g class="letter"><text x="65" y="75">N</text></g><g class="letter"><text x="85" y="75">P</text></g><g class="letter"><text x="5" y="95">Q</text></g><g class="letter"><text x="25" y="95">R</text></g><g class="letter"><text x="45" y="95">S</text></g><g class="letter"><text x="65" y="95">T</text></g><g class="letter"><text x="85" y="95">U</text></g><g class="letter"><text x="5" y="115">V</text></g><g class="letter"><text x="25" y="115">W</text></g><g class="letter"><text x="45" y="115">X</text></g><g class="letter"><text x="65" y="115">Y</text></g><g class="letter"><text x="85" y="115">Z</text></g><text class="label" y="72.5" x="102.5">x</text><text class="label" x="45" y="12.5">y</text></svg>'
          );
        }
        
      }
    )
    .register(
      {
        class : "keySkills",
        description : "Squares and roots",
        generateQuestion : function(callback){
          var squareRoot=mathUtil.randomInteger(15);
          var squared = squareRoot * squareRoot;
          var choice = mathUtil.randomInteger(5);
          switch (choice){
            case 1:
              callback("What is the value of " + squareRoot + " squared?");
              break;
            case 2:
              callback("What is the positive square root of " + squared + "?")
              break;
            case 3:
              callback("What is the value of (-" + squareRoot + ") squared?");
              break;
            case 4:
              callback("What is the value of "+squareRoot+symbol.squared+"?");
              break;
            case 5:
              callback("What is the positive value of "+symbol.squareRoot+squared+"?");
              break;
          }            
        }        
      }
    )
    .register(
      {
        class : "keySkills",
        description : "Cubes and roots",
        generateQuestion : function(callback){
          var cubedRoot=mathUtil.randomInteger(6);
          if(cubedRoot==6){
            cubedRoot=10;
          }
          var cubed = cubedRoot * cubedRoot * cubedRoot;
          var choice = mathUtil.randomInteger(5);
          switch (choice){
            case 1:
              callback("What is the value of " + cubedRoot + " cubed?");
              break;
            case 2:
              callback("What is the cube root of " + cubed + "?")
              break;
            case 3:
              callback("What is the value of (-" + cubedRoot + ") cubed?");
              break;
            case 4:
              callback("What is the value of "+cubedRoot+symbol.cubed+"?");
              break;
            case 5:
              callback("What is the value of "+symbol.cubedRoot+cubed+"?");
              break;
          }            
        }        
      }
    )    
    .register(
      {
        class : "keySkills",
        description : "Equivalent fractions",
        generateQuestion : function(callback){
          var numerator=mathUtil.randomInteger(10);
          var denominator=mathUtil.randomInteger(10,1,function(x){return x!=numerator;});
          var multiplier = mathUtil.randomInteger(10,2);
          if(mathUtil.randomBoolean()){
            callback(""+numerator+"/"+denominator+" = "+(numerator*multiplier)+"/"+ symbol.box);
          }else{
            callback(""+numerator+"/"+denominator+" = "+symbol.box+"/"+ (denominator*multiplier));            
          }
        }        
      }
    )
    .register(
      {
        class : "keySkills",
        description : "Fraction of an amount",
        generateQuestion : function(callback){
          
          var denominator = mathUtil.randomInteger(10,2);
          var otherFactor = mathUtil.randomInteger(10);
          var amount = otherFactor * denominator;
          var numerator = mathUtil.randomInteger(1,denominator-1);
          callback("What is "+numerator+"/"+denominator+" of "+amount+"?");
        }        
      }
    )
    .register(
      {
        class : "keySkills",
        description : "Percentage of an amount",
        generateQuestion : function(callback){
          
          var amount = 10 * mathUtil.randomInteger(40);
          var percent = 5 * mathUtil.randomInteger(30);
          callback("What is "+percent+"% of £"+amount+"?");
        }        
      }
    )
    ;
    function fdpTenths(callback){
      var numerator = mathUtil.randomInteger(10,1);
      callback("" + numerator + "/10 = " + symbol.box + " %");
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
      callback(simpleFractions[choice] + " = " + symbol.box + " %");
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
      callback("" + numerator + "/100 = " + symbol.box + " %");
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
      callback("" + decimal + " = " + symbol.box + "%");
    }
    function fdpPercentAsDecimal(callback){
      var precision=mathUtil.randomInteger(0,1);
      var percent = mathUtil.randomDecimal(200,0,precision)
            
      callback("" + percent + "% as a decimal number");
    }
  
    
    //from http://www.fileformat.info/info/unicode/char/b2/index.htm
    var symbol={
      divisionSign : "\u00F7",
      multiplicationSign : "\u00D7",
      box : "\u2610",
      squared : "\u00B2",
      squareRoot: "\u221A",
      cubed :  "\u00B3",
      cubedRoot : "\u221B"
    }
    
  });  
})();