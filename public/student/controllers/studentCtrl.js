angular.module('surveys')
.controller('studentCtrl', function(takeSurveyService, $scope, auth, authService, $stateParams, $state, $location, $anchorScroll) {
    console.log('auth', auth);
    console.log('$stateParams = ', $stateParams);
    
    $(document).ready(function() {
        if ($stateParams.toastMessage) 
             Materialize.toast($stateParams.toastMessage, 4000);
    });
    
    $scope.gotoTop = function() {
        // set the location.hash to the id of
        // the element you wish to scroll to.
        $location.hash('top');  // top of body

        // call $anchorScroll()
        $anchorScroll();
    };
    
        
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
  
    $scope.gotoTop();
    
    $scope.loadUntakenSurveys();
    
      
});
