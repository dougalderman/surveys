angular.module('surveys')
.controller('createModifyTemplateCtrl', function($scope, templates, templateSurveyService, authService, $state, materialSelect) {
    
    $scope.templates = templates;
    $scope.template = {};
    $scope.template.questions = [];
    $scope.quest_types = 
    [
        'numeric',
        'boolean',
        'text'
    ];
    
    $scope.questionIndex = 0;
      
    console.log('In createModifyTemplateCtrl');
    console.log('templates', $scope.templates);
    
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
            console.log('in createModifyTemplateCtrl');
            console.log('in loadSelectedResponse');
            console.log('response', response);
            $scope.template = response.data;
            $scope.selectedTemplateName = $scope.template.name // save name to compare with name at submit
        }); 
    };
    
    $scope.addNewQuestion = function() {
        
        console.log('createModifyTemplateCtrl');
        console.log('in addNewQuestion()');
        $scope.template.questions.push(
            {
                "questionText" :  "",
                "type" : "",
                "required" : false,
            }
       );
       
       
    };
    
    $scope.deleteQuestion = function(indx) {
        $scope.template.questions.splice(indx, 1);
    }
    
    $scope.updateExistingTemplate = function() {
        console.log('update template')
        templateSurveyService.updateTemplate($scope.template._id, $scope.template)
        .then(function( response ) {
            console.log('in createModifyTemplateCtrl');
            console.log('in processForm')
            console.log('response', response);
            if (response.status === 200) {
                $state.go('admin', {
                    toastMessage: 'Template Successfully Updated'
                });
            }
        })
        .catch(function(err) {
            console.error('err = ', err);
            $scope.errorMsg = 'Error in Creating Template'
        });
    } 

    $scope.processForm = function() {
        console.log('in processForm');
        console.log('template', $scope.template);
        if ($scope.selectedTemplateName === $scope.template.name) { // if haven't changed name
             $('#confirm_modal').openModal();
        } 
        else {  // new template
            console.log('new template');
            if ($scope.template._id)
                delete $scope.template._id; // delete id in case user modifies template and changes name.
            
            templateSurveyService.writeNewTemplate($scope.template)
            .then(function( response ) {
                console.log('in createModifyTemplateCtrl');
                console.log('in processForm')
                console.log('response', response);
                if (response.status === 200) {
                    $state.go('admin', {
                        toastMessage: 'Template Successfully Created'
                    });
                }
            })
            .catch(function(err) {
                console.error('err = ', err);
                $scope.errorMsg = 'Error in Creating Template';
            });
        }    
    };
    
    
});