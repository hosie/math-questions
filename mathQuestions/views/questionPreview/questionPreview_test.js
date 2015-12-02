describe('QuestionPreviewController',function(){
  
  var $scope;
  var $rootScope;
  var $browser;
  var mockQuestionGenerator={};
  
  var mockTopicRegistry = {
    getTopics:function(callback){
      callback([
        {
          id:1,
          description : 'topic1'
        },
        {
          id:2,
          description : 'topic2'
        },
        {
          id:3,
          description : 'topic3'
        }
      ]);
    }
  };
  
  beforeEach(module('MathQuestions.questionPreview'));
  beforeEach(module(function($provide){
        
      $provide.factory('topicRegistry',function(){
        
        return mockTopicRegistry;
        
      });
      
      $provide.factory('questionGenerator',function(){
        
        return mockQuestionGenerator;
        
      });
      
  }));

  
  beforeEach(inject(function(_$rootScope_, $controller,_$browser_) {
    $rootScope=_$rootScope_;
    $scope = $rootScope.$new();
    $controller('QuestionPreviewController', {$scope: $scope});
    $browser=_$browser_;
  }));    
  
  describe('list of topics',function(){
    it('includes correct number of topics',function(done){
      expect($scope.availableTopics.length).toBe(3);  
      done();
    });
    
    it('includes topic id and description',function(){
      $scope.availableTopics.forEach(function(topic,index){
        var expctedTopicId = index+1;
        expect(topic.id).toEqual(expctedTopicId);
        expect(topic.description).toEqual('topic'+expctedTopicId);
      });
    });           
  });
  
  describe('generated question',function(){
    
    beforeEach(function(){
      mockQuestionGenerator.generate = jasmine.createSpy('generate');
      
    });
    
    it('calls the question generator for the selected topic id',function(done){
             
      $scope.$watch(
        function(){
          return $scope.questions;
        },
        function(){
          expect(mockQuestionGenerator.generate).toHaveBeenCalledWith(
            { 
              topicId    : 42
            },
            jasmine.any(Function)
          );
          done();        
        },
        true
      );
      $scope.$apply(function (){
        $scope.selectedTopic=42;        
      });
    });

    it('adds question to scope',function(done){
             
      var testQuestion = 'this is a question?';
      mockQuestionGenerator.generate = function(questionSpec,callback){
        setTimeout(function(){
          callback(null,testQuestion);
        },0);
        
      };
      var cancel = $scope.$watch(
        function(){
          return $scope.questions;
        },
        function(oldVal,newVal){
          if(oldVal==newVal){
            return;
          }
          expect($scope.questions[0].question).toEqual(testQuestion);          
          done();        
          cancel();
        },
        true
      );
      $scope.$apply(function (){
        $scope.selectedTopic=42;
        
      });
      $rootScope.$apply();
      
    });
 

    it('adds multiple questions to scope',function(done){
             
      var testQuestions = [
      'one',
      '2',
      'tree'
      ];
      var nextQuestionIndex=0;
      mockQuestionGenerator.generate = function(questionSpec,callback){
        setTimeout(function(){
          callback(null,testQuestions[nextQuestionIndex++]);
        },0);
        
      };
      var cancel = $scope.$watch(
        function(){
          return $scope.questions;
        },
        function(oldVal,newVal){
          if(oldVal==newVal){
            return;  
          }
          if($scope.questions.length<3){
            return;
          }
          expect($scope.questions.length).toEqual(3);
          expect($scope.questions[0].question).toEqual(testQuestions[0]);          
          expect($scope.questions[1].question).toEqual(testQuestions[1]);          
          expect($scope.questions[2].question).toEqual(testQuestions[2]);          
          done();        
          cancel();
        },
        true
      );
      $scope.$apply(function (){
        $scope.generator.numberOfQuestions = 3;
      
        $scope.selectedTopic=42;
        
      });
      $rootScope.$apply();
      
    });
 
 
    it('hasDiagram is false',function(done){
             
      
      mockQuestionGenerator.generate = function(questionSpec,callback){
        setTimeout(function(){
          callback(null,"..?");
        },0);
        
      };
      var cancel = $scope.$watch(
        function(){
          return $scope.questions;
        },
        function(oldVal,newVal){
          if(oldVal==newVal){
            return;
          }
          expect($scope.questions[0].hasDiagram).toEqual(false);          
          done();        
          cancel();
        },
        true
      );
      $scope.$apply(function (){
        $scope.selectedTopic=42;        
      });
      
    });
    
    it('includes a diagram if one is provided',function(done){
      var testSvg = '<svg width="100" height="100"><rect cx="50" cy="50" width="80" height="80"></rect></svg>';
      mockQuestionGenerator.generate = function(questionSpec,callback){
        setTimeout(function(){
          callback(null,"look at the diagram",testSvg);
        },0);
        
      };
      var cancel = $scope.$watch(
        function(){
          return $scope.questions;
        },
        function(oldVal,newVal){
          if(oldVal==newVal){
            return;
          }
          expect($scope.questions[0].diagram.$$unwrapTrustedValue()).toEqual(testSvg);
          expect($scope.questions[0].hasDiagram).toEqual(true);
          done();        
          cancel();
        },
        true
      );
      $scope.$apply(function (){
        $scope.selectedTopic=42;        
      });
      
    
    });

    it('includes a postfix in template, if provided',function(done){
      var testTemplate = {postfix:"testPostFix"};
      mockQuestionGenerator.generate = function(questionSpec,callback){
        setTimeout(function(){
          callback(null,"answer with postfix",'',testTemplate);
        },0);
        
      };
      var cancel = $scope.$watch(
        function(){
          return $scope.questions;
        },
        function(oldVal,newVal){
          if(oldVal==newVal){
            return;
          }
          expect($scope.questions[0].answerTemplate.postfix).toEqual('testPostFix');
          expect($scope.questions[0].hasAnswerTemplate).toEqual(true);
          cancel();
          done();
        },
        true
      );
      $scope.$apply(function (){
        $scope.selectedTopic=42;        
      });
      
    
    });
    
    it('hasAnswerTemplate is false',function(done){
      mockQuestionGenerator.generate = function(questionSpec,callback){
        setTimeout(function(){
          callback(null,"answer with postfix");
        },0);
        
      };
      var cancel = $scope.$watch(
        function(){
          return $scope.questions;
        },
        function(oldVal,newVal){
          if(oldVal==newVal){
            return;
          }
          expect($scope.questions[0].hasAnswerTemplate).toEqual(false);
          cancel();
          done();
        },
        true
      );
      $scope.$apply(function (){
        $scope.selectedTopic=42;        
      });
      
    
    });
    
    it('regenerates when asked to',function(done){
      var someNumber=0;
      mockQuestionGenerator.generate = function(questionSpec,callback){
        setTimeout(function(){
          callback(null,"" + (++someNumber));
        },0)
      }
      var gennedOnce=false;
      //set up a watcher, should be called once anyway
      $scope.$watch(
        function(){
          return $scope.questions;
        },
        function(){
          if(gennedOnce){
            //this is the second time
            done();
          }else{
            gennedOnce=true;
            $scope.generator.regenerate();
          }      
        },
        true
      );
      $scope.$apply(function (){
        $scope.selectedTopic=42;        
      });
      
      
    });  
  });
});