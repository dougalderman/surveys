angular.module('surveys')
.directive('numericQuestion', function() {
    return {
        restrict: 'E',
        templateUrl: 'student/views/numericQuestion.html', 
        scope: {
        /*    title: '@',
            autoSubmit: '=', */
        },
        controller: function($scope) {
        }
    }
        
});