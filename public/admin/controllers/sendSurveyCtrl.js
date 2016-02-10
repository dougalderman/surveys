angular.module('surveys')
.controller('sendSurveyCtrl', function($scope, templates, templateSurveyService) {
    
    
    $scope.templates = templates;
    $scope.template = {};
    $scope.template.questions = [];
    $scope.var_names = [];
    $scope.var_values = [];
    $scope.varsCompiled = false;
    $scope.survey = {};
    $scope.previewSelected = false;
    
        
    console.log('In sendSurveyCtrl');
    console.log('templates', $scope.templates);
    
    $(document).ready(function() {
        window.setTimeout(function() {  // Need to delay execution of material_select to make sure Angular has 
                                        // updated the DOM.
            $('select').material_select();
        }, 100);
     });
   
       
    $scope.loadSelectedTemplate = function() {
        console.log('selectedTemplate', $scope.selectedTemplate);
        templateSurveyService.getTemplate($scope.selectedTemplate._id)
        .then(function( response ) {
            console.log('in sendSurveyCtrl');
            console.log('in loadSelectedResponse');
            console.log('response', response);
            $scope.survey = response.data;
            // Delete template Mongo Id so that it doesn't get saved as survey Mongo Id
            if ($scope.survey._id)
                delete $scope.survey._id;
            // Find variables in name, description, and questions
            $scope.var_names = templateSurveyService.checkForVars($scope.survey);
            console.log('$scope.var_names', $scope.var_names);
        }); 
    };
    
    $scope.loadTopicNames = function() {
        templateSurveyService.getAllTopicNames()
        .then(function( response ) {
            console.log('in sendSurveyCtrl');
            console.log('in loadTopicNames');
            console.log('response', response);
            $scope.topics = response.data;
        }); 
    };
    
    $scope.previewSurvey = function() {
        $scope.prevSurvey = {};
        $scope.previewSelected = true;
        console.log('in previewSurvey');
        console.log('survey before compileVariables', $scope.survey);
        $scope.prevSurvey = templateSurveyService.compileVariables($scope.survey, $scope.var_names, $scope.var_values);
        console.log('prevSurvey after compileVariables', $scope.prevSurvey);
        $scope.varsCompiled = true;

    };
    
    $scope.updateUserRecords = function() {
        templateSurveyService.updateSurveyUsers($scope.surveyId, $scope.newSurvey.cohortSentTo)
        .then(function(response) {
            console.log('in updateUserRecords');
            console.log('response = ' + response);
            // $state.go('admin');
        });
    };
    
    $scope.writeSurvey = function() {
        templateSurveyService.writeNewSurvey($scope.newSurvey)
        .then(function( response ) {
            console.log('in writeSurvey');
            console.log('response', response);
            $scope.surveyId = response.data._id;
            $scope.updateUserRecords();
        });
             
    };
      
    /* $scope.findUsersInCohort = function() {
        templateSurveyService.checkForUsersInCohort($scope.cohortId)
        .then(function( response ) {
            console.log('in findUsersInCohort');
            console.log('response', response);
            $scope.newSurvey.dateSent = new Date();
            $scope.sentTo = response.data;
            console.log('survey before writing to database', $scope.newSurvey);
            $scope.writeSurvey();
        });
    } */
    
    $scope.processForm = function() {
        $scope.newSurvey = {};
        console.log('in processForm');
        console.log('survey before compileVariables', $scope.survey);
        $scope.newSurvey = templateSurveyService.compileVariables($scope.survey, $scope.var_names, $scope.var_values);
        console.log('survey after compileVariables', $scope.newSurvey);
        $scope.newSurvey.dateSent = new Date();
        // $scope.findUsersInCohort();
        console.log('survey before writing to database', $scope.newSurvey);
        $scope.writeSurvey();
    };
       
    
    $scope.loadTopicNames();
    
});