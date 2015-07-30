'use strict';

angular.module('MathQuestions.worksheet.preview', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  
  $routeProvider.when('/worksheet', {
    templateUrl: 'views/worksheet/worksheet.html',
    controller: 'WorksheetPreviewController'
  });
}])

.controller('WorksheetPreviewController', ['$scope','$sce',function($scope,$sce) {
  
  $scope.numberOfTimesTableQuestions = 10;
  $scope.numberOfWeeks               = 39;
  $scope.numberOfSheetsPerWeek       = 5;
  $scope.generate = function (){
    $scope.weeks = new Array();
    for(var i=0;i<$scope.numberOfWeeks;i++){
      var week = new Object();
      week.worksheets=new Array();
      week.number=i+1;
      
      for(var j=0;j<$scope.numberOfSheetsPerWeek;j++){
        var worksheet=new Object();
        worksheet.mentalStrategies=new Object();
        worksheet.mentalStrategies.questions=[
        {
          number:"1",
          question:"3 + \u2610 = 5",
          answer:""
        },
        {
          number:"2",
          question:"8 + \u2610 = 13",
          answer:""
        },
        {
          number:"3",
          question:"11 + 4 = \u2610",
          answer:""
        },
        {
          number:"4",
          question:"9 + 9 = \u2610",
          answer:""
        },
        {
          number:"5",
          question:"9 + \u2610 = 16",
          answer:""
        },
        {
          number:"6",
          question:"18 - 7 = \u2610",
          answer:""
        },
        {
          number:"7",
          question:"3 + \u2610 = 5",
          answer:""
        },
        {
          number:"8",
          question:"4 + \u2610 = 5",
          answer:""
        },
        {
          number:"9",
          question:"9 + = \u2610",
          answer:""
        },
        {
          number:"10",
          question:"12 - \u2610 = 9",
          answer:""
        }
        
        
        ];
        
        worksheet.timesTable=new Object();
        worksheet.timesTable.questions=[
        {
          number:"1",
          question:"6 \u00D7 10",
          answer:""
        },
        {
          number:"2",
          question:"4 \u00D7 8",
          answer:""
        },
        {
          number:"3",
          question:"6 \u00D7 9",
          answer:""
        },
        {
          number:"4",
          question:"9 \u00D7 11",
          answer:""
        },
        {
          number:"5",
          question:"2 \u00D7 9",
          answer:""
        },
        {
          number:"6",
          question:"3 \u00D7 3",
          answer:""
        },
        {
          number:"7",
          question:"2 \u00D7 9",
          answer:""
        },
        {
          number:"8",
          question:"8 \u00D7 5",
          answer:""
        },
        {
          number:"9",
          question:"5 \u00D7 12",
          answer:""
        },
        {
          number:"10",
          question:"3 \u00D7 8",
          answer:""
        }
        ];
        worksheet.keySkills=new Object();
        worksheet.keySkills.questions=[
        {
          number:"1",
          question:"34 \u00D7 28",
          answer:""
        },
        {
          number:"2",
          question:"8732 - 829",
          answer:""
        },
        {
          number:"3",
          question:"2.3 \u00D7 12.1",
          answer:""
        },
        {
          number:"4",
          question:"1/2 = \u2610%",
          answer:""
        },
        {
          number:"5",
          question:"12.47 + 3.8",
          answer:""
        },
        {
          number:"6",
          question:"-15 \u00F7 3",
          answer:""
        },
        {
          number:"7",
          question:$sce.trustAsHtml("If a = 3 and b = 4, find the value of:<br>   2a + (b - 4)"),
          answer:""
        },
        {
          number:"8",
          question:"3 - -4",
          answer:""
        },
        {
          number:"9",
          question:"List all the factors of 24",
          answer:""
        },
        {
          number:"10",
          question:$sce.trustAsHtml("What is the value of 6"+ "2".sup() + "?"),
          answer:""
        }
        ];
        worksheet.number=j+1;
        week.worksheets.push(worksheet);        
      }

      $scope.weeks.push(week);
      
      
    }    
  };
}]);
