angular.module('surveys')
.controller('viewResultsCtrl', function($scope, surveys, templateSurveyService) {
    
    $scope.surveys = surveys;
      
    console.log('In viewResultsCtrl');
    console.log('surveys', $scope.surveys);
    
    $(document).ready(function() {
        window.setTimeout(function() {  // Need to delay execution of material_select to make sure Angular has 
                                        // updated the DOM.
            $('select').material_select();
        }, 100);
     });
    
     $scope.loadSurveyResults = function() {
        templateSurveyService.getSurveyResults($scope.survey._id)
        .then(function( response ) {
            console.log('in viewResultsCtrl');
            console.log('in loadSurveyResults');
            console.log('response', response);
            $scope.results = response.data;
        }); 
    };
    
    
    $scope.loadUsers = function() {
        templateSurveyService.getSurveyUsers($scope.survey._id)
        .then(function( response ) {
            console.log('in viewResultsCtrl');
            console.log('in loadUsers');
            console.log('response', response);
            $scope.users = response.data;
            $scope.loadSurveyResults();
        }); 
    };
    
    $scope.loadSelectedSurvey = function() {
        console.log('selectedSurvey', $scope.selectedSurvey);
        templateSurveyService.getSurvey($scope.selectedSurvey._id)
        .then(function( response ) {
            console.log('in viewResultsCtrl');
            console.log('in loadSelectedSurvey');
            console.log('response', response);
            $scope.survey = response.data;
            $scope.loadUsers();
        }); 
    };
   
});