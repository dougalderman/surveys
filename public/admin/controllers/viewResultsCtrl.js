angular.module('surveys')
.controller('viewResultsCtrl', function($scope, surveys, templateSurveyService) {
    
    $scope.surveys = surveys;
    $scope.userReportData = [];
      
    console.log('In viewResultsCtrl');
    console.log('surveys', $scope.surveys);
    
    $(document).ready(function() {
        window.setTimeout(function() {  // Need to delay execution of material_select to make sure Angular has 
                                        // updated the DOM.
            $('select').material_select();
        }, 100);
    });
    
    $scope.user_report_options = {
        data: 'userReportData',
        /* height: '110px', */
        /* rowHeight: 30, */
        columnDefs: [
          {field: 'first_name', displayName: 'First Name', enableHiding: false},
          {field: 'last_name', displayName: 'Last Name', enableHiding: false},
          {field: 'took_survey',  displayName: 'Took Survey?', enableHiding: false}
        ]
    };
            
    
    $scope.loadSurveyResults = function() {
        templateSurveyService.getSurveyResults($scope.survey._id)
        .then(function( response ) {
            console.log('in viewResultsCtrl');
            console.log('in loadSurveyResults');
            console.log('response', response);
            $scope.results = response.data;
            $scope.userReportData = templateSurveyService.loadUserReportGrid($scope.usersRequested, $scope.usersUntaken);
             console.log('userReportData', $scope.userReportData);
        }); 
    };

    $scope.loadUsersUntaken = function() {
        templateSurveyService.getSurveyUsersUntaken($scope.survey._id)
        .then(function( response ) {
            console.log('in viewResultsCtrl');
            console.log('in loadUsersUntaken');
            console.log('response', response);
            $scope.usersUntaken = response.data;
            $scope.loadSurveyResults();
        }); 
    };
    
    
    $scope.loadUsersRequested = function() {
        templateSurveyService.getSurveyUsersRequested($scope.survey._id)
        .then(function( response ) {
            console.log('in viewResultsCtrl');
            console.log('in loadUsersRequested');
            console.log('response', response);
            $scope.usersRequested = response.data;
            $scope.loadUsersUntaken();
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
            $scope.loadUsersRequested();
        }); 
    };
   
});