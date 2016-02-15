var express = require('express'),
    expressSession = require('express-session'),
    passport = require('passport'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    config = require('./config/config.js');

var adminSurveyCtrl = require('./controllers/adminSurveyCtrl.js'),
    studentSurveyCtrl = require('./controllers/studentSurveyCtrl.js'),
    templatesCtrl = require('./controllers/templatesCtrl.js'),
    topicsCtrl = require('./controllers/topicsCtrl.js'),
    usersCtrl = require('./controllers/usersCtrl.js'),
    authCtrl = require('./controllers/authCtrl.js');

require('./controllers/passport')(passport);

var app = express(),
    port = 7518;

app.use(bodyParser.json());

app.use(express.static(__dirname + '/../public'));
app.use(expressSession(config.express)); // use separate config file for secret
app.use(passport.initialize());
app.use(passport.session());


var mongoUri = 'mongodb://localhost:27017/surveys';

mongoose.connect(mongoUri);

mongoose.connection.once('open', function() {
    console.log("Successfully connected to mongodb")
}) 



// Endpoints

// Auth
app.post('/api/login', passport.authenticate('local-login'), authCtrl.successRespond);

// Auth
app.post('/api/signup', authCtrl.localSignup);

app.get('/api/logout', authCtrl.logout);

app.get('/api/current_user', authCtrl.current_user);

app.get('/api/current_admin_user', authCtrl.current_admin_user);


// Non-auth
app.get('/api/surveys/untaken/:student_id', authCtrl.requireAuth, studentSurveyCtrl.readUntaken); // Get untaken surveys for param = student Mongo Id. Surveys collection.
// app.delete('/api/surveys/untaken/:student_id', authCtrl.authCtrl.requireAuth, studentSurveyCtrl.deleteUntaken); // Delete untaken survey for student (after survey successfully completed). Param is student Mongo Id, and query is survey Mongo Id. Surveys collection.
app.get('/api/surveys/:id',  authCtrl.requireAuth, studentSurveyCtrl.read); // Get survey questions for survey id under Surveys.
app.post('/api/surveys/results', authCtrl.requireAuth, studentSurveyCtrl.create); // Write survey answers. Results collection. After successful write, delete untaken survey for student in the Surveys collection.
app.get('/api/topics',  authCtrl.requireAuth, topicsCtrl.read); // Read topics from Topics collection. Accepts query parameter.
app.post('/api/admin/surveys', authCtrl.requireAdminAuth, adminSurveyCtrl.create); // Create new survey. Surveys collection. 
app.get('/api/admin/surveys', authCtrl.requireAdminAuth, adminSurveyCtrl.read) //  Get surveys. Accepts query parameter. Surveys collection.
app.get('/api/admin/surveys/names_dates', authCtrl.requireAdminAuth, adminSurveyCtrl.readNamesAndDates) //  Get all survey names and Mongo ID's, reverse sorted by date. Surveys collection.
app.get('/api/admin/surveys/:id', authCtrl.requireAdminAuth, adminSurveyCtrl.readOne) // Get survey based on id. Surveys collection.
app.get('/api/admin/results/:id', authCtrl.requireAdminAuth, adminSurveyCtrl.readResults) // Get survey results based on survey ID. Results collection.
app.get('/api/admin/surveys/sent_to/:survey_id', authCtrl.requireAdminAuth, adminSurveyCtrl.readSentTo); // Get First and last names of users sent survey. Param is survey Mongo ID. After getting array of Mongo user ID's, query first and last names of users in array, and return array of names. Surveys and Users collection.
app.get('/api/admin/surveys/untaken/:survey_id', authCtrl.requireAdminAuth, adminSurveyCtrl.readUntaken); // Get First and last names of users who have not yet taken survey. Param is survey Mongo ID. After getting array of Mongo user ID's, query first and last names of users in array, and return array of names. Surveys and Users collection.
// app.put('/api/admin/surveys/:cohort_id', authCtrl.authCtrl.requireAuth, adminSurveyCtrl.update); // Write requested and untaken users to survey record. Param is user cohort ID, and query is survey Mongo ID. Surveys collection.
app.get('/api/admin/templates', authCtrl.requireAdminAuth, templatesCtrl.readNames) // Get all template names and Mongo ID's. Templates collection. Sort ascending by template name.
app.get('/api/admin/templates/:id', authCtrl.requireAdminAuth, templatesCtrl.read) // Get specific template based on Mongo ID.
app.post('/api/admin/templates', authCtrl.requireAdminAuth, templatesCtrl.create) // Writes new template. Templates collection.
app.put('/api/admin/templates/:id', authCtrl.requireAdminAuth, templatesCtrl.update) // Updates existing template. Templates collection.
app.delete('/api/admin/templates/:id', authCtrl.requireAdminAuth, templatesCtrl.delete) // Delete template based on id
app.get('/api/admin/topics', authCtrl.requireAdminAuth, topicsCtrl.read); // Read topics from Topics collection. Accepts query parameter.
app.post('/api/admin/topics', authCtrl.requireAdminAuth, topicsCtrl.create); // Write new topic record to Topics collection.
app.delete('/api/admin/topics/:id', authCtrl.requireAdminAuth, topicsCtrl.delete); // Delete topic record based on id from Topics collection.
app.get('/api/admin/users', authCtrl.requireAdminAuth, usersCtrl.read); // Get users from Users collection. Can use query parameter to restrict query. Users collection.
app.get('/api/admin/users/cohort/:cohort_id', authCtrl.requireAdminAuth, usersCtrl.readUsersInCohort); // Get Mongo ID's of all users in a cohort specified by cohort_id.
// app.get('/api/admin/users/requested_surveys/:id', authCtrl.requireAuth, usersCtrl.readRequestedSurveyUsers); // Get first and last names of all users who were requested a particular survey specified by id.
// app.get('/api/admin/users/untaken_surveys/:id', authCtrl.requireAuth, usersCtrl.readUntakenSurveyUsers); // Get first and last names of all users who have not yet taken a requested survey specified by id.
app.put('/api/admin/users/:id', authCtrl.requireAdminAuth, usersCtrl.update); // Update user.
app.post('/api/admin/users', authCtrl.requireAdminAuth, usersCtrl.create); // Add new user.
app.delete('/api/admin/users/:id', authCtrl.requireAdminAuth, usersCtrl.delete); // Delete user based on id.


app.listen(port, function() {
    console.log('Server is running on port ' + port);
})

