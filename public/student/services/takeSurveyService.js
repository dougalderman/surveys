angular.module('surveys')
.service('takeSurveyService', function( $http ) {
      
     /* this.getSurvey = function(type) {
    	return $http({
            method: 'GET',
            url: '/api/survey/' + type
        });
    }; */
    
    // Staged data from json below:
     this.getSurvey = function(type) {
    	return $http({
            method: 'GET',
            url: 'student/data/takeSurvey.json'
        });
    };
    
});