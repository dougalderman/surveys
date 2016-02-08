angular.module('surveys')
.controller('viewResultsCtrl', function($scope, surveys, templateSurveyService) {
    
    $scope.surveys = surveys;
    $scope.userReportData = [];
    $scope.q_a_columns = [];
    $scope.q_a_data = [];
      
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
        columnDefs: [
          {field: 'first_name', displayName: 'First Name', enableHiding: false},
          {field: 'last_name', displayName: 'Last Name', enableHiding: false},
          {field: 'took_survey',  displayName: 'Took Survey?', enableHiding: false}
        ]
    };
    
    $scope.q_a_options = {
        data: 'q_a_data',
        showGridFooter: true,
        showColumnFooter: true
       };
     
    $scope.loadSurveyResults = function() {
        templateSurveyService.getSurveyResults($scope.survey._id)
        .then(function( response ) {
            console.log('in viewResultsCtrl');
            console.log('in loadSurveyResults');
            console.log('response', response);
            $scope.results = response.data;
            $scope.userReportData = templateSurveyService.loadUserReportData($scope.usersRequested, $scope.usersUntaken);
            console.log('userReportData', $scope.userReportData);
            $scope.q_a_columns = templateSurveyService.loadQAColumns($scope.survey, $scope.results);
            console.log('q_a_columns', $scope.q_a_columns);
            $scope.q_a_options.columnDefs = $scope.q_a_columns;
            $scope.q_a_data =  templateSurveyService.loadQAData($scope.survey, $scope.results);
            console.log('q_a_data', $scope.q_a_data); 
           
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