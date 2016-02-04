angular.module('surveys')
.directive('numericQuestion', function() {
    return {
        restrict: 'E',
        templateUrl: 'student/views/numericQuestion.html', 
        scope: {
            lowValue: '=',
            highValue: '=',
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
                $scope.response.numericAnswer =  $scope.lowValue + 0.5*($scope.highValue - $scope.lowValue);
             
            }
                                     
                    
            
        }
    }
        
});