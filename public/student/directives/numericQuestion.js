angular.module('surveys')
.directive('numericQuestion', function() {
    return {
        restrict: 'E',
        templateUrl: 'student/views/numericQuestion.html', 
        scope: {
            lowRange: '=',
            highRange: '=',
            required: '=',
            questionIndex: '@',
            questionText: '@',
            questionType: '@',
            response: '='
        },
        link: function( scope, elem, attrs) {
            $( document ).ready(function(){
                 if (scope.questionType === 'numeric') {
                    scope.id = 'numeric_question' + scope.questionIndex;
                    console.log('id = ', scope.id);
                    console.log('elem = ') + console.log(elem);
                    console.log('attrs = ') + console.log(attrs);
                    $('#' + scope.id).attr({
                        "min" : scope.lowRange,
                        "max" : scope.highRange,        
                        "value" : scope.lowRange + 0.5*(scope.highRange - scope.lowRange)
                    });
                }
             
            });
            
        },
        controller: function($scope) {
              /*      console.log('questionIndex: ', $scope.questionIndex);
                console.log('lowRange', $scope.lowRange);
                console.log('highRange', $scope.highRange); 
                if ($scope.questionType === 'numeric') {
                    console.log('typeof lowRange = ' + typeof $scope.lowRange);
                    $scope.id = 'numeric_question' + $scope.questionIndex;
                    console.log('id = ', $scope.id);
                    var elem = document.getElementById($scope.id);
                    elem.min = $scope.lowRange;
                    elem.max = $scope.highRange;
                    //elem.value = $scope.lowRange + 0.5*($scope.highRange - $scope.lowRange);
                    elem.value = 3;
                } 
            }); */
        }
    }
        
});