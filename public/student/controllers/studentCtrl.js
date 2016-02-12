angular.module('surveys')
.controller('studentCtrl', function(takeSurveyService, $scope, auth, authService, $stateParams, $state) {
    console.log('auth', auth);
    console.log('$stateParams = ', $stateParams);
        
    $scope.loadUntakenSurveys = function() {
        takeSurveyService.getUntaken(auth._id)
        .then(function( response ) {
            console.log('in studentCtrl');
            console.log('in loadUntakenSurveys')
            console.log('response', response);
            $scope.untakenSurveys = response.data;
        }); 
    }
    
    $scope.studentLogout = function() {
        authService.logout()
        .then(function( response ) {
            console.log('in studentCtrl');
            console.log('in logout')
            console.log('response', response);
            if (response.status === 200) {
                $state.go('login');
            }
        }); 
    }
    
    $scope.loadUntakenSurveys();
});
