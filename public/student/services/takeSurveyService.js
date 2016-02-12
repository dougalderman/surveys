angular.module('surveys')
.service('takeSurveyService', function( $http ) {
      
      
     this.getUntaken = function(studentId) {
    	return $http({
            method: 'GET',
            url: '/api/surveys/untaken/' + studentId
        });
     } 
    
    this.getSurvey = function(surveyId) {
    	return $http({
            method: 'GET',
            url: '/api/surveys/' + surveyId
        });
     }
    
    // Staged data from json below:
    /* this.getSurvey = function(type) {
    	return $http({
            method: 'GET',
            url: 'student/data/survey1.json'
        });
    }; */
    
    this.writeSurveyResults = function(data) {
    	return $http({
            method: 'POST',
            url: '/api/surveys/results',
            data: data
        });
    };
    
    
    /* this.deleteFromUntakenSurveys = function(surveyId, studentId) {
    	return $http({
            method: 'DELETE',
            url: '/api/surveys/untaken/surveyId?_id=' + studentId,
        });
    };*/
    
});