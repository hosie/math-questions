'use strict';

angular.module('MathQuestions.distributionView', ['ngRoute','GreatMath.session-scheduler','GreatMath.question-generator','GreatMath.topic-registry'])

.config(['$routeProvider', function($routeProvider) {
  
  $routeProvider.when('/distribution', {
    templateUrl: 'views/distribution/distribution.html',
    controller: 'DistributionController'
  });
}])

.controller('DistributionController', ['$scope','sessionScheduler','default26TopicDistributionTable','topicRegistry',function($scope,sessionScheduler,default26TopicDistributionTable,topicRegistry) {
  
  topicRegistry.getTopics({class:'mentalStrategies'},function(topics){
    $scope.$apply(function(){
      $scope.distributionGrid=[];
      default26TopicDistributionTable.forEach(function(row,rowIndex){
        if(rowIndex<topics.length){
          $scope.distributionGrid.push([topics[rowIndex]].concat(row.map(function(item){return item==1})));  
        }else{
          $scope.distributionGrid.push([{description:''}].concat(row.map(function(item){return item==1})));
        }        
      });
    });
  });
  
}]);


