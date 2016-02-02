angular.module('surveys')
.directive('booleanQuestion', function() {
    return {
        restrict: 'E',
        templateUrl: 'student/views/booleanQuestion.html', 
        scope: {
            required: '=',
            questionIndex: '@',
            questionText: '@',
            questionType: '@',
            response: '='
        },
        controller: function($scope) {
        }
    }
        
});