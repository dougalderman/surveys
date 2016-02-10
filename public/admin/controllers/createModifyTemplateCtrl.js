angular.module('surveys')
.controller('createModifyTemplateCtrl', function($scope, templates, templateSurveyService) {
    
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
        }, 100);
     });
   /* $scope.readAllTemplateNames = function() {
        templateSurveyService.getAllTemplateNames()
         .then(function( response ) {
            console.log('in createModifyTemplateCtrl');
            console.log('in readAllTemplateNames');
            console.log('response', response);
            $scope.templates = response.data;
            console.log('templates', $scope.templates)
        }); 

    }; */

       
    $scope.loadSelectedTemplate = function() {
        /* $scope.templateId  = $('#choose_template').val();
        console.log('templateId = ', $scope.templateId); */
       console.log('selectedTemplate', $scope.selectedTemplate);
        templateSurveyService.getTemplate($scope.selectedTemplate._id)
        .then(function( response ) {
            console.log('in createModifyTemplateCtrl');
            console.log('in loadSelectedResponse');
            console.log('response', response);
            $scope.template = response.data;
            $scope.selectedTemplateName = $scope.template.name // save name to compare with name at submit
            // $('select').material_select();
        }); 
    };
    
    $scope.addNewQuestion = function() {
        
        console.log('createModifyTemplateCtrl');
        console.log('in addNewQuestion()');
        /* var newElement = $compile('<question-crud question="question" question-types="quest_types" question-index="questionIndex + 1" delete-question="deleteQuestion(indx)">')($scope)
        $('#add_question_button').append(newElement); */
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

    $scope.processForm = function() {
        console.log('in processForm');
        console.log('template', $scope.template);
        if ($scope.selectedTemplateName === $scope.template.name) { // if haven't changed name
            var select = confirm("Confirm to overwrite existing template. If you want to create a new template, hit 'Cancel' and change template name before saving.");
            if (select === true) {
                console.log('update template')
                templateSurveyService.updateTemplate($scope.template._id, $scope.template);
                // then / catch for promise
                // $state.go(admin)
            }
        } 
        else {  // new template
            console.log('new template')
            if ($scope.template._id)
                delete $scope.template._id; // delete id in case user modifies template and changes name.
            
            templateSurveyService.writeNewTemplate($scope.template);
            // then / catch for promise
            // $state.go(admin)
        }
       
    };
    
    
});