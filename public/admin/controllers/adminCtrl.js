angular.module('surveys')
.controller('adminCtrl', function($scope, $stateParams, $state, authService) {
    
    console.log('$stateParams = ', $stateParams);
   
    $(document).ready(function() {
        if ($stateParams.toastMessage) 
            Materialize.toast($stateParams.toastMessage, 4000);
    });
   
    
    $scope.adminLogout = function() {
        authService.logout()
        .then(function( response ) {
            console.log('in adminCtrl');
            console.log('in logout')
            console.log('response', response);
            if (response.status === 200) {
                $state.go('login', {
                    successRedirect: 'admin'
                });
            }
        }); 
    }
});