'use strict';
var alphabet = ['A','B','C','D','E','F'];
        
describe('Worksheet', function() {
  //values used to mock dependencies and to expect in assertions
  var numberOfSheetsPerWeek=5;
  var mockDistribution = {
    weeks: [],
    $setNumberOfWeeks:function(numberOfWeeks){
      this.weeks=[];
      var weekNumber=1;
      while(weekNumber<=numberOfWeeks){        
        var week = {
          mentalStrategies:{
            topics:[] 
          },
          timesTable:{
            questionSpecs:[] 
          },
        };
        this.weeks.push(week);
        weekNumber++;
      }
    },
    $setNumberOfTimesTableQuestions:function(numberOfQuestions){
      this.weeks.forEach(function(week){
        var questionNumber=1;
        while(questionNumber<numberOfQuestions+1){
          week.timesTable.questionSpecs.push({multiplier:1});                    
          questionNumber++;
        }
      });
    },
    $setTimesTableMultipliers:function(multiplier){
      this.weeks.forEach(function(week){
        week.timesTable.questionSpecs.forEach(function(questionSpec){
          questionSpec.multiplier=multiplier;
        });
      });      
    },
    $setNumberOfMentalStrategyQuestions:function(numberOfQuestions){
      this.weeks.forEach(function(week){
        var questionNumber=1;
        while(questionNumber<numberOfQuestions+1){
          week.mentalStrategies.topics.push({id:''+questionNumber+alphabet[questionNumber-1]});          
          questionNumber++;
        }
      });
    }
  };
  
  var mockQuestionGenerator = {
    //would it be cleaner to use spyOn?
    defaultHasBeenSet:false,
    defaultFunction:null,
    generate : function(questionSpec,callback){
      setTimeout(
        function(){
          callback(null,"question for " + questionSpec.topicId);
        },0
      );
    },
    setDefault:function(defaultFunction){
      this.defaultHasBeenSet=true;
      this.defaultFunction=defaultFunction;
    }
  };
  beforeEach(module('MathQuestions.worksheet'));
  beforeEach(module(function($provide){
      $provide.factory('topicDistributor',function(){
        //return a mock topciDistributor factory
        mockDistribution.$setNumberOfWeeks(2);
        mockDistribution.$setNumberOfMentalStrategyQuestions(2);
        
        return {
          createDistribution:function(callback){
            callback(mockDistribution);
          }
        };
      });
      $provide.factory('questionGenerator',function(){
        
        return mockQuestionGenerator;
        
      });
      
  }));

  describe('WorksheetController', function() {
    var $scope;

    beforeEach(inject(function($rootScope, $controller) {
      $scope = $rootScope.$new();
      $controller('WorksheetController', {$scope: $scope});
    }));

    it('Should set a default for number of questions', function() {
      expect($scope.numberOfTimesTableQuestions).toBe(10);
    });
    
    it('generates correct number of weeks', function() {
      $scope.$apply(function(){
        mockDistribution.$setNumberOfWeeks(10);        
        
        $scope.generate();
      });
      expect($scope.weeks.length).toBe(10);
    });

    it('generates correct number of sheets per week', function() {
      $scope.$apply(function(){        
        $scope.generate();
      });
      $scope.weeks.forEach(function(week){
        expect(week.worksheets.length).toBe(numberOfSheetsPerWeek);
      });
      
    });
    
    it('populates correct week numbers', function() {
      $scope.$apply(function(){        
        $scope.generate();
      });
      $scope.weeks.forEach(function(week,index){
        expect(week.number).toBe(index+1);
      });      
    });
    
    it('populates correct session numbers', function() {
      $scope.$apply(function(){        
        $scope.generate();
      });
      $scope.weeks.forEach(function(week){
        week.worksheets.forEach(function(sheet,index){
          expect(sheet.number).toBe(index+1);
        });
      });      
    });
    
    describe('Mental strategies',function(){
      it('has correct number of questions',function(){
        mockDistribution.$setNumberOfWeeks(2);
        
        mockDistribution.$setNumberOfMentalStrategyQuestions(5);
        $scope.$apply(function(){        
          $scope.generate();
        });
        
        $scope.weeks.forEach(function(week){
          week.worksheets.forEach(function(sheet,index){
            expect(sheet.mentalStrategies.questions.length).toBe(5);
          });
        });

        mockDistribution.$setNumberOfWeeks(2);
        
        mockDistribution.$setNumberOfMentalStrategyQuestions(2);
        $scope.$apply(function(){        
          $scope.generate();
        });
        
        $scope.weeks.forEach(function(week){
          week.worksheets.forEach(function(sheet,index){
            expect(sheet.mentalStrategies.questions.length).toBe(2);
          });
        });               
      });
      
      it('correctly numbers questions',function(){
        
        mockDistribution.$setNumberOfMentalStrategyQuestions(5);
        $scope.$apply(function(){        
          $scope.generate();
        });
        
        $scope.weeks.forEach(function(week){
          week.worksheets.forEach(function(sheet){
            sheet.mentalStrategies.questions.forEach(function(question,questionIndex){
              var expectedQuestionNumber=questionIndex+1;
              expect(question.number).toBe(expectedQuestionNumber);
            });
          });
        });
      });
      
      it('places the questions according to the topic distribibutor',function(){
        mockDistribution.$setNumberOfWeeks(2);
        mockDistribution.$setNumberOfMentalStrategyQuestions(5);        
        $scope.$apply(function(){        
          $scope.generate();
        });
        
        $scope.weeks.forEach(function(week){
          week.worksheets.forEach(function(sheet){
            sheet.mentalStrategies.questions.forEach(function(question,questionIndex){
              var expectedQuestionNumber=questionIndex+1;
              var expectedText = 'question for '+ expectedQuestionNumber;
              expect(question.question).toEqual(expectedText + alphabet[questionIndex]);
            });
          });
        });
      });
      
      it("sets a default generator function ",function(){
        expect(mockQuestionGenerator.defaultHasBeenSet).toBe(true);
      });
      
      it("default generator is actually a function ",function(){
        
        var isAFunction = (typeof mockQuestionGenerator.defaultFunction === "function");
        expect(isAFunction).toBe(true);
      });
      
      it('default function does the right thing',function(done){
        mockQuestionGenerator.defaultFunction(
          {
            class : 'TestTopicClass',
            topicId:'TestTopicID'
          },
          function(err,question){
            expect(question).toEqual('Placeholder for TestTopicClass topic TestTopicID' );
            done();
          });
      });
      
      xit('array does not contain any undefined elements');
            
    });

    describe('Times table',function(){
      it('has correct number of questions',function(){
        mockDistribution.$setNumberOfWeeks(2);
        
        mockDistribution.$setNumberOfTimesTableQuestions(5);
        $scope.$apply(function(){        
          $scope.generate();
        });
        
        $scope.weeks.forEach(function(week){
          week.worksheets.forEach(function(sheet,index){
            expect(sheet.timesTable.questions.length).toBe(5);
          });
        });

        mockDistribution.$setNumberOfWeeks(2);
        
        mockDistribution.$setNumberOfTimesTableQuestions(2);
        $scope.$apply(function(){        
          $scope.generate();
        });
        
        $scope.weeks.forEach(function(week){
          week.worksheets.forEach(function(sheet,index){
            expect(sheet.timesTable.questions.length).toBe(2);
          });
        });               
      });
      
      it('calls question generator for times table questions',function(){
        mockDistribution.$setNumberOfWeeks(1);
        mockDistribution.$setNumberOfTimesTableQuestions(1);
        spyOn(mockQuestionGenerator, 'generate');
        $scope.$apply(function(){        
          $scope.generate();
        });
        expect (mockQuestionGenerator.generate).toHaveBeenCalledWith({class:"timesTable",topicId:1,multiplier:jasmine.any(Number)},jasmine.any(Function));
        
        
        
        
      });
      
      it('it uses the multiplier from the distributor',function(){
        mockDistribution.$setNumberOfWeeks(1);
        mockDistribution.$setNumberOfTimesTableQuestions(1);
        mockDistribution.$setTimesTableMultipliers(42);
        spyOn(mockQuestionGenerator, 'generate');
        $scope.$apply(function(){        
          $scope.generate();
        });
        expect (mockQuestionGenerator.generate).toHaveBeenCalledWith({class:"timesTable",topicId:1,multiplier:42},jasmine.any(Function));
        
        
        
        
      });
      
      
    });
  });
});
