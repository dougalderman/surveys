angular.module('surveys')
.directive('previewSurvey', function() {
    return {
        restrict: 'E',
        templateUrl: 'admin/views/previewSurvey.html', 
        scope: {
            surveyName: '@',
            surveyDescription: '@',
            surveyTopic: '@',
            surveyQuestions: '='
        }
    }
        
});