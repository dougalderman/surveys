angular.module('surveys')
.service('templateService', function( $http ) {
    /* this.getAllTemplateNames = function() {
    	return $http({
            method: 'GET',
            url: '/api/admin/templates/' 
        });
    }; */
    
    // Staged data from json below:
     this.getAllTemplateNames = function(type) {
    	return $http({
            method: 'GET',
            url: 'admin/data/templateNames.json'
        });
    };
    
    /* this.getTemplate = function(id) {
    	return $http({
            method: 'GET',
            url: '/api/admin/templates/id' 
        });
    }; */
    
    // Staged data from json below:
     this.getTemplate = function(id) {
    	return $http({
            method: 'GET',
            url: 'admin/data/nickJonesTemplate.json'
        });
    };
});