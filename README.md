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

![Create Modify Template Page](https://github.com/dougalderman/surveys/tree/master/readme_images/Create_Modify_Template.jpg)

The select template drop down box integrates Materialize CSS framework and Angular, using ng-options to display a variable number of template options.

![Select Template Drop Down Box](https://github.com/dougalderman/surveys/tree/master/readme_images/Create_Modify_Template4.jpg)

```html
<div class="container">
        
        <p>Select Template:</p>
        <div class="row">
            <div class="input-field col s6">
                <select id="choose_template" ng-options="templ.name for templ in templates" ng-model="selectedTemplate" ng-change="loadSelectedTemplate()">
                    <option value="" disabled selected>Select Template</option>
<!--                    <option ng-repeat="template in templates" value="{{template._id}}">{{template.name}}</option>
                    </div>-->
                </select>
                <!--label>Select Template</label>-->
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

```html
            <div ng-repeat="question in template.questions">
                <question-crud question="question" question-types="quest_types" question-index="$index" delete-question="deleteQuestion(indx)"></question-crud>
            </div>
            
            <button class="button" type="button" ng-click="addNewQuestion()">Add New Question</button>
```
Templates can use variables, which are enclosed with double $$'s: e.g. $$var_name$$. This allows the adminstrator to set variables when sending surveys, avoiding having to create a large number of templates. 

A modal pops up if the user tries to modify an existing template without changing the name, prompting him to either cancel out or overwrite the existing template. A successful save takes you back to the Admin Main Menu, with a toast.

![Modal Pop Up](https://github.com/dougalderman/surveys/tree/master/readme_images/Create_Modify_Template5.jpg)
