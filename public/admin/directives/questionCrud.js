angular.module('surveys')
.directive('questionCrud', function() {
    return {
        restrict: 'E',
        templateUrl: 'admin/views/questionCrud.html', 
        scope: {
            question: '=',
            questionTypes: '=',
            deleteQuestion: '&',
            questionIndex: '='
        }, 
        controller: function($scope) {
            $(document).ready(function() {
                window.setTimeout(function() {  // Need to delay execution of material_select to make sure Angular has 
                                        // updated the DOM.
                    $('select').material_select();
                }, 100);
            });
                        
                    
            $scope.updateQuestionType = function() {
                // $scope.question.type  = $('#choose_question_type').val();
                // console.log('question type = ', $scope.question.type);
            };
            
        }
    }
        
});