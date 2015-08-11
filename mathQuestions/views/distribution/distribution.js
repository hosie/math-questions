'use strict';

angular.module('MathQuestions.distributionView', ['ngRoute','GreatMath.session-scheduler','GreatMath.question-generator','GreatMath.topic-registry'])

.config(['$routeProvider', function($routeProvider) {
  
  $routeProvider.when('/distribution', {
    templateUrl: 'views/distribution/distribution.html',
    controller: 'DistributionController'
  });
}])

.controller('DistributionController', ['$scope','sessionScheduler','default26TopicDistributionTable','topicRegistry',function($scope,sessionScheduler,default26TopicDistributionTable,topicRegistry) {
  
  $scope.weekNumbers=[];
  //transpose
  var mentalStrategiesDistribution =[];
  default26TopicDistributionTable.forEach(function(row,rowIndex){    
    row.forEach(function(cell,columnIndex){
      if(columnIndex>=mentalStrategiesDistribution.length){
        mentalStrategiesDistribution[columnIndex]=[];
      }     
      mentalStrategiesDistribution[columnIndex][rowIndex]=cell;
    });
  });
  
  for(var i=0;i<default26TopicDistributionTable.length;i++){
    $scope.weekNumbers.push(i+1);
  }
  
  topicRegistry.getTopics({class:'mentalStrategies'},function(topics){
    $scope.$apply(function(){
      $scope.mentalStrategiesDistributionGrid=[];
      mentalStrategiesDistribution.forEach(function(row,rowIndex){
        if(rowIndex<topics.length){
          $scope.mentalStrategiesDistributionGrid.push(
            {
              topic:topics[rowIndex],
              cells:row.map(function(item){return item==1;})
            }
          );            
        }else{
          $scope.mentalStrategiesDistributionGrid.push(
            {
              topic:{description:''},
              cells:row.map(function(item){return item==1;})
            }
          );
        }        
      });
    });
  });
  
}]);


