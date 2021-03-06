# DevMountain Survey Enhancement

See Demo Version at http://157.245.254.173:6320

## Description
 
The purpose of this project is to make an efficient process for DevMountain to create, deliver, and manage survey results, using the MEAN stack. Currently, surveys are done via Google Docs. Students are messaged when surveys are available, with the message including a link to the survey. Many students ignore the messages and don't take the surveys. Creating and modifying surveys take too much of the teacher's time. Results are available in Excel for each individual survey.

This survey system is a template-based survey administration system that could be integrated into the DevMountain website. An administration main menu has selections for creating / modifying templates, sending surveys and viewing results. Students see links to requested surveys when they log in. They click on the link, take the survey, then return back to the previous screen. Mongo DB collections include templates, surveys, users, results, and topics. Templates are the building blocks of surveys. You can build a new template from scratch, or modify an existing one.

## Getting Started
### Prerequisites
 - Mongo database.
 -  Server with Node.js installed

### Installation
1. git clone https://github.com/dougalderman/surveys.git
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

### Demo Instructions
1. Signup a new user (fake email OK)
2. Login using the admin user dabrams@yahoo.com (password 123).
3. Point the browser to [url]/#/admin to get the admin main menu.
4. Create a new template.
5. Use the template to send a survey. Send to Cohort 350, which is the default cohort for users who sign up.
6. Log out. Login as the other user you created. You should see the survey you sent. Click on this survey.
7. Take the survey.
8. Log out. Login as the admin user. View Results. Select the survey you just sent. You should see results for the user who took the survey.
9. Add more users. Create more templates, and send more surveys. View Results. 

## Design Goals
This site was intended to be eventually integrated into the DevMountain system. A separate Passport local auth system was created to allow for testing and demonstration independent of DevMountain. Due to DevMountain already having a user admin system, a separate user admin system was not created for this project.

The admin section was designed more for functionality than appearance, since it will be used by a handful of people. The take survey page was designed for appearance, as it will be used by most students.

## Detailed Usage

### Models
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

### Detailed Description of System

#### Create / Modify Template

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

#### Send Survey

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

#### View Results
The View Results screen uses UI-Grid to display a report on which users took the survey or not, as well as all the questions and answers.

![View Results](https://github.com/dougalderman/surveys/blob/master/readme_images/View_Results.jpg)

After the user selects from a dropdown list of surveys in reverse date order, the reports will display. The first report, Report of Users Sent Survey, provides a list of user names and a column indicating whether they took the survey or not. 

![Report of Users Sent Survey](https://github.com/dougalderman/surveys/blob/master/readme_images/View_Results2.jpg)

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

![Questions and Answers](https://github.com/dougalderman/surveys/blob/master/readme_images/View_Results3.jpg)

I created a function to load the columns from an array of survey questions. As can be seen below, I used either the built-in avg aggregation function or my custom 'Yes Count' function, depending on question type:

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

A similar function loaded in the data for the answers from an array of survey answers. 

Data can be exported to a csv file using the built-in UI-Grid export feature (by clicking on the menu tab at top right of grid). The csv file can be imported into Excel or another statistical program for further analysis.

#### Take Survey
The Take Survey screen lets students take a requested survey. It contains a fixed background DevMountain classroom image with a variable number of scrollable question boxes. 

![Take Survey](https://github.com/dougalderman/surveys/blob/master/readme_images/Take_Survey_Screen2.jpg)

This fixed picture / scrollable question visual effect was created by creating a parent div id takeSurvey with a background image and fixed position, and a child div class surveyBody, with overflow-y set to scroll:

```css
div #takeSurvey {
    width: 100vw;
    height: 100vh;
    background-image: url('./../images/devmountain_class_pic.jpg');
    background-size: cover;
    position: fixed;
}

#takeSurvey .surveyBody {
    width: 100%;
    margin: 0 auto;
    height: 100%;
    overflow-y: scroll;
}
```

takeSurveyCtrl.js is passed the survey ID. It uses this Mongo ID to read the survey record from the Surveys Collection. The survey record has survey name and topic, which are displayed in the header. All survey questions are read into the scope from the survey record. Each question type (numeric, boolean, and text) is a separate directive that is set to show ng-if the question type matches the directive question type. The Take Survey page ng-repeats through all the questions in the survey:

```html
<div class="survey-question" ng-repeat = "question in survey.questions">
              <numeric-question class="question-directive" low-value="question.lowValue" high-value="question.highValue" required="question.required" question-text="{{question.questionText}}" response="results.answers[$index]" question-index="{{$index}}" question-type="{{question.type}}" not-answered="notAnswered" ng-if="question.type === 'numeric'"></numeric-question>
                <boolean-question class="question-directive" required="question.required" question-text="{{question.questionText}}" response="results.answers[$index]" question-index="{{$index}}" question-type="{{question.type}}" not-answered="notAnswered" border-on-yes="borderOnYes" border-on-no="borderOnNo" ng-if="question.type === 'boolean'"></boolean-question>
               <text-question class="question-directive" required="question.required" question-text="{{question.questionText}}" response="results.answers[$index]" question-index="{{$index}}" question-type="{{question.type}}" not-answered="notAnswered" ng-if="question.type === 'text'"></text-question>
</div>
```

Numeric questions utilize a Materialize slider for user input, and text questions utilize a Materialize textarea. I did a custom Yes / No user input for boolean questions:

![3 Question Types](https://github.com/dougalderman/surveys/blob/master/readme_images/Take_Survey_Screen3.jpg)

The Custom Yes / No directive html contained nested div's that were set to ng-class black_border_and_text if borderOnYes[questionIndex] is true. This variable is set in the handleBooleanAnswer function in the directive controller:

```html
<div class="bool_question_container">
    <div class="bool_question left_bool" ng-class="{black_border_and_text: borderOnYes[questionIndex]}" ng-click="handleBooleanAnswer('true', questionIndex)">Yes</div>
    <div class="bool_question right_bool" ng-class="{black_border_and_text: borderOnNo[questionIndex]}" ng-click="handleBooleanAnswer('false', questionIndex)">No</div>
</div>
```

```javascript
$scope.handleBooleanAnswer = function(answer, indx) { 
        $scope.response.booleanAnswer = answer;
        if (answer==='true') {
                $scope.borderOnYes[indx] = true;
                $scope.borderOnNo[indx] = false;
        }
        else {
                $scope.borderOnNo[indx] = true;
                $scope.borderOnYes[indx] = false;
        }
} 
```
Upon user submit, the controller does custom form validation checking that all required questions are answered. If a required question isn't answered, the bright_red class will ng-show (the question text will display bright red):

```html
<p ng-class= "{bright_red: notAnswered[questionIndex]}">{{questionText}}<span class="required" ng-show="required">&nbsp;&nbsp;*</span></p>
```

After successful submit, takeSurveyCtrl.js writes the survey answers to the Results collection (by calling a service function that hits /api/survey/results). takeSurveyCtrl.js passes control back to the calling screen, with a "Survey Successfully Submitted" toast. 

On the server, when the /api/survey/results endpoint is hit, studentSurveyCtrl.js writes the survey answers to the Results collection, then removes the user from the usersUntaken array in the Surveys collection:

```javascript
if (resul._doc.usersUntaken) {
        var indx = resul._doc.usersUntaken.indexOf(surveyUser);
        if (indx !== -1) {
                resul._doc.usersUntaken.splice(indx, 1)
                resul.save(function(er, re) {
                if (er)
                        return res.status(500).send(er);
                else
                        res.send(re);
                });
       }
}
```

This removes the survey from the Surveys Requested list seen by the student.

## License
This code is open source under the MIT license:  https://opensource.org/licenses/MIT
