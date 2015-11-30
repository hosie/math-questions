'use strict';

describe('question bank',function(){
  
  beforeEach(module('GreatMath.question-bank'));
   
  describe('question iterator',function(){
      
      var questionIterator;
      var testData = 
"\
This is a question?\n\
This is another question?\
";
      beforeEach(function(){
        module(function($provide){
          $provide.factory('questionList',function(){
            return {
              get:function(callback){
                callback(testData.split("\n"));
              }
            };
          });            
        });    
      });
      
      beforeEach(inject(function( _questionIterator_) {
        questionIterator=_questionIterator_;
      }));
      
      it('returns the next question for a given topic',function(done){
        questionIterator.next(function(nextQuestion){
          expect(nextQuestion).toBeDefined();
          expect(nextQuestion).not.toBeNull();
          done();
        });
      });    
        
      it('does not return the same question twice',function(done){
        questionIterator.next(function(firstQuestion){
          questionIterator.next(function(secondQuestion){
            expect(firstQuestion).not.toEqual(secondQuestion);
            done();
          });        
        });      
      });
      
      it('iterates through the question list',function(done){
        questionIterator.next(function(firstQuestion){
          expect(firstQuestion).toEqual("This is a question?");
          questionIterator.next(function(secondQuestion){
            expect(secondQuestion).toEqual("This is another question?");
            done();             
          });
        });
      });
      
      it('goes back to the start when it gets to the end',function(done){
        questionIterator.next(function(firstQuestion){
          questionIterator.next(function(secondQuestion){
            questionIterator.next(function(thirdQuestion){
              expect(thirdQuestion).toEqual("This is a question?");
              done();             
            });
          });
        });
      });
    
  });

  describe('questionList',function(){
    var $httpBackend, questionListRequestHandler;
    //var testList = ['question1','question2'];
    var testList = "\
This is a question?\n\
This is another question?\n\
This is escaped %u00B2\
";
    beforeEach(inject(function($injector) {
      
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      // backend definition common for all tests
      questionListRequestHandler = $httpBackend.when('GET', '/questionBank/questions')
                            .respond(testList);

     
    }));
    
    beforeEach(inject(function( _questionList_) {
        questionList = _questionList_;
    }));
    
    afterEach(function() {
          
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    var questionList;
        
    it('gets question list from http backend',function(){
      
      //The http request is made during the construction which is at injection time
      $httpBackend.expectGET('/questionBank/questions'); 
      
      questionList.get(function(list){
        expect(list[0]).toEqual("This is a question?");        
      });
      
      $httpBackend.flush();          
      
    });
    
    it('handles escape chars',function(){
      questionList.get(function(list){
        expect(list[2]).toEqual("This is escaped \u00B2");
      });
      $httpBackend.flush();          
    });
  
  
  });
});