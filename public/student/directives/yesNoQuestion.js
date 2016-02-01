angular.module('surveys')
.directive('yesNoQuestion', function() {
    return {
        restrict: 'E',
        templateUrl: 'student/views/yesNoQuestion.html', 
        scope: {
        /*    title: '@',
            autoSubmit: '=', */
        },
        controller: function($scope) {
        }
    }
        
});