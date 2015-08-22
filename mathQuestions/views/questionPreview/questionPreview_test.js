describe('QuestionPreviewController',function(){
  
  var $scope;
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

  
  beforeEach(inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $controller('QuestionPreviewController', {$scope: $scope});
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
    mockQuestionGenerator.generate = jasmine.createSpy('generate');
    it('calls the question generator for the selected topic id',function(done){
             
      $scope.$watch(
        function(){
          return $scope.question;
        },
        function(){
          expect(mockQuestionGenerator.generate).toHaveBeenCalledWith(
            { 
              class : "mentalStrategies",
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

    it('includes a diagram if one is provided',function(done){
      var testSvg = '<svg width="100" height="100"><rect cx="50" cy="50" width="80" height="80"></rect></svg>';
      mockQuestionGenerator.generate = function(questionSpec,callback){
        setTimeout(function(){
          callback(null,"look at the diagram",testSvg);
        },0);
        
      };
      $scope.$watch(
        function(){
          return $scope.diagram;
        },
        function(oldVal,newVal){
          if(oldVal==newVal){
            return;
          }
          expect($scope.diagram).toEqual(testSvg);
          done();        
        },
        true
      );
      $scope.$apply(function (){
        $scope.selectedTopic=42;        
      });
    
    });    
  });
});