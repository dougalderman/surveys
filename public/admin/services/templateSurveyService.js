angular.module('surveys')
.service('templateSurveyService', function( $http, uiGridConstants) {
   // CRUD 
    
    this.getAllTemplateNames = function() {
    	return $http({
            method: 'GET',
            url: '/api/admin/templates/' 
        });
    }; 
    
    this.getTemplate = function(id) {
    	return $http({
            method: 'GET',
            url: '/api/admin/templates/' + id 
        });
    }; 
    
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
    
    this.writeNewSurvey = function(data) {
    	return $http({
            method: 'POST',
            url: '/api/admin/surveys/',
            data: data
        });
    }; 
    
    this.getAllSurveyNamesAndDates = function() {
    	return $http({
            method: 'GET',
            url: '/api/admin/surveys/names_dates' 
        });
    }; 
    
    this.getSurvey = function(id) {
    	return $http({
            method: 'GET',
            url: '/api/admin/surveys/' + id 
        });
    }; 
    
    this.getTopic = function(topic_id) {
    	return $http({
            method: 'GET',
            url: '/api/admin/topics?_id='+topic_id 
        });
    }; 
    
    this.getSurveyUsersSentTo = function(survey_id) {
        return $http({
            method: 'GET',
            url: '/api/admin/surveys/sent_to/' + survey_id 
        });
    }; 
    
    this.getSurveyUsersUntaken = function(survey_id) {
        return $http({
            method: 'GET',
            url: '/api/admin/surveys/untaken/' + survey_id 
        });
    }; 
    
    this.getSurveyResults = function(survey_id) {
        return $http({
            method: 'GET',
            url: '/api/admin/results/' + survey_id 
        });
    }; 
    
    this.checkForAdminAuth = function(survey_id) {
        return $http({
            method: 'GET',
            url: '/api/admin/current_user'
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
    };
    
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
    };
    
    this.getYesNoFooterCellTemplate = function() {
        return '<div class="ui-grid-cell-contents" col-index="renderIndex"> <div> Yes: {{col.getAggregationValue()}}</div> </div>';
    };
    
    this.getNumericFooterCellTemplate = function() {
        return '<div class="ui-grid-cell-contents" col-index="renderIndex"> <div> {{col.getAggregationText()}} {{col.getAggregationValue() | number:1 }}</div></div>';
    };
    
    this.calculateYesCount = function(visRows, self) {
        var yesCount = 0;
        var column_id = self.name;
        visRows.forEach(function(row, index, array) {
            if (row.entity[column_id] === 'Yes') {
                yesCount++;
            }
        });
        return yesCount;
    };
     
    this.loadQAColumns = function(survey, results)     {
        var newArray = [];
          
        for (var i = 0; i < survey.questions.length; i++) {
            newArray.push({
                field: 'column' + i,
                displayName: survey.questions[i].questionText,
                /* width: 160, */
                headerTooltip: true,
                enableHiding: false,
                headerCellClass: 'grid_header'
            });
            switch(survey.questions[i].type) {
                case 'numeric':
                    newArray[i].aggregationType = uiGridConstants.aggregationTypes.avg;
                    newArray[i].footerCellTemplate =  this.getNumericFooterCellTemplate();
                    break;
                case 'boolean' :
                    newArray[i].footerCellTemplate =  this.getYesNoFooterCellTemplate();
                    newArray[i].aggregationType = this.calculateYesCount;
                    break;
                case 'text' :
                    newArray[i].cellTooltip = true;
                    break;
            }
        } 
        
        return newArray;
    };
    
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
    
    this.checkForAdminAuth = function() {
        
    }
    
    
});