angular.module('surveys')
.directive('textQuestion', function() {
    return {
        restrict: 'E',
        templateUrl: 'student/views/textQuestion.html', 
        scope: {
            required: '=',
            questionIndex: '@',
            questionText: '@',
            questionType: '@',
            response: '=',
            notAnswered: '='
        },
        controller: function($scope) {
           
        }
    }
        
});