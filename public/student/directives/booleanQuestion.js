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
        },
        controller: function($scope) {
            
             $scope.borderOnYes = [],
             $scope.borderOnNo = [];
                
             $scope.handleBooleanAnswer = function(answer, indx) { 
                $scope.response = answer;
                if (answer)
                    $scope.borderOnYes[indx] === true;
                else
                    $scope.borderOnNo[indx] === true;
            } 
        }
    }
});