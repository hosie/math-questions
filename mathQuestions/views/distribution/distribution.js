'use strict';
//transpose
  
angular.module('MathQuestions.distributionView', ['ngRoute','GreatMath.session-scheduler','GreatMath.question-generator','GreatMath.topic-registry'])

.config(['$routeProvider', function($routeProvider) {
  
  $routeProvider.when('/distribution', {
    templateUrl: 'views/distribution/distribution.html',
    controller: 'DistributionController'
  });
}])

.controller('DistributionController', ['$scope','sessionScheduler','default26TopicDistributionTable','default33TopicDistributionTable','topicRegistry',function($scope,sessionScheduler,default26TopicDistributionTable,default33TopicDistributionTable,topicRegistry) {
  
  $scope.weekNumbers=[];
  function transposeArray(inputArray){
    var result =[]
    inputArray.forEach(function(row,rowIndex){    
      row.forEach(function(cell,columnIndex){
        if(columnIndex>=result.length){
          result[columnIndex]=[];
        }     
        result[columnIndex][rowIndex]=cell;
      });
    });
    return result;
  }
  
  var mentalStrategiesDistribution =transposeArray(default26TopicDistributionTable);
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
  
  var keySkillsDistributionTable = transposeArray(default33TopicDistributionTable);
  $scope.keySkillsDistributionGrid =[];
  topicRegistry.getTopics({class:'keySkills'},function(topics){
    $scope.$apply(function(){
      keySkillsDistributionTable.forEach(function(row,rowIndex){    
        
        if(rowIndex<topics.length){
          $scope.keySkillsDistributionGrid.push(
            {
              topic:topics[rowIndex],
              cells:row.map(function(item){return item==1;})
            }
          );            
        }else{
          $scope.keySkillsDistributionGrid.push(
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


