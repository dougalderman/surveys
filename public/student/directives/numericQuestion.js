angular.module('surveys')
.directive('numericQuestion', function() {
    return {
        restrict: 'E',
        templateUrl: 'student/views/numericQuestion.html', 
        scope: {
            lowRange: '=',
            highRange: '=',
            required: '=',
            questionIndex: '@',
            questionText: '@',
            questionType: '@',
            response: '=',
            requiredField: '='
        },
        controller: function($scope) {
            
                      
            if ($scope.questionType === 'numeric') {
            
                /* $scope.response = {}; */
                $scope.response.numericAnswer =  $scope.lowRange + Math.floor(0.5*($scope.highRange - $scope.lowRange));
             
            }
                                     
                    
            
        }
    }
        
});