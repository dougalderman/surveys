angular.module('surveys')
.service('takeSurveyService', function( $http ) {
      
     /* this.getSurvey = function(surveyId) {
    	return $http({
            method: 'GET',
            url: '/api/surveys/' + surveyId
        });
    }; */
    
    // Staged data from json below:
     this.getSurvey = function(type) {
    	return $http({
            method: 'GET',
            url: 'student/data/survey1.json'
        });
    };
    
    /* this.writeSurveyResults = function(data) {
    	return $http({
            method: 'POST',
            url: '/api/surveys/',
            body: data
        });
    }; */
    
});