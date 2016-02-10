angular.module('surveys')
.service('templateSurveyService', function( $http, uiGridConstants) {
   // CRUD 
    
    this.getAllTemplateNames = function() {
    	return $http({
            method: 'GET',
            url: '/api/admin/templates/' 
        });
    }; 
    
    // Staged data from json below:
    /* this.getAllTemplateNames = function() {
    	return $http({
            method: 'GET',
            url: 'admin/data/templateNames.json'
        });
     }; */
    
     this.getTemplate = function(id) {
    	return $http({
            method: 'GET',
            url: '/api/admin/templates/' + id 
        });
    }; 
    
    // Staged data from json below:
    /* this.getTemplate = function(id) {
    	return $http({
            method: 'GET',
            url: 'admin/data/nickJonesTemplate.json'
        });
    }; */
    
    this.updateTemplate = function(id, data) {
    	return $http({
            method: 'PUT',
            url: '/api/admin/templates/' + id,
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
    
    this.getAllTopicNames = function() {
    	return $http({
            method: 'GET',
            url: '/api/admin/topics/' 
        });
    }; 
    
    // Staged data from json below:
    /* this.getAllTopicNames = function() {
    	return $http({
            method: 'GET',
            url: 'admin/data/topicNames.json'
        });
     }; */
    
     /* this.checkForUsersInCohort = function(cohortId) {
    	return $http({
            method: 'GET',
            url: '/api/admin/users/cohort/' + cohortId,
        });
    };  */
    
    this.writeNewSurvey = function(data) {
    	return $http({
            method: 'POST',
            url: '/api/admin/surveys/',
            data: data
        });
    }; 
    
    /* this.updateSurveyUsers = function(survey_id, cohort_id) {
    	return $http({
            method: 'PUT',
            url: '/api/admin/surveys/' + survey_id + '?cohort=' + cohort_id,
        });
    }; */
    
    // Staged data from json below:
    /* this.checkForUsers = function(cohortId) {
    	return $http({
            method: 'GET',
            url: '/admin/data/usersInCohort.json',
        });
    }; */
    
    this.getAllSurveyNames = function() {
    	return $http({
            method: 'GET',
            url: '/api/admin/surveys/' 
        });
    }; 
    
    // Staged data from json below:
    /* this.getAllSurveyNames = function() {
    	return $http({
            method: 'GET',
            url: 'admin/data/surveyNames.json'
        });
     }; */
    
    this.getSurvey = function(id) {
    	return $http({
            method: 'GET',
            url: '/api/admin/surveys/' + id 
        });
    }; 
    
    // Staged data from json below:
    /* this.getSurvey = function() {
    	return $http({
            method: 'GET',
            url: 'admin/data/survey1.json'
        });
     }; */
    
    this.getTopic = function(topic_id) {
    	return $http({
            method: 'GET',
            url: '/api/admin/topics?_id='+topic_id 
        });
    }; 
    
    this.getSurveyUsersRequested = function(survey_id) {
        return $http({
            method: 'GET',
            url: '/api/admin/users/requested_surveys/' + survey_id 
        });
    }; 
    
    // Staged data from json below:
    /* this.getSurveyUsersRequested = function(survey_id) {
    	return $http({
            method: 'GET',
            url: 'admin/data/usersRequested.json'
        });
     }; */
    
    this.getSurveyUsersUntaken = function(survey_id) {
        return $http({
            method: 'GET',
            url: '/api/admin/users/untaken_surveys/' + survey_id 
        });
    }; 
    
    // Staged data from json below:
    /* this.getSurveyUsersUntaken = function(survey_id) {
    	return $http({
            method: 'GET',
            url: 'admin/data/usersUntaken.json'
        });
     }; */
    
    this.getSurveyResults = function(survey_id) {
        return $http({
            method: 'GET',
            url: '/api/admin/results/' + survey_id 
        });
    }; 
    
    // Staged data from json below:
    /* this.getSurveyResults = function(survey_id) {
    	return $http({
            method: 'GET',
            url: 'admin/data/results_51225.json'
        });
     }; */
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
    
    this.findWhoTookSurvey = function(users_requested, users_untaken) {
        userTookSurvey = [];
        users_requested.forEach(function(user, index, array) {
            var tookSurvey = true;
            users_untaken.forEach(function(us, ind, arr) {
                 if (user._id === us._id) {
                    tookSurvey = false;
                 }
            });
            if (tookSurvey) {
                userTookSurvey[index] = 'Yes';
            }
            else {
                userTookSurvey[index] = 'No';
            }
            
        });
        
        return userTookSurvey;
    }
    
    this.loadUserReportData = function(usersRequested, usersUntaken)     {
        var newArray = [];
        var tookSurvey = [];
        tookSurvey = this.findWhoTookSurvey(usersRequested, usersUntaken);
        for (var i = 0; i < usersRequested.length; i++) {
           
            newArray.push({
                'first_name' : usersRequested[i].first_name,
                'last_name'  : usersRequested[i].last_name,
                'took_survey': tookSurvey[i]
            });
        }
        
        return newArray;
    }
    
    this.getYesNoFooterCellTemplate = function() {
        return '<div class="ui-grid-cell-contents" col-index="renderIndex"> <div> Yes: {{col.getAggregationValue()}}</div> </div>';
    }
    
    this.calculateYesCount = function(visRows, self) {
        var yesCount = 0;
        var column_id = self.name;
        visRows.forEach(function(row, index, array) {
            if (row.entity[column_id] === 'Yes') {
                yesCount++;
            }
        });
        return yesCount;
    }
     
    this.loadQAColumns = function(survey, results)     {
        var newArray = [];
          
        /* newArray.push({
            field: 'column0',
            displayName: '',
            width: 80,
            enableHiding: false
        }); 
        
        for (var i = 1; i <= survey.questions.length; i++) {
            newArray.push({
                field: 'column' + i,
                displayName: survey.questions[i - 1].questionText,
                width: 120,
                headerTooltip: true,
                enableHiding: false
            });
        } */
        
        for (var i = 0; i < survey.questions.length; i++) {
            newArray.push({
                field: 'column' + i,
                displayName: survey.questions[i].questionText,
                /* width: 160, */
                headerTooltip: true,
                enableHiding: false
            });
            switch(survey.questions[i].type) {
                case 'numeric':
                    newArray[i].aggregationType = uiGridConstants.aggregationTypes.avg;
                    break;
                case 'boolean' :
                    /* newArray[i].footerCellTemplate = '<div class="ui-grid-cell-contents" col-index="renderIndex"> <div> True: {{col.getTrueCount()}}, False: {{col.getFalseCount()}}</div> </div>';
                    newArray[i].getTrueCount = function( aggregation, fieldValue, numValue ){
                        if ( typeof(aggregation.count) === 'undefined' ){
    aggregation.count = 0;
                        }
                        if ( typeof(aggregation.total) === 'undefined' ){
      aggregation.total = 0;
                        }
                        aggregation.count++;
                        if (fieldValue) { // if true
                            aggregation.total++;
                        }
                        return aggregation.total;
                    }; */
                    newArray[i].footerCellTemplate =  this.getYesNoFooterCellTemplate();
                    newArray[i].aggregationType = this.calculateYesCount;
                    break;
                case 'text' :
                    newArray[i].cellTooltip = true;
                    break;
            }
        } 
        
        return newArray;
    }
    
    /* this.sortByType = function(answers) {
        answers.sort(function(a, b) {
            if (a.type > b.type) {
                return 1;
             }
            if (a.type < b.type) {
                return -1;
            }
            // a must be equal to b
            return 0; 
        });
        return answers;
    }; */
      
    this.loadQAData = function(survey, results)     {
        var newArray = [];
        
        for (var i = 0; i < results.length; i++) {
            // results[i].answers = this.sortByType(results[i].answers);
            newArray[i] = {};
            for (var j = 0; j < results[i].answers.length; j++) {
                var columnId = 'column' + j;
                switch (results[i].answers[j].type) {
                    case 'numeric':
                        if (results[i].answers[j].hasOwnProperty('numericAnswer')) {
                            newArray[i][columnId] = results[i].answers[j].numericAnswer;
                        }
                        break;
                    case 'boolean':
                        if(results[i].answers[j].hasOwnProperty('booleanAnswer')) {
                            if (results[i].answers[j].booleanAnswer)
                                newArray[i][columnId] = 'Yes';
                            else
                                newArray[i][columnId] = 'No';
                        }
                        break; 
                    case 'text':
                        if (results[i].answers[j].hasOwnProperty('textAnswer')) {
                            newArray[i][columnId] = results[i].answers[j].textAnswer
                        }
                        break;    
                        
                }
            }
        } 
        
            
        return newArray;
    }; 
    
    
});