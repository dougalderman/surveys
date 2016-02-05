angular.module('surveys')
.controller('sendSurveyCtrl', function($scope, templates, templateService) {
    
    
    $scope.templates = templates;
    $scope.template = {};
    $scope.template.questions = [];
    $scope.vars = [];
    $scope.survey = {};
    
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
        templateService.getTemplate($scope.selectedTemplate._id)
        .then(function( response ) {
            console.log('in createModifyTemplateCtrl');
            console.log('in loadSelectedResponse');
            console.log('response', response);
            $scope.template = response.data;
            // Initialize name and description to template name and desc
            // $scope.survey.name = $scope.template.name
            // $scope.survey.description = $scope.survey.description
            
            // Find variables in name, description, and questions
            $scope.vars = templateService.checkForVars($scope.template);
            console.log('$scope.vars', $scope.vars);
        }); 
    };
    
            
    $scope.processForm = function() {
        console.log('in processForm');
        console.log('survey', $scope.survey);
        

    };
    
   
    
});