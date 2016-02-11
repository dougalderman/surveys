angular.module('surveys', ['ui.router', 'ui.grid', 'ui.grid.resizeColumns', 'ui.grid.exporter'])

.config(function( $stateProvider, $urlRouterProvider ) {

	$stateProvider
	.state('student', {
		url: '/student',
		templateUrl: 'student/views/student.html',
        
	})
    .state('takeSurvey', {
		url: '/student/take_survey',
		templateUrl: 'student/views/takeSurvey.html',
        controller: 'takeSurveyCtrl'
	})
	.state('admin', {
		url: '/admin',
		templateUrl: 'admin/views/admin.html',
		controller: 'adminCtrl',
        resolve: {
            auth: function(templateSurveyService) {
                return templateSurveyService.checkForAdminAuth()
                .then(function( response ) {
                     return response.data;
              }); 
            }
        } 
	})
    .state('createModifyTemplate', {
		url: '/admin/create_modify_template',
		templateUrl: 'admin/views/createModifyTemplate.html',
		controller: 'createModifyTemplateCtrl',
        resolve: {
            templates: function(templateSurveyService) {
                return templateSurveyService.getAllTemplateNames()
                .then(function( response ) {
                     return response.data;
              }); 
            }
        } 
	})
    .state('deleteTemplate', {
		url: '/admin/delete_template',
		templateUrl: 'admin/views/deleteTemplate.html',
		controller: 'deleteTemplateCtrl',
        resolve: {
            templates: function(templateSurveyService) {
                return templateSurveyService.getAllTemplateNames()
                .then(function( response ) {
                     return response.data;
              }); 
            }
        } 
	})
    .state('sendSurvey', {
		url: '/admin/send_survey',
		templateUrl: 'admin/views/sendSurvey.html',
		controller: 'sendSurveyCtrl',
        resolve: {
            templates: function(templateSurveyService) {
                return templateSurveyService.getAllTemplateNames()
                .then(function( response ) {
                     return response.data;
              }); 
            }
        } 
	})
    .state('viewResults', {
		url: '/admin/view_results',
		templateUrl: 'admin/views/viewResults.html',
        controller: 'viewResultsCtrl',
        resolve: {
            surveys: function(templateSurveyService) {
                return templateSurveyService.getAllSurveyNamesAndDates()
                .then(function( response ) {
                     return response.data;
              }); 
            }
        } 
		
	})
    .state('updateTopics', {
		url: '/admin/update_topics',
		templateUrl: 'admin/views/updateTopics.html',
		controller: 'updateTopicsCtrl'
	})
    .state('login', {
		url: '/login',
		templateUrl: 'admin/views/login.html',
		controller: 'studentLoginCtrl'
	})
    .state('adminLogin', {
		url: '/admin/login',
		templateUrl: 'admin/views/login.html',
		controller: 'adminLoginCtrl'
	})
    .state('signup', {
		url: '/signup',
		templateUrl: 'admin/views/signup.html',
		controller: 'signupCtrl'
	})
   

	$urlRouterProvider.otherwise('/student');

});