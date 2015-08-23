'use strict';
(function(){
  angular.module('GreatMath.mental-strategy-questions', ['GreatMath.topic-registry','GreatMath.math-util'])
  .run(function(topicRegistry,mathUtil){
    topicRegistry.register(
      {
        class  : "mentalStrategies",
        description : "Number bonds to 5",
        generateQuestion: function(callback){
          generateNumberBonds(5,callback);
        }
      }
    )
      
    .register(
      {
        class : "mentalStrategies",
        description : "Number bonds to 10",
        generateQuestion: function(callback){
        generateNumberBonds(10,callback);
        }
      }
    )
    .register(
      {
        class : "mentalStrategies",
        description : "Number bonds to 20",
        generateQuestion : function(callback){
          generateNumberBonds(20,callback);
        }
      }
    )
    .register(
      {
        class : "mentalStrategies",
        description : "Number bonds to 100",
        generateQuestion: function(callback){
          generateNumberBonds(100,callback);
        }
      }
    )
    .register(
      {
        class : "mentalStrategies",
        description:"Doubling single digit",
        generateQuestion : function(callback){
          var theDigit=mathUtil.randomInteger(9);
          callback("What is double " + theDigit + "?");
        }
      }
    )
    .register(
      {
        class : "mentalStrategies",
        description:"Doubling two digit",
        generateQuestion: function(callback){
        var theDigit=mathUtil.randomInteger(99,10);
        callback("What is double " + theDigit + "?");
        }
      }
    )
    .register(
      {
        class : "mentalStrategies",
        description:"Halving single digit",
        generateQuestion : function(callback){
          var theDigit=mathUtil.randomInteger(9);
          callback("Halve " + theDigit);
        }
      }
    )
    .register(
      {
        class : "mentalStrategies",
        description:"Halving two digit",
        generateQuestion: function(callback){
          var theDigit=mathUtil.randomInteger(99,10);
          callback("Halve " + theDigit);
        }
      }
    )
    .register(
      {
        class : "mentalStrategies",
        description:"Add 10",
        generateQuestion: function(callback){
          var theDigit=mathUtil.randomInteger(99,1);
          callback("10 + " + theDigit + " = " + box);
        }
      }
    )
    .register(
      {
        class : "mentalStrategies",
        description:"Subtracting 10",
        generateQuestion: function(callback){
          var theDigit=mathUtil.randomInteger(99,11);
          callback("" + theDigit + " - 10 = " + box);
        }
      }
    )
    .register(
      {
        class : "mentalStrategies",
        description:"Adding multiples of 10",
        generateQuestion: function(callback){
          var multiplier = mathUtil.randomInteger(9);
          var operand1  = mathUtil.randomInteger(99,1);
          var multipleOfTen = 10 * multiplier;
          callback("" + operand1 + " + " + multipleOfTen + "=" + box);
        }
      }
    )
    .register(
      {
        class : "mentalStrategies",
        description:"Subtracting multiples of 10",
        generateQuestion: function(callback){
          var answer = mathUtil.randomInteger(89,1);
          var multiplier = mathUtil.randomInteger(9);
          var multipleOfTen = 10 * multiplier;
          
          var operand1  = answer + multipleOfTen;
          
          callback("" + operand1 + " - " + multipleOfTen + " =" + box);
        }
      }
    )
    .register(
      {
        class : "mentalStrategies",
        description:"How many to a multiple of 10",
        generateQuestion: function(callback){
          var multiplier = mathUtil.randomInteger(9);
          var multipleOfTen = 10 * multiplier;
          var operand2  = mathUtil.randomInteger(9);
          var operand1  = multipleOfTen - operand2;
          
          callback("" + operand1 + " + " + box + "=" + multipleOfTen);
        }
      }
    )
    .register(
      {
        class : "mentalStrategies",
        description:"Add near doubles (compensate)",
        generateQuestion: function(callback){
          var operand1    = mathUtil.randomInteger(99,11);
          var difference  = mathUtil.randomInteger(3,1);
          var upDown      = mathUtil.randomInteger(2,1);
          if(upDown==1){
            difference =  0 - difference;
          }
          var operand2 = operand1+difference;
          
          callback("" + operand1 + " + " + operand2 + " = " + box);
        }
      }
    )
    .register(
      {
        class : "mentalStrategies",
        description:"Partitioning single digit numbers",
        generateQuestion: function(callback){
          var answer   = mathUtil.randomInteger(9,4);
          var operand1 = mathUtil.randomInteger(answer-2);
          var remaining = answer - operand1;
          var operand2  = mathUtil.randomInteger(remaining-1);
          callback("" + answer + " = " + operand1 + " + " + operand2 + " + " + box);
        }
      }
    )
    .register(
      {
        class : "mentalStrategies",
        description:"Partitioning double digit numbers",
        generateQuestion: function(callback){
          var answer   = mathUtil.randomInteger(99,14);
          var operand1 = mathUtil.randomInteger(answer-2);
          var remaining = answer - operand1;
          var operand2  = mathUtil.randomInteger(remaining-1);
          callback("" + answer + " = " + operand1 + " + " + operand2 + " + " + box);
        }
      }
    )
    .register(
      {
        class : "mentalStrategies",
        description:"Add using number bonds to bridge a multiple of 10 and compensate",
        generateQuestion: function(callback){
          var operand1             = 
            mathUtil.randomInteger(89,1,function(candidate){
              if(candidate%10==0){
                return false;
              }
              return true;
            }
          );
          
          var remainder            = operand1 % 10;
          var previousMultipleOf10 = operand1-remainder;
          var nextMultipleOf10     = previousMultipleOf10 + 10;
          var toMultipleOf10       = nextMultipleOf10-operand1;
          var operand2             = mathUtil.randomInteger(toMultipleOf10+9,toMultipleOf10+1);
          var hint                 = mathUtil.randomBoolean();
          if(hint){
            callback(""+operand1 + " + " + operand2 + " = " + operand1 + " + " + toMultipleOf10 + " + " +  box);            
          }else{
            callback(""+operand1 + " + " + operand2 + " = " + box);            
          }
        }
      }
    )
    .register(
      {
        class : "mentalStrategies",
        description:"Subtract using number bonds to bridge a multiple of 10 and compensate",
        generateQuestion: function(callback){
          var operand1             = 
            mathUtil.randomInteger(89,11,function(candidate){
              if(candidate%10==0){
                return false;
              }
              return true;
            }
          );
          
          var remainder            = operand1 % 10;
          var previousMultipleOf10 = operand1-remainder;
          var toMultipleOf10       = operand1-previousMultipleOf10;
          var operand2             = mathUtil.randomInteger(toMultipleOf10+9,toMultipleOf10+1);
          var hint                 = mathUtil.randomBoolean();
          if(hint){
            callback(""+operand1 + " - " + operand2 + " = " + operand1 + " - " + toMultipleOf10 + " - " +  box);            
          }else{
            callback(""+operand1 + " - " + operand2 + " = " + box);            
          }
        }
      }
    )
    .register(
      {
        class : "mentalStrategies",
        description:"Count from smallest to biggest in a subtraction",
        generateQuestion: function(callback){
          var threeDigit   = mathUtil.randomBoolean();
          var operand1;
          if(threeDigit){
            operand1=mathUtil.randomInteger(999,111);
          }else{
            operand1=mathUtil.randomInteger(9999,1111);
          }
          var difference=mathUtil.randomInteger(9,2);
          var operand2=operand1-difference;
          
          callback("" + operand1 + " - " + operand2 + " = " +  box);
        }
      }
    )
    .register(
      {
        class : "mentalStrategies",
        description:"Reorder an addition to make it easier",
        generateQuestion: function(callback){
          var operand1 = mathUtil.randomInteger(9,1);
          var operand2 = mathUtil.randomInteger(999,111);
          
          callback("" + operand1 + " + " + operand2 + " = " +  box);
        }
      }
    )
    .register(
      {
        class            : "mentalStrategies",
        description      : "Understand multiplication as repeated addition",
        generateQuestion : function(callback){
          var operand1 = mathUtil.randomInteger(9,2);
          var operand2 = mathUtil.randomInteger(5,2);
          var lhs = "";
          for (var i=1;i<operand2;i++){
            lhs = lhs + operand1 + " + "
          }
          lhs = lhs + operand1;
          var rhs = box + " " + multiplicationSign + " " + operand1;
          var flip=mathUtil.randomBoolean();
          if(flip){
            callback(lhs + " = " + rhs);
          }else{
            callback(rhs + " = " + lhs);
          }
          
        }
      }
    )
    .register(
      {
        class            : "mentalStrategies",
        description      : "Understand division as the inverse of multiplication (using times tables)",
        generateQuestion : function(callback){
          var operand1 = mathUtil.randomInteger(9,1);
          var operand2 = mathUtil.randomInteger(
            9,
            1,
            function (candidate){
              if(candidate==operand1){
                return false;
              }else{
                return true;
              }            
            }
          );
          var answer = operand1 * operand2;
          callback("" + operand1 + " " + multiplicationSign + " " + operand2 + " = " + answer + ", so " + answer + " " + divisionSign + " " + (mathUtil.randomBoolean() ? operand1 : operand2 )+ " = " + box);
        }
      }
    )
    .register(
      {
        class:"mentalStrategies",
        description:"Equivalent calculations to make an addition easier",
        generateQuestion:function(callback){
          var operand1 = mathUtil.randomInteger(99,11,function(candidate){return candidate%10==0?false:true;});
          var operand2 = mathUtil.randomInteger(99,11,function(candidate){return candidate%10==0?false:true;});
          var pieces = [10 * Math.floor(operand1/10),10 * Math.floor(operand1%10),Math.floor(operand2/10),Math.floor(operand2%10)];
          pieces=pieces.sort(function(a, b){return b-a});
          callback("" + operand1 + " + " + operand2 + " =  " + pieces[0] + " + " + pieces[1] + " + " + pieces[2] + " + " + pieces[3] + " = " + box);          
        }        
      }
    )
    .register(
      {
        class:"mentalStrategies",
        description:"Tell the time 12 hour clock",
        generateQuestion:function(callback){
          
          var hours = mathUtil.randomInteger(12);
          var minutes = 5 * mathUtil.randomInteger(11,0);

          function minuteX(minute){
            var radians = 2*Math.PI * (minute/60);
            return Math.sin(radians );
          }

          function minuteY(minute){
            var radians = 2*Math.PI * (minute/60);
            return Math.cos(radians + Math.PI);
          }

          function hourHandX(hour,minute){
            var radians = 2 * Math.PI * ( (hour +(minute/60))/12);
            return Math.sin(radians );
          }

          function hourHandY(hour,minute){
            var radians = 2 * Math.PI * ( (hour +(minute/60))/12);
            return Math.cos(radians + Math.PI);
          }

          var svg = '<svg id="canvas" width="215" height="215"><defs><marker style="overflow:visible" id="Arrow" refX="0" refY="0" orient="auto">  <path d="M -3,-2 L 0,0 L -3,2 " style="stroke-width:0.625;stroke-linejoin:round;stroke:blue;stroke-opacity:1;fill:none;" orient="auto" id="path4942"></path></marker></defs><g class="clock" transform="translate(110,110)"><circle r="100" cx="0" cy="0"></circle><g class="hour"><line class="hour-tick" x1="0" x2="0" y1="-100" y2="-90"></line><g transform="translate(-5,5)"><text class="hour-label" x="0" y="-80">12</text></g></g><g class="hour"><line class="hour-tick" x1="49.99999999999999" x2="44.99999999999999" y1="-86.60254037844388" y2="-77.9422863405995"></line><g transform="translate(-5,5)"><text class="hour-label" x="39.99999999999999" y="-69.28203230275511">1</text></g></g><g class="hour"><line class="hour-tick" x1="86.60254037844386" x2="77.94228634059948" y1="-50.00000000000004" y2="-45.00000000000004"></line><g transform="translate(-5,5)"><text class="hour-label" x="69.28203230275508" y="-40.000000000000036">2</text></g></g><g class="hour"><line class="hour-tick" x1="100" x2="90" y1="-1.8369701987210297e-14" y2="-1.6532731788489267e-14"></line><g transform="translate(-5,5)"><text class="hour-label" x="80" y="-1.4695761589768237e-14">3</text></g></g><g class="hour"><line class="hour-tick" x1="86.60254037844388" x2="77.94228634059948" y1="49.999999999999936" y2="44.99999999999994"></line><g transform="translate(-5,5)"><text class="hour-label" x="69.2820323027551" y="39.99999999999994">4</text></g></g><g class="hour"><line class="hour-tick" x1="49.99999999999999" x2="44.99999999999999" y1="86.60254037844388" y2="77.9422863405995"></line><g transform="translate(-5,5)"><text class="hour-label" x="39.99999999999999" y="69.28203230275511">5</text></g></g><g class="hour"><line class="hour-tick" x1="1.2246467991473532e-14" x2="1.1021821192326179e-14" y1="100" y2="90"></line><g transform="translate(-5,5)"><text class="hour-label" x="9.797174393178826e-15" y="80">6</text></g></g><g class="hour"><line class="hour-tick" x1="-50.000000000000014" x2="-45.00000000000001" y1="86.60254037844386" y2="77.94228634059948"></line><g transform="translate(-5,5)"><text class="hour-label" x="-40.00000000000001" y="69.28203230275508">7</text></g></g><g class="hour"><line class="hour-tick" x1="-86.60254037844383" x2="-77.94228634059945" y1="50.00000000000006" y2="45.00000000000005"></line><g transform="translate(-5,5)"><text class="hour-label" x="-69.28203230275507" y="40.00000000000004">8</text></g></g><g class="hour"><line class="hour-tick" x1="-100" x2="-90" y1="3.061616997868383e-14" y2="2.755455298081545e-14"></line><g transform="translate(-5,5)"><text class="hour-label" x="-80" y="2.4492935982947064e-14">9</text></g></g><g class="hour"><line class="hour-tick" x1="-86.60254037844386" x2="-77.94228634059948" y1="-50.00000000000008" y2="-45.00000000000007"></line><g transform="translate(-5,5)"><text class="hour-label" x="-69.28203230275508" y="-40.000000000000064">10</text></g></g><g class="hour"><line class="hour-tick" x1="-50.00000000000004" x2="-45.00000000000004" y1="-86.60254037844388" y2="-77.9422863405995"></line><g transform="translate(-5,5)"><text class="hour-label" x="-40.000000000000036" y="-69.28203230275511">11</text></g></g>';
          
          var svg = svg + '<line class="minute-hand" x1="0" x2="'+(65*minuteX(minutes))+'" y1="0" y2="'+(65*minuteY(minutes))+'" style="marker-end: url(#Arrow);"></line>';
          var svg = svg + '<line class="hour-hand" x1="0" x2="'+(50*hourHandX(hours,minutes))+'" y1="0" y2="'+(50*hourHandY(hours,minutes))+'" style="marker-end: url(#Arrow);"></line>';
          svg = svg + '<circle class="center" cx="0" cy="0" r="5"></circle></g></svg>';
          callback(
            "What time is shown on the clock?",
            svg
          );
          
        }
        
      }
    )
    .register(
      {
        class:"mentalStrategies",
        description:"Tell the time 24 hour clock",
        generateQuestion:function(callback){
          var reverse = mathUtil.randomBoolean();
          var minutes = mathUtil.randomInteger(59,1);
          if(minutes<10){
            minutes = "0" + minutes;
          }  
          if(reverse){
            var hours   = mathUtil.randomInteger(12,1);
            callback("what is " + hours + ":" + minutes + " pm in 24 hour clock");  
          }else{
            var hours   = mathUtil.randomInteger(23,13);
            callback("what is " + hours + ":" + minutes + " in 12 hour clock");
          }          
        }        
      }
    )
    .register(
      {
        class:"mentalStrategies",
        description:"Mins to/ past a time",
        generateQuestion:function(callback){
          var bridge = mathUtil.randomBoolean();
          var questionFormat = mathUtil.randomInteger(3,1);
          var startHours   = mathUtil.randomInteger(11,1);
          var startMinutes = mathUtil.randomInteger(49,1);
          
          var endHours,endMinutes,difference;
          if(bridge){
            endHours   = startHours+1;
            endMinutes = mathUtil.randomInteger(startMinutes-1,1);
            difference = endMinutes+(60-startMinutes);
          }else{
            endHours   = startHours;
            endMinutes = mathUtil.randomInteger(59,startMinutes+11);
            difference = endMinutes - startMinutes;
          }
          
          if(startMinutes<10){
            startMinutes = "0" + startMinutes;
          }
          
          if(endMinutes<10){
            endMinutes   = "0" + endMinutes;
          }
          
          switch(questionFormat){
            case 1://2:15 pm is how many minutes after 1:05
              callback("" + endHours + ":" + endMinutes + " is how many minutes after " + startHours + ":" + startMinutes);
            break;
            case 2://from 8:13 am, how many minutes until 9:05am
              callback("from " + startHours + ":" + startMinutes + ", how many minutes until " + endHours + ":" + endMinutes);
            break;
            case 3://What time will it be 42 minutes after 5:44 pm
              callback("What time will it be " + difference + " minutes after " + startHours + ":" + startMinutes);
            break;
            case 4://What time was it 42 minutes before 5:44 pm
              callback("What time was it " + difference + " minutes before " + endHours + ":" + endMinutes);
            break;
            default:
            callback("hello");
          }          
        }        
      }
    )    
    ;
    
    var box= "\u2610";
    var multiplicationSign = "\u00D7"
    var divisionSign = "\u00F7";
    function generateNumberBonds(answer,callback){
      var operand1 = mathUtil.randomInteger(answer-1);
      var operand2 = answer - operand1;
      
      var missingDigit = mathUtil.randomInteger(2);
      if(missingDigit==1){
        operand1=box;
      }
      if(missingDigit==2){
        operand2=box;
      }
      var reverse = mathUtil.randomInteger(2);
      var question;
      if(reverse==1){
        question = "" + operand1 + " + " + operand2 + " = " + answer; 
      }else{
        question = answer + " = " + operand1 + " + " + operand2;
        
      }
       
      callback(question);
    }
  });  
})();