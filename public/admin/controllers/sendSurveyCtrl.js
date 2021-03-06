angular.module('surveys')
.controller('sendSurveyCtrl', function($scope, templates, topics, templateSurveyService, authService, $state, materialSelect) {
    
    
    $scope.templates = templates;
    $scope.topics = topics;
    $scope.template = {};
    $scope.template.questions = [];
    $scope.var_names = [];
    $scope.var_values = [];
    $scope.varsCompiled = false;
    $scope.survey = {};
    $scope.previewSelected = false;
    
        
    console.log('In sendSurveyCtrl');
    console.log('templates', $scope.templates);
    console.log('topics', $scope.topics);
    
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
    
    $scope.previewSurvey = function() {
        $scope.prevSurvey = {};
        $scope.previewSelected = true;
        console.log('in previewSurvey');
        console.log('survey before compileVariables', $scope.survey);
        $scope.prevSurvey = templateSurveyService.compileVariables($scope.survey, $scope.var_names, $scope.var_values);
        console.log('prevSurvey after compileVariables', $scope.prevSurvey);
        $scope.varsCompiled = true;

    };
    
    $scope.writeSurvey = function() {
        templateSurveyService.writeNewSurvey($scope.newSurvey)
        .then(function( response ) {
            console.log('in writeSurvey');
            console.log('response', response);
            if (response.status === 200) {
                $state.go('admin', {
                    toastMessage: 'Survey Successfully Sent'
                });
            }        
        })
        .catch(function(err) {
            console.error('err = ', err);
            $scope.errorMsg = 'Error in Sending Survey'
        });
    };
      
    $scope.processForm = function() {
        $scope.newSurvey = {};
        console.log('in processForm');
        console.log('survey before compileVariables', $scope.survey);
        $scope.newSurvey = templateSurveyService.compileVariables($scope.survey, $scope.var_names, $scope.var_values);
        console.log('survey after compileVariables', $scope.newSurvey);
        $scope.newSurvey.dateSent = new Date();
        console.log('survey before writing to database', $scope.newSurvey);
        $scope.writeSurvey();
    };
       
    
});