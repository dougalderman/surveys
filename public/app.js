angular.module('surveys', ['ui.router', 'ui.grid', 'ui.grid.resizeColumns', 'ui.grid.exporter'])
.constant('materialSelect', {TIMEOUT: 100}) // timeout in ms for material_select() to be called for select dropdowns
.config(function( $stateProvider, $urlRouterProvider ) {

	$stateProvider
	.state('student', {
		url: '/student',
		templateUrl: 'student/views/student.html',
        params : {
            toastMessage: ''
        },
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
                    $state.go('login', {
                        successRedirect: 'student'
                    });
                });
            }
        }
    })
    .state('takeSurvey', {
		url: '/student/take_survey',
		templateUrl: 'student/views/takeSurvey.html',
        controller: 'takeSurveyCtrl',
        params : {
            surveyId: ''
        },
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
                    $state.go('login', {
                        successRedirect: 'student'
                    });
                });
            }
        }
    })
	.state('admin', {
		url: '/admin',
		templateUrl: 'admin/views/admin.html',
		controller: 'adminCtrl',
        params : {
            toastMessage: ''
        },
        resolve: {
            auth: function(authService, $state) {
                return authService.checkForAdminAuth()
                .then(function( response ) {
                    return response.data;
                })
                .catch(function(err) {
                    // For any error, send them back to admin login screen.     
                    console.error('err = ', err);
                    if (err.status === 403) { //  if unauthorized
                        $state.go('student')
                    }
                    else { 
                        $state.go('login', {
                            successRedirect: 'admin'
                        });
                    }
                });
            }
        } 
	})
    .state('createModifyTemplate', {
		url: '/admin/create_modify_template',
		templateUrl: 'admin/views/createModifyTemplate.html',
		controller: 'createModifyTemplateCtrl',
        resolve: {
            templates: function(templateSurveyService, $state) {
                return templateSurveyService.getAllTemplateNames()
                .then(function( response ) {
                     return response.data;
                })
                .catch(function(err) {
                     // For any error, send them back to admin login screen.     
                    console.error('err = ', err);
                    if (err.status === 403) { //  if unauthorized
                        $state.go('student')
                    }
                    else { 
                        $state.go('login', {
                            successRedirect: 'createModifyTemplate'
                        });
                    }
                });
            }
        } 
	})
    .state('sendSurvey', {
		url: '/admin/send_survey',
		templateUrl: 'admin/views/sendSurvey.html',
		controller: 'sendSurveyCtrl',
        resolve: {
            templates: function(templateSurveyService, $state) {
                return templateSurveyService.getAllTemplateNames()
                .then(function( response ) {
                     return response.data;
                })
                .catch(function(err) {
                     // For any error, send them back to admin login screen.     
                    console.error('err = ', err);
                    if (err.status === 403) { //  if unauthorized
                        $state.go('student')
                    }
                    else { 
                        $state.go('login', {
                            successRedirect: 'sendSurvey'
                        });
                    }
                });
            },
            topics: function(templateSurveyService, $state) {
                return templateSurveyService.getAllTopicNames()
                .then(function( response ) {
                     return response.data;
                })
                .catch(function(err) {
                     // For any error, send them back to admin login screen.     
                    console.error('err = ', err);
                });
            }
        } 
	})
    .state('viewResults', {
		url: '/admin/view_results',
		templateUrl: 'admin/views/viewResults.html',
        controller: 'viewResultsCtrl',
        resolve: {
            surveys: function(templateSurveyService, $state) {
                return templateSurveyService.getAllSurveyNamesAndDates()
                .then(function( response ) {
                     return response.data;
                })
                .catch(function(err) {
                     // For any error, send them back to admin login screen.     
                    console.error('err = ', err);
                    if (err.status === 403) { //  if unauthorized
                        $state.go('student')
                    }
                    else { 
                        $state.go('login', {
                            successRedirect: 'viewResults'
                        });
                    }
                });
            }
        } 
		
	})
    .state('login', {
		url: '/login',
		templateUrl: 'auth/views/login.html',
        params : {
            toastMessage: '',
            successRedirect: ''
        },
		controller: 'loginCtrl'
    })
    .state('signup', {
		url: '/signup',
		templateUrl: 'auth/views/signup.html',
		controller: 'signupCtrl'
    })
    $urlRouterProvider.otherwise('/student');

});