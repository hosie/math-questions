'use strict';

describe('GreatMath.distribution-view module', function() {
  var $scope;
  var testTopics = [
    {
      id:101,
      description:"testTopic1"
    },
    {
      id:102,
      description:"testTopic2"
    }
  ];
  var mockDistribution;
  var mockSessionScheduler;
  var mockTopicRegistry;
  var mock26TopicDistributionTable=
  [
    [1,0,0],
    [0,1,0],
    [0,0,1]
  ];
  
  beforeEach(function(){
    
    mockSessionScheduler= {
      Distribution:function(){
        
      }
    };
    mockDistribution=new mockSessionScheduler.Distribution();
    mockSessionScheduler.Distribution.fromTable=function(){
      return mockDistribution;
    };
    mockTopicRegistry={
      getTopics:function(filter,callback){
        callback(testTopics);
      }
    };
    
  });
  
  beforeEach(module('MathQuestions.distributionView'));
  
  beforeEach(module(function($provide){
        
      $provide.factory('sessionScheduler',function(){
        
        return mockSessionScheduler;
        
      });
      
      $provide.factory('default26TopicDistributionTable',function(){
        
        return mock26TopicDistributionTable;
        
      });
      
      $provide.factory('topicRegistry',function(){
        
        return mockTopicRegistry;
        
      });
      
  }));
  
  
  
  beforeEach(inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $controller('DistributionController', {$scope: $scope});
  }));
  
  it('populates week numbers',function(){
    expect($scope.weekNumbers[0]).toBe(1);
    expect($scope.weekNumbers[1]).toBe(2);
    expect($scope.weekNumbers[2]).toBe(3);
  });
  
  it('creates a distribution grid',function(){
    expect($scope.mentalStrategiesDistributionGrid).toBeDefined();    
  });
  
  describe('Mental Strategies Distribution Grid',function(){
      
    it('has correct number of rows',function(){
      expect($scope.mentalStrategiesDistributionGrid.length).toEqual(mock26TopicDistributionTable.length);    
    });
    
    it('has topics as first column',function(){
      
      expect($scope.mentalStrategiesDistributionGrid[0].topic).toBe(testTopics[0]);
      expect($scope.mentalStrategiesDistributionGrid[1].topic).toBe(testTopics[1]);
    });
    
    it('has null for any missing topics',function(){
      expect($scope.mentalStrategiesDistributionGrid[2].topic.description).toEqual('');
    });
    
    it('has one column for each week in the distribution table in addition to the topic column',function(){
      expect($scope.mentalStrategiesDistributionGrid[0].cells.length).toBe(3);
      expect($scope.mentalStrategiesDistributionGrid[1].cells.length).toBe(3);
      expect($scope.mentalStrategiesDistributionGrid[2].cells.length).toBe(3);            
    });
    
    it('has the cells populated with correct values',function(){
      expect($scope.mentalStrategiesDistributionGrid[0].cells[0]).toBe(true);
      expect($scope.mentalStrategiesDistributionGrid[0].cells[1]).toBe(false);
      expect($scope.mentalStrategiesDistributionGrid[0].cells[2]).toBe(false);
      
      expect($scope.mentalStrategiesDistributionGrid[1].cells[0]).toBe(false);
      expect($scope.mentalStrategiesDistributionGrid[1].cells[1]).toBe(true);
      expect($scope.mentalStrategiesDistributionGrid[1].cells[2]).toBe(false);
      
      expect($scope.mentalStrategiesDistributionGrid[2].cells[0]).toBe(false);
      expect($scope.mentalStrategiesDistributionGrid[2].cells[1]).toBe(false);
      expect($scope.mentalStrategiesDistributionGrid[2].cells[2]).toBe(true);            
    });
  });
  
  
});