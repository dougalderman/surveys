angular.module('surveys')
.directive('textQuestion', function() {
    return {
        restrict: 'E',
        templateUrl: 'student/views/textQuestion.html', 
        scope: {
        /*    title: '@',
            autoSubmit: '=', */
        },
        controller: function($scope) {
        }
    }
        
});