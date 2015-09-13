'use strict';
var alphabet = ['A','B','C','D','E','F'];
        
describe('Worksheet', function() {
  //values used to mock dependencies and to expect in assertions
  var numberOfSheetsPerWeek=5;
  var mockDistribution;
  beforeEach(function(){
      numberOfSheetsPerWeek=5;
      mockDistribution = {
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
            keySkills:{
              questionSpecs:[]
            }
          };
          this.weeks.push(week);
          weekNumber++;
        }
      },
      $setNumberOfTimesTableQuestions:function(numberOfQuestions){
        this.weeks.forEach(function(week){
          var questionNumber=1;
          while(questionNumber<numberOfQuestions+1){
            week.timesTable.questionSpecs.push({id:31504,multiplier:1});                    
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
            week.mentalStrategies.topics.push({id:'ms'+questionNumber+alphabet[questionNumber-1]});          
            questionNumber++;
          }
        });
      },
      $setNumberOfKeySkillsQuestions:function(numberOfQuestions){
        this.weeks.forEach(function(week){
          var questionNumber=1;
          while(questionNumber<numberOfQuestions+1){
            week.keySkills.questionSpecs.push({id:'ks'+questionNumber+alphabet[questionNumber-1]});          
            questionNumber++;
          }
        });
      }
    };
    
  });
  
  
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
      $provide.factory('sessionScheduler',function(){
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
    it('is happy when there are no questions to generate', function(done) {
      $scope.$apply(function(){
        mockDistribution.$setNumberOfWeeks(10);        
        mockDistribution.$setNumberOfMentalStrategyQuestions(0);
        mockDistribution.$setNumberOfTimesTableQuestions(0);
        $scope.generate()
        .then(function(){          
          done();
        });
      });      
    });
    
    it('generates correct number of weeks', function(done) {
      $scope.$apply(function(){
        mockDistribution.$setNumberOfWeeks(10);        
        mockDistribution.$setNumberOfMentalStrategyQuestions(1);
        mockDistribution.$setNumberOfTimesTableQuestions(1);
        $scope.generate()
        .then(function(){
          expect($scope.weeks.length).toBe(10);  
          done();
        });
      });      
    });

    it('generates correct number of sheets per week', function(done) {
      $scope.$apply(function(){        
        $scope.generate()
        .then(function(){
          $scope.weeks.forEach(function(week){
            expect(week.worksheets.length).toBe(numberOfSheetsPerWeek);
            
          });         
          done();
        })
        ;
      });
      
      
    });
    
    it('populates correct week numbers', function(done) {
      $scope.$apply(function(){        
        $scope.generate()
        .then(function(){
          $scope.weeks.forEach(function(week,index){
            expect(week.number).toBe(index+1);
          });    
          done();          
        })
        ;
      });
            
    });
    
    it('populates correct session numbers', function(done) {
      $scope.$apply(function(){        
        $scope.generate()
        .then(function(){
          $scope.weeks.forEach(function(week){
            week.worksheets.forEach(function(sheet,index){
              expect(sheet.number).toBe(index+1);
            });
          });
          done();
        })
        ;
      });
            
    });
      
    it("sets a default generator function ",function(){
      expect(mockQuestionGenerator.defaultHasBeenSet).toBe(true);
    });
    
    it("default generator is actually a function ",function(){
      
      var isAFunction = (typeof mockQuestionGenerator.defaultFunction === "function");
      expect(isAFunction).toBe(true);
    });
    
    describe('Mental strategies',function(){
      it('has correct number of questions',function(done){
        mockDistribution.$setNumberOfWeeks(2);
        
        mockDistribution.$setNumberOfMentalStrategyQuestions(5);
        $scope.$apply(function(){        
          $scope.generate()
          .then(function(){
            $scope.weeks.forEach(function(week){
              week.worksheets.forEach(function(sheet,index){
                expect(sheet.mentalStrategies.questions.length).toBe(5);
              });
            });

            mockDistribution.$setNumberOfWeeks(2);
            
            mockDistribution.$setNumberOfMentalStrategyQuestions(2);
            $scope.$apply(function(){        
              $scope.generate().then(function(){
                $scope.weeks.forEach(function(week){
                  week.worksheets.forEach(function(sheet,index){
                    expect(sheet.mentalStrategies.questions.length).toBe(2);
                  });
                });
                done();
              });
            });
          });
        });        
      });
      
      it('correctly numbers questions',function(done){
        
        mockDistribution.$setNumberOfMentalStrategyQuestions(5);
        $scope.$apply(function(){        
          $scope.generate()
          .then(function(){
            $scope.weeks.forEach(function(week){
              week.worksheets.forEach(function(sheet){
                sheet.mentalStrategies.questions.forEach(function(question,questionIndex){
                  var expectedQuestionNumber=questionIndex+1;
                  expect(question.number).toBe(expectedQuestionNumber);
                });
              });
            });
            done();
          });
        });
      });
      
      it('places the questions according to the topic distribibutor',function(done){
        mockDistribution.$setNumberOfWeeks(2);
        mockDistribution.$setNumberOfMentalStrategyQuestions(5);        
        $scope.$apply(function(){        
          $scope.generate().then(function(){
            $scope.weeks.forEach(function(week){
              week.worksheets.forEach(function(sheet){
                sheet.mentalStrategies.questions.forEach(function(question,questionIndex){
                  var expectedQuestionNumber=questionIndex+1;
                  var expectedText = 'question for ms'+ expectedQuestionNumber;
                  expect(question.question).toEqual(expectedText + alphabet[questionIndex]);
                });
              });
            });
            done();            
          });
        });
        
        
      });
      
      it('uses correct topic id to generate questions',function(done){
        var topicIds = [42,73,44,104,92,87];
        mockDistribution.$setNumberOfWeeks(1);
        mockDistribution.$setNumberOfMentalStrategyQuestions(6);
        mockDistribution.weeks[0].mentalStrategies.topics.forEach(function(topic,topicIndex){
          topic.id=topicIds[topicIndex];
        });
        $scope.$apply(function(){        
          $scope.generate().then(function(){
            var question = $scope.weeks[0].worksheets[0].mentalStrategies.questions.forEach(function(question,questionIndex){//todo use spyOn once I figure out how to assert hasBeenCalled x times with...
              expect(question.question).toEqual("question for " + topicIds[questionIndex]);            
            } );            
            done();            
          });
        });
        
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
      
      it('includes answer template',function(done){
        mockDistribution.$setNumberOfMentalStrategyQuestions(1);
        var generate = mockQuestionGenerator.generate;
        mockQuestionGenerator.generate=function(questionSpec,callback){
          setTimeout(
            function(){
              callback(null,"question for " + questionSpec.topicId,null,{postfix:'testPostFix'});
            },0
          );
        }
        $scope.$apply(function(){        
          $scope.generate()
          .then(function(){
            $scope.weeks.forEach(function(week){
              week.worksheets.forEach(function(sheet){
                sheet.mentalStrategies.questions.forEach(function(question,questionIndex){
                  var expectedQuestionNumber=questionIndex+1;
                  expect(question.answer.template.postfix).toEqual('testPostFix');
                });
              });
            });
            mockQuestionGenerator.generate=generate;
            done();
          });
        });
      });
      
      xit('array does not contain any undefined elements');
            
    });

    describe('Times table',function(){
      it('has correct number of questions',function(done){
        mockDistribution.$setNumberOfWeeks(2);
        
        mockDistribution.$setNumberOfTimesTableQuestions(5);
        $scope.$apply(function(){        
          $scope.generate()
          .then(function(){
            $scope.weeks.forEach(function(week){
              week.worksheets.forEach(function(sheet,index){
                expect(sheet.timesTable.questions.length).toBe(5);
              });
            });

            mockDistribution.$setNumberOfWeeks(2);
            
            mockDistribution.$setNumberOfTimesTableQuestions(2);
            $scope.$apply(function(){        
              $scope.generate()
              .then(function(){
                $scope.weeks.forEach(function(week){
                  week.worksheets.forEach(function(sheet,index){
                    expect(sheet.timesTable.questions.length).toBe(2);
                  });
                });
                done();
              });
            });
          });
        });
        
                       
      });
      
      it('calls question generator for times table questions',function(done){
        mockDistribution.$setNumberOfWeeks(1);
        mockDistribution.$setNumberOfTimesTableQuestions(1);
        spyOn(mockQuestionGenerator, 'generate').and.callThrough();
        $scope.$apply(function(){        
          $scope.generate().then(function(){
            expect (mockQuestionGenerator.generate).toHaveBeenCalledWith({class:"timesTable",topicId:jasmine.any(Number),multiplier:jasmine.any(Number)},jasmine.any(Function));
            done();
          });
        });
      });
      
      it('uses the multiplier from the distributor',function(done){
        mockDistribution.$setNumberOfWeeks(1);
        mockDistribution.$setNumberOfTimesTableQuestions(1);
        mockDistribution.$setTimesTableMultipliers(42);
        spyOn(mockQuestionGenerator, 'generate').and.callThrough();
        $scope.$apply(function(){        
          $scope.generate()
          .then(function(){
            expect (mockQuestionGenerator.generate).toHaveBeenCalledWith({class:"timesTable",topicId:jasmine.any(Number),multiplier:42},jasmine.any(Function));
            done();
          });
        });
      });
    
      it('uses correct topic id to generate questions',function(done){
        mockDistribution.$setNumberOfWeeks(1);
        mockDistribution.$setNumberOfTimesTableQuestions(1);
        mockDistribution.weeks[0].timesTable.questionSpecs[0].id=42;
        spyOn(mockQuestionGenerator, 'generate').and.callThrough();
        $scope.$apply(function(){        
          $scope.generate()
          .then(function(){
            expect (mockQuestionGenerator.generate).toHaveBeenCalledWith({class:"timesTable",topicId:42,multiplier:jasmine.any(Number)},jasmine.any(Function));
            done();
          });
        });        
      });
      
    });
    
    describe('Key skills',function(){
      it('has correct number of questions',function(done){
        mockDistribution.$setNumberOfWeeks(2);        
        mockDistribution.$setNumberOfKeySkillsQuestions(5);
        $scope.$apply(function(){        
          $scope.generate()
          .then(function(){
            expect($scope.weeks.length).not.toEqual(0);
            $scope.weeks.forEach(function(week){
              week.worksheets.forEach(function(sheet,index){
                expect(sheet.keySkills.questions.length).toBe(5);
              });
            });

            mockDistribution.$setNumberOfWeeks(2);            
            mockDistribution.$setNumberOfKeySkillsQuestions(2);
            $scope.$apply(function(){        
              $scope.generate().then(function(){
                $scope.weeks.forEach(function(week){
                  week.worksheets.forEach(function(sheet,index){
                    expect(sheet.keySkills.questions.length).toBe(2);
                  });
                });
                done();
              });
            });
          });
        });        
      });
      
      it('correctly numbers questions',function(done){
        
        mockDistribution.$setNumberOfKeySkillsQuestions(5);
        $scope.$apply(function(){        
          $scope.generate()
          .then(function(){
            expect($scope.weeks.length).not.toEqual(0);
            $scope.weeks.forEach(function(week){
              expect(week.worksheets.length).not.toEqual(0);
              week.worksheets.forEach(function(sheet){
                expect(sheet.keySkills.questions.length).not.toEqual(0);
                sheet.keySkills.questions.forEach(function(question,questionIndex){
                  var expectedQuestionNumber=questionIndex+1;
                  expect(question.number).toBe(expectedQuestionNumber);
                });
              });
            });
            done();
          });
        });
      });
      
      it('places the questions according to the topic distribibutor',function(done){
        mockDistribution.$setNumberOfWeeks(2);
        mockDistribution.$setNumberOfKeySkillsQuestions(5);        
        $scope.$apply(function(){        
          $scope.generate().then(function(){
            expect($scope.weeks.length).not.toEqual(0);
            $scope.weeks.forEach(function(week){
              expect(week.worksheets.length).not.toEqual(0);
              week.worksheets.forEach(function(sheet){
                expect(sheet.keySkills.questions.length).not.toEqual(0);
                sheet.keySkills.questions.forEach(function(question,questionIndex){
                  var expectedQuestionNumber=questionIndex+1;
                  var expectedText = 'question for ks'+ expectedQuestionNumber;
                  expect(question.question).toEqual(expectedText + alphabet[questionIndex]);
                });
              });
            });
            done();            
          });
        });
        
        
      });
      
      xit('uses correct topic id to generate questions',function(done){
        var topicIds = [42,73,44,104,92,87];
        mockDistribution.$setNumberOfWeeks(1);
        mockDistribution.$setNumberOfMentalStrategyQuestions(6);
        mockDistribution.weeks[0].mentalStrategies.topics.forEach(function(topic,topicIndex){
          topic.id=topicIds[topicIndex];
        });
        $scope.$apply(function(){        
          $scope.generate().then(function(){
            var question = $scope.weeks[0].worksheets[0].mentalStrategies.questions.forEach(function(question,questionIndex){//todo use spyOn once I figure out how to assert hasBeenCalled x times with...
              expect(question.question).toEqual("question for " + topicIds[questionIndex]);            
            } );            
            done();            
          });
        });
        
      });
      
      xit('default function does the right thing',function(done){
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

  });
});
