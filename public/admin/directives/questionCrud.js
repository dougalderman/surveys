angular.module('surveys')
.directive('questionCrud', function() {
    return {
        restrict: 'E',
        templateUrl: 'admin/views/questionCrud.html', 
        /*scope: {
           
        }, */
        controller: function($scope) {
            $(document).ready(function() {
        
                $('select').material_select();
        
            });
            
             $scope.updateQuestionType = function() {
                $scope.template.questionType  = $('#choose_question_type').val();
                console.log('questionType = ', $scope.template.questionType);
            };
        }
    }
        
});