angular.module('surveys', ['ui.router'])

.config(function( $stateProvider, $urlRouterProvider ) {

	$stateProvider
	.state('student', {
		url: '/student',
		templateUrl: 'student/views/student.html',
        
	})
    .state('takeSurvey', {
		url: '/student/takeSurvey',
		templateUrl: 'student/views/takeSurvey.html',
        controller: 'takeSurveyCtrl'
	})
	.state('admin', {
		url: '/admin',
		templateUrl: 'admin/views/admin.html',
		controller: 'adminCtrl'
	})
   

	$urlRouterProvider.otherwise('/student');

});