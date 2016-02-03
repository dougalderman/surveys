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
    .state('createTemplate', {
		url: '/admin/createTemplate',
		templateUrl: 'admin/views/createTemplate.html',
		controller: 'createTemplateCtrl'
	})
    .state('sendSurvey', {
		url: '/admin/sendSurvey',
		templateUrl: 'admin/views/sendSurvey.html',
		controller: 'sendSurveyCtrl'
	})
    .state('viewResults', {
		url: '/admin/viewResults',
		templateUrl: 'admin/views/viewResults.html',
		controller: 'viewResultsCtrl'
	})
    .state('updateTopics', {
		url: '/admin/updateTopics',
		templateUrl: 'admin/views/updateTopics.html',
		controller: 'updateTopicsCtrl'
	})
   

	$urlRouterProvider.otherwise('/student');

});