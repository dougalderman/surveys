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
            url: 'admin/data/variableNameTemplate.json'
        });
    };
    
    this.updateTemplate = function(id, data) {
    	return $http({
            method: 'PUT',
            url: '/api/admin/templates/:id',
            data: data
        });
    }; 
    
    this.writeNewTemplate = function(id, data) {
    	return $http({
            method: 'POST',
            url: '/api/admin/templates/',
            data: data
        });
    }; 
    
    this.findMatch = function(str) {
        var regex = /\$\$(.*?)\$\$/;
        var match = regex.exec(str);
        return match;
    }
    
    this.removeDuplicates = function(arr) {
        
        var uniqueArray = [];
        $.each(arr, function(i, el){
            if($.inArray(el, uniqueArray) === -1) uniqueArray.push(el);
        });
        
        return uniqueArray;
    }
    
    this.checkForVars = function(template) {
        var arrayOfVars = [];
        
        console.log('In checkForVars');
        console.log('template', template);
        
        var match = this.findMatch(template.name);
        if (match) {
             arrayOfVars.push(match[1]);
        }
        var match = this.findMatch(template.description);
        if (match) {
             arrayOfVars.push(match[1]);
        }
        for (var i = 0; i < template.questions.length; i++) {
            var match = this.findMatch(template.questions[i].questionText);
            if (match) {
                 arrayOfVars.push(match[1]);
            }
        }
        return this.removeDuplicates(arrayOfVars);
    }; 
    
});