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
            response: '='
        },
        controller: function($scope) {
            $scope.response = {};
            /* $scope.response.numeric =  $scope.lowRange + Math.floor(0.5*($scope.highRange - $scope.lowRange)); */
        }
    }
        
});