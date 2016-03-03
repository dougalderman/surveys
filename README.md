#DevMountain Survey Enhancement
 
The purpose of this project is to make an efficient process for DevMountain to create, deliver, and manage survey results, using the MEAN stack. Currently, surveys are done via Google Docs. Students are messaged when surveys are available, with the message including a link to the survey. Many students ignore the messages and don't take the surveys. Creating and modifying surveys take too much of the teacher's time. Results are available in Excel for each individual survey.

This survey system is a template-based survey administration system that could be integrated into the DevMountain website. An administration main menu has selections for creating / modifying templates, sending surveys and viewing results. Students see links to requested surveys when they log in. They click on the link, take the survey, then return back to the previous screen. Mongo DB collections include templates, surveys, users, results, and topics.The Templates are the building blocks of surveys. You can build a new template from scratch, or modify an existing one.

##Getting Started
### Prerequisites
 - Mongo database.
 -  Server with Node.js installed

###Installation
1. git clone https://github.com/dougalderman/surveys
2. npm install
3. Create a server/config/config.js file with the following format:
	 ```
	     module.exports = {
	        express: {
	            secret: [put a secret code here]
	        },
	        port: [put port number here] } 
	```
4. node server/index.js
5. Signup 2 new users.
6. Change the roles field of one of the users from ['student'] to ['admin'] by using a Mongo DB tool.
7. Add topics to the topics collection using a Mongo DB tool. The only field you need to add is name (name of the topic).
8. Sign in as the admin user you just created.
9. Point the browser to [url]/#/admin to get the admin main menu.
10. Create a new template.
11. Use the template to send a survey. Send to Cohort 350, which is the default cohort for users who sign up.
12. Log out. Login as the other user you created. You should see the survey you sent. Click on this survey.
13. Take the survey.
14. Log out. Login as the admin user. View Results. Select the survey you just sent. You should see results for the user who took the survey.
15. Add more users. Create more templates, and send more surveys. View Results. 

##Design Goals
This site was intended to be eventually integrated into the DevMountain system. A separate Passport local auth system was created to allow for testing and demonstration independent of DevMountain. Due to DevMountain already having a user admin system, a separate user admin system was not created for this project.

The admin section was designed more for functionality than appearance, since it will be used by a handful of people. The take survey page was designed for appearance, as it will be used by most students.

##Detailed Usage

###Models
Here are the 5 Mongoose collections:

```javascript
/* -Surveys */
	name: {type: 'String', required: true},
	description: {type: 'String'},
	cohortSentTo: {type: 'Number'},
	usersSentTo: [{type: Schema.Types.ObjectId, ref: 'Users'}],
	usersUntaken: [{type: Schema.Types.ObjectId, ref: 'Users'}],
	dateSent: {type: 'Date', required: true},
	topic: {type: Schema.Types.ObjectId, ref: 'Topics'},
	questions: [questionSchema]

	
/* Templates */
	name: {type: 'String', required: true},
	description: {type: 'String'},
	questions: [questionSchema]

	
/* Results */
	survey: {type: Schema.Types.ObjectId, ref: 'Surveys'},
	user: {type: Schema.Types.ObjectId, ref: 'Users'},
	answers: [answerSchema]
	
	
/* Users */
	first_name: {type: 'String'},
	last_name: {type: 'String'},
	cohort:  {type: 'Number'},
	email: {type: 'String'},
	password: {type: 'String'},
	roles: [{type: 'String'}],
	
/* Topics */
	name: {type: 'String'}
```

Here are the question and answer schema:

```javascript
/* questionSchema */
		questionText: {type: 'String', required: true},
		type: {type: 'String', lowercase: true, required: true, enum: ['numeric', 'boolean', 'text']},
		required: {type: 'Boolean', required: true, default: true},
		lowValue: {type: 'Number', min: 1},
		highValue: {type: 'Number', min: 1}

		
/* answerSchema */
		type: {type: 'String', lowercase: true, required: true, enum: ['numeric', 'boolean', 'text']},
		numericAnswer: {type: 'Number', min: 1},
		booleanAnswer: {type: 'Boolean' },
		textAnswer: {type: 'String'}
		
```

###Detailed Description of System

####Create / Modify Template

Templates are the building blocks of surveys. You can build a new template from scratch, or modify an existing one.

![Create Modify Template Page](https://github.com/dougalderman/surveys/blob/master/readme_images/Create_Modify_Template.jpg)

The select template drop down box integrates Materialize CSS framework and Angular, using ng-options to display a variable number of template options.

![Select Template Drop Down Box](https://github.com/dougalderman/surveys/blob/master/readme_images/Create_Modify_Template4.jpg)

```html
<div class="container">
        
        <p>Select Template:</p>
        <div class="row">
            <div class="input-field col s6">
                <select id="choose_template" ng-options="templ.name for templ in templates" ng-model="selectedTemplate" ng-change="loadSelectedTemplate()">
                    <option value="" disabled selected>Select Template</option>
                </select>
            </div>
        </div>
```

Templates are loaded in the resolve of the createModifyTemplate state in app.js, calling a service function that does an http request to one of the 29 server endpoints:

```javascript
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
```

A feature of the Create/Modify template page is that it ng-repeats over a question-crud directive that displays and provides editing capability for all the existing questions in a template, and allows the user to add a new question to the template. There are 3 question types: numeric, boolean, or text. Numeric are assumed to be a range, with options for low value and high value. Questions can be removed by clicking the X to the right of the question, or added by clicking the Add New Question button at the bottom.:

![Question Crud Directive](https://github.com/dougalderman/surveys/blob/master/readme_images/Create_Modify_Template2.jpg)


```html
            <div ng-repeat="question in template.questions">
                <question-crud question="question" question-types="quest_types" question-index="$index" delete-question="deleteQuestion(indx)"></question-crud>
            </div>
            
            <button class="button" type="button" ng-click="addNewQuestion()">Add New Question</button>
```
Templates can use variables, which are enclosed with double $$'s: e.g. $$var_name$$. This allows the adminstrator to set variables when sending surveys, avoiding having to create a large number of templates. 

A modal pops up if the user tries to modify an existing template without changing the name, prompting him to either cancel out or overwrite the existing template. A successful save takes you back to the Admin Main Menu, with a toast.

![Modal Pop Up](https://github.com/dougalderman/surveys/blob/master/readme_images/Create_Modify_Template5.jpg)

####Send Survey

The Send Survey page allows the user to select from a list of templates in order to send out a new survey.

![Send Survey](https://github.com/dougalderman/surveys/blob/master/readme_images/Send_Survey.jpg)

After selecting the template, the user can select values for the variables in the template. A service function does a regex check for the $$var_name$$ pattern, and pushes them into an array:

```javascript
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
```

After finding the variables, they are displayed in the view using an ng-repeat:

```html
 <p ng-show="var_names.length">Variables:</p>
 <div ng-repeat="var_name in var_names" class="row">
        <div class="input-field col s6">
                <p class="variable_name">{{var_name}}:</p>
                <input ng-model="var_values[$index]" type="text" id="var_value{{$index}}" required>
        </div>
 </div>
```

![Variables](https://github.com/dougalderman/surveys/blob/master/readme_images/Send_Survey2.jpg)

After the user enters values for the variables, these are later compiled when the survey is previewed or sent by doing a regexp replace:

```javascript
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
```
The user selects the topic using a dropdown. Topics are stored in a separate collection. The user also enters a cohort number to send to. The cohort number is a field in the user collection. 

After entering values in the input fields the user can preview the survey by clicking a button:

![Preview Survey](https://github.com/dougalderman/surveys/blob/master/readme_images/Send_Survey3.jpg)

The preview survey feature is a directive that displays the survey template with variables compiled. It was necessary to duplicate the survey into a temporary object before previewing it to store the compiled variables, to allow for the user to make changes to the variables after previewing it. Clicking the "Send" button writes a new survey to the survey collection. 

####View Reports
The View Reports screen uses UI-Grid to display a report on which users took the survey or not, as well as all the questions and answers.

![View Reports](https://github.com/dougalderman/surveys/blob/master/readme_images/View_Reports.jpg)

After the user selects from a dropdown list of surveys in reverse date order, the reports will display. The first report, Report of Users Sent Survey, provides a list of user names and a column indicating whether they took the survey or not. 

![Report of Users Sent Survey](https://github.com/dougalderman/surveys/blob/master/readme_images/View_Reports2.jpg)

I did a custom column footer aggregation feature to count the number of "Yes" rows. 

```javascript
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
```

The Questions and Answers report has all the survey questions as columns, and each answer as a separate row.

![Questions and Answers](https://github.com/dougalderman/surveys/blob/master/readme_images/View_Reports3.jpg)

I created a function to load the columns from an array of survey questions. As can be seen below, I used either the built-in avge aggregation function or my custom 'Yes Count' function, depending on question type:

```javascript
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
```

A similar function loaded in the data for the questions from an array of survey answers. 

Data can be exported to a csv file using the built-in UI-Grid export feature (by clicking on the menu tab at top right of grid). The csv file can be imported into Excel or another statistical program for further analysis.







