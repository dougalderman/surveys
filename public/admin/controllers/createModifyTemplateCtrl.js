angular.module('surveys')
.controller('createModifyTemplateCtrl', function($scope, templates, templateService) {
    
    $scope.templates = templates;
    console.log($scope.templates);
    
    $(document).ready(function() {
        
        $('select').material_select();
        
     });
   
   /* $scope.readAllTemplateNames = function() {
        templateService.getAllTemplateNames()
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
        templateService.getTemplate($scope.selectedTemplate._id)
    };

    $scope.processForm = function() {

    };
    
    //$scope.readAllTemplateNames();
    
    
   
});