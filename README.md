 #DevMountain Survey Enhancement
 
###This purpose of this project is to make an efficient process for DevMountain to create, deliver, and manage survey results, using the MEAN stack. Currently, surveys are done via Google Docs. Students are messaged when surveys are available, with the message including a link to the survey. Many students ignore the messages and don't take the surveys. Creating and modifying surveys take too much of the teacher's time. Results are available in Excel for each individual survey.

###This survey system is a template-based survey administration system that could be integrated into the DevMountain website. An administration main menu has selections for creating / modifying templates, sending surveys and viewing results. Students see links to requested surveys when they log in. They click on the link, take the survey, then return back to the previous screen. Mongo DB collections include templates, surveys, users, results, and topics.The Templates are the building blocks of surveys. You can build a new template from scratch, or modify an existing one.

##Getting Started
### Prerequisites
 - Mongo database.
 -  Server with Node.js installed

###Installation
 1. git clone https://github.com/dougalderman/surveys
 2. npm install
 3. Create a server/config/config.js file with the following format:
	 ```javascript
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

 
Templates are the building blocks of surveys. You can build a new template from scratch, or modify an existing one.
    <img ng-src="images/create_modify_template_entry.jpg">
The select template drop down box integrates Materialize CSS framework and Angular, using ng-options to display a variable number of template options.
    <img ng-src="images/create_modify_template_dropdown.jpg">
Templates can use variables, which are enclosed with double $$'s: e.g. $$var_name$$. This allows the adminstrator to set variables when sending surveys, avoiding having to create a large number of templates. 
    <img ng-src="images/create_modify_template_variables.jpg">
 Each question in the template is a directive that is ng-repeated for the array of questions. There are 3 question types: numeric, boolean, or text. Numeric are assumed to be a range, with options for low value and high value. Questions can be removed by clicking the X to the right of the question, or added by clicking the Add New Question button at the bottom.
    <img ng-src="images/create_modify_template_question.jpg">  
 If you try to save an existing template without changing the name, a Modal pops up, asking if you are sure you want to overwrite the existing template. A successful save takes you back to the Admin Main Menu, with a toast.
    



