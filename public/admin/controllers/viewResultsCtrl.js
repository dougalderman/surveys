angular.module('surveys')
.controller('viewResultsCtrl', function($scope, surveys, templateSurveyService, authService, $state, materialSelect) {
    
       
    $scope.displaySurveys = [];
    for (var i = 0; i < surveys.length; i++) {
        var dateObject = new Date(surveys[i].dateSent);
        var date = (dateObject.getMonth() + 1) + '/' + dateObject.getDate() + '/' + dateObject.getFullYear(); 
        $scope.displaySurveys[i] = {};
        $scope.displaySurveys[i].nameDate = surveys[i].name + '___' + date;
        $scope.displaySurveys[i]._id = surveys[i]._id;
    }
    
    $scope.userReportData = [];
    $scope.q_a_columns = [];
    $scope.q_a_data = [];
      
    console.log('In viewResultsCtrl');
    console.log('surveys', surveys);
    
    $(document).ready(function() {
        window.setTimeout(function() {  // Need to delay execution of material_select to make sure Angular has 
                                        // updated the DOM.
            $('select').material_select();
        }, materialSelect.TIMEOUT);
    });
    
    $scope.adminLogout = function() {
        authService.logout()
        .then(function( response ) {
            console.log('in adminCtrl');
            console.log('in logout')
            console.log('response', response);
            if (response.status === 200) {
                $state.go('login', {
                    successRedirect: 'admin'
                });
            }
        }); 
    }
    
    $scope.user_report_options = {
        data: 'userReportData',
        showGridFooter: true,
        showColumnFooter: true,
        columnDefs: [
          {field: 'first_name', displayName: 'First Name', enableHiding: false, headerCellClass: 'grid_header'},
          {field: 'last_name', displayName: 'Last Name', enableHiding: false, headerCellClass: 'grid_header'},
          {field: 'took_survey',  displayName: 'Took Survey?', enableHiding: false, headerCellClass: 'grid_header', footerCellTemplate: templateSurveyService.getYesNoFooterCellTemplate(), aggregationType: templateSurveyService.calculateYesCount}
        ]
    };
    
    $scope.q_a_options = {
        data: 'q_a_data',
        showGridFooter: true,
        showColumnFooter: true,
        exporterCsvFilename: 'surveyData.csv',
        enableGridMenu: true,
        exporterMenuPdf: false
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
    
    
    $scope.loadUsersSentTo = function() {
        templateSurveyService.getSurveyUsersSentTo($scope.survey._id)
        .then(function( response ) {
            console.log('in viewResultsCtrl');
            console.log('in loadUsersSentTo');
            console.log('response', response);
            $scope.usersRequested = response.data;
            $scope.loadUsersUntaken();
        }); 
    };
    
    $scope.loadTopic = function() {
        templateSurveyService.getTopic($scope.survey.topic)
        .then(function( response ) {
            console.log('in viewResultsCtrl');
            console.log('in loadTopic');
            console.log('response', response);
            $scope.topic = response.data;
            $scope.loadUsersSentTo();
        }); 
    };
    
    $scope.loadSelectedSurvey = function() {
        console.log('selectedSurvey = ', $scope.selectedSurvey);
        templateSurveyService.getSurvey($scope.selectedSurvey._id)
        .then(function( response ) {
            console.log('in viewResultsCtrl');
            console.log('in loadSelectedSurvey');
            console.log('response', response);
            $scope.survey = response.data;
            $scope.loadTopic();
        }); 
    };
   
});