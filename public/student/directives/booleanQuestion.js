angular.module('surveys')
.directive('booleanQuestion', function() {
    return {
        restrict: 'E',
        templateUrl: 'student/views/booleanQuestion.html', 
        scope: {
            required: '=',
            questionIndex: '@',
            questionText: '@',
            questionType: '@',
            response: '=',
            notAnswered: '=',
            borderOnYes: '=',
            borderOnNo: '='
        },
        controller: function($scope) {
            
            $scope.handleBooleanAnswer = function(answer, indx) { 
                $scope.response.booleanAnswer = answer;
                if (answer) {
                    $scope.borderOnYes[indx] = true;
                    $scope.borderOnNo[indx] = false;
                }
                else {
                    $scope.borderOnNo[indx] = true;
                    $scope.borderOnYes[indx] = false;
                }
            } 
        }
    }
});