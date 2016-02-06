angular.module('surveys')
.service('templateSurveyService', function( $http ) {
   // CRUD 
    
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
    
    this.updateTemplate = function(id, data) {
    	return $http({
            method: 'PUT',
            url: '/api/admin/templates/:id',
            data: data
        });
    }; 
    
    this.writeNewTemplate = function(data) {
    	return $http({
            method: 'POST',
            url: '/api/admin/templates/',
            data: data
        });
    }; 
    
      /* this.getAllTopicNames = function() {
    	return $http({
            method: 'GET',
            url: '/api/admin/topics/' 
        });
    }; */
    
    // Staged data from json below:
    this.getAllTopicNames = function(type) {
    	return $http({
            method: 'GET',
            url: 'admin/data/topicNames.json'
        });
     };
    
    this.writeNewSurvey = function(data) {
    	return $http({
            method: 'POST',
            url: '/api/admin/surveys/',
            data: data
        });
    }; 
    
    /* this.checkForUsers = function(cohortId) {
    	return $http({
            method: 'GET',
            url: '/api/admin/surveys?cohort=' + cohortId,
        });
    };  */
    this.checkForUsers = function(cohortId) {
    	return $http({
            method: 'GET',
            url: '/admin/data/usersInCohort.json',
        });
    };
    
    
// Non-CRUD    
    
    this.findMatch = function(str) { // look for $$something$$
        var regex = /\$\$(.*?)\$\$/g;
        var resultArr = [];
        var arr = regex.exec(str);
        while (arr !== null) {
            resultArr.push(arr[1]);
            arr = regex.exec(str);
        }
            
        return resultArr;
    }
    
    this.removeDuplicates = function(arr) {
        
        var uniqueArray = [];
        $.each(arr, function(i, el){
            if($.inArray(el, uniqueArray) === -1) uniqueArray.push(el);
        });
        
        return uniqueArray;
    }
    
    this.checkForVars = function(survey) {
        var arrayOfVars = [];
        
        console.log('In checkForVars');
        console.log('survey', survey);
        
        var match = this.findMatch(survey.name);
        if (match) {
             for (var i = 0; i < match.length; i++) {
                arrayOfVars.push(match[i]);
             }
        } 
        var match = this.findMatch(survey.description);
        if (match) {
             for (var i = 0; i < match.length; i++) {
                arrayOfVars.push(match[i]);
             }
        }
        for (var i = 0; i < survey.questions.length; i++) {
            var match = this.findMatch(survey.questions[i].questionText);
            if (match) {
                 for (var j = 0; j < match.length; j++) {
                    arrayOfVars.push(match[j]);
                 }
            }
        }
        return this.removeDuplicates(arrayOfVars);
    }; 
    
    this.compileVariables = function(survey, varNames, varValues) {
        var arrayOfVars = [];
        var newSurvey = {};
        
//        for (var p in survey) {
//            newSurvey[p] = survey[p]
//        }
        
        newSurvey = JSON.parse(JSON.stringify(survey));
        
      
        console.log('In compileVariables');
       
        console.log('varNames', varNames);
        console.log('varValues', varValues);
        
        if (varNames && varValues) {
            for (var i = 0; i < varNames.length; i++) {
                var regexstring = '\\$\\$' + varNames[i] + '\\$\\$';
                var regexp = new RegExp(regexstring, 'g');
                newSurvey.name = newSurvey.name.replace(regexp, varValues[i]);
                newSurvey.description = newSurvey.description.replace(regexp, varValues[i]);
                 for (var j = 0; j < newSurvey.questions.length; j++) {
                     newSurvey.questions[j].questionText = newSurvey.questions[j].questionText.replace(regexp, varValues[i])
                 }
            }
        }
            
        return newSurvey;
    }; 
    
});