angular.module('surveys')
.directive('questionCrud', function(materialSelect) {
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
                }, materialSelect.TIMEOUT);
            });
                        
                    
            $scope.updateQuestionType = function() {
                
            };
            
        }
    }
        
});