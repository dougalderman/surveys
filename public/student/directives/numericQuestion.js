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
            requiredField: '=',
            notAnswered: '='
        },
        controller: function($scope) {
            
                      
            if ($scope.questionType === 'numeric') {
            
                if ($scope.required)
                    $scope.response.numericAnswer = 0;
                else
                    $scope.response.numericAnswer = Math.round($scope.lowValue + 0.5*($scope.highValue - $scope.lowValue));
             
             
            }
                                     
                    
            
        }
    }
        
});