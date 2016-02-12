angular.module('surveys', ['ui.router', 'ui.grid', 'ui.grid.resizeColumns', 'ui.grid.exporter'])

.config(function( $stateProvider, $urlRouterProvider ) {

	$stateProvider
	.state('student', {
		url: '/student',
		templateUrl: 'student/views/student.html',
        controller: 'studentCtrl',
        resolve: {
             auth: function(authService, $state, $stateParams) {
                return authService.checkForAuth()
                .then(function( response ) {
                    if (response.status === 200) {
                        return response.data;
                    }
                })
                .catch(function(err) {
                    // For any error, send them back to admin login screen.     
                    console.error('err = ', err);
                    $state.go('login');
                });
            }
        }
    })
    .state('takeSurvey', {
		url: '/student/take_survey',
		templateUrl: 'student/views/takeSurvey.html',
        controller: 'takeSurveyCtrl',
        resolve: {
            survey: function(takeSurveyService, $stateParams) {
                 return takeSurveyService.getSurvey($stateParams.survey_id)
                 .then(function( response ) {
                      return response.data;
                 })
                 .catch(function(err) {
                      // For any error, send them back to login screen.     
                     console.error('err = ', err);
                     $state.go('login');
                 });
            }
        }
	})
	.state('admin', {
		url: '/admin',
		templateUrl: 'admin/views/admin.html',
		controller: 'adminCtrl',
        resolve: {
            auth: function(authService) {
                return authService.checkForAdminAuth()
                .then(function( response ) {
                    return response.data;
                })
                .catch(function(err) {
                    // For any error, send them back to admin login screen.     
                    console.error('err = ', err);
                    $state.go('login');
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
                })
                .catch(function(err) {
                     // For any error, send them back to admin login screen.     
                    console.error('err = ', err);
                    $state.go('login');
                });
            }
        } 
	})
    /* .state('deleteTemplate', {
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
	}) */
    .state('sendSurvey', {
		url: '/admin/send_survey',
		templateUrl: 'admin/views/sendSurvey.html',
		controller: 'sendSurveyCtrl',
        resolve: {
            templates: function(templateSurveyService) {
                return templateSurveyService.getAllTemplateNames()
                .then(function( response ) {
                     return response.data;
                })
                .catch(function(err) {
                     // For any error, send them back to admin login screen.     
                    console.error('err = ', err);
                    $state.go('login');
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
                })
                .catch(function(err) {
                     // For any error, send them back to admin login screen.     
                    console.error('err = ', err);
                    $state.go('login');
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
		templateUrl: 'auth/views/login.html',
		controller: 'loginCtrl'
    })
    .state('signup', {
		url: '/signup',
		templateUrl: 'auth/views/signup.html',
		controller: 'signupCtrl'
    })
   

	$urlRouterProvider.otherwise('/student');

});