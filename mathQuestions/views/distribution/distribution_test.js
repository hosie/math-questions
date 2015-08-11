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
  
  it('creates a distribution grid',function(){
    expect($scope.distributionGrid).toBeDefined();    
  });
  
  describe('Distribution Grid',function(){
      
    it('has correct number of rows',function(){
      expect($scope.distributionGrid.length).toEqual(mock26TopicDistributionTable.length);    
    });
    
    it('has topics as first column',function(){
      
      expect($scope.distributionGrid[0][0]).toBe(testTopics[0]);
      expect($scope.distributionGrid[1][0]).toBe(testTopics[1]);
    });
    
    it('has null for any missing topics',function(){
      expect($scope.distributionGrid[2][0].description).toEqual('');
    });
    
    it('has one column for each week in the distribution table in addition to the topic column',function(){
      expect($scope.distributionGrid[0].length).toBe(4);
      expect($scope.distributionGrid[1].length).toBe(4);
      expect($scope.distributionGrid[2].length).toBe(4);            
    });
    
    it('has the cells populated with correct values',function(){
      expect($scope.distributionGrid[0][1]).toBe(true);
      expect($scope.distributionGrid[0][2]).toBe(false);
      expect($scope.distributionGrid[0][3]).toBe(false);
      
      expect($scope.distributionGrid[1][1]).toBe(false);
      expect($scope.distributionGrid[1][2]).toBe(true);
      expect($scope.distributionGrid[1][3]).toBe(false);
      
      expect($scope.distributionGrid[2][1]).toBe(false);
      expect($scope.distributionGrid[2][2]).toBe(false);
      expect($scope.distributionGrid[2][3]).toBe(true);            
    });
  });
  
  
});