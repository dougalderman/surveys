var express = require('express'),
    expressSession = require('express-session'),
    passport = require('passport'),
    config = require('./config.js'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    config = require('./config/config.js');

var adminSurveyCtrl = require('./controllers/adminSurveyCtrl.js'),
    studentSurveyCtrl = require('./controllers/studentSurveyCtrl.js'),
    templatesCtrl = require('./controllers/templatesCtrl.js'),
    topicsCtrl = require('./controllers/topicsCtrl.js'),
    usersCtrl = require('./controllers/usersCtrl.js');

require('./config/passport')(passport);

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



var requireAuth = function(req, res, next) {
   
}

// Endpoints

// Auth
// -> Auth
app.post('/api/login', passport.authenticate('local-signup', {
   successRedirect : '/#/student',
   failureRedirect : '/#/signup'
}));

app.post('/api/admin/login', passport.authenticate('local-signup', {
   successRedirect : '/#/admin',
   failureRedirect : '/#/signup'
}));

app.get('/auth/logout', function(req, res) {
    req.logout();
    res.redirect('/#/login');
});

// api endpoint protection helper method
var requireAuth = function (req, res, next) {
	if (req.isAuthenticated()) {
		next();
	} else {
		return res.status(403).send('Not logged in');
	}
};

// api endpoint protection helper method
var requireAdminAuth = function (req, res, next) {
    // Check user record for admin role
    
    
    	if (req.isAuthenticated()) {
		next();
	} else {
		return res.status(403).send('Not logged in');
	}
};


app.get('/api/surveys/untaken/:student_id', requireAuth, studentSurveyCtrl.readUntaken); // Get untaken surveys for param = student Mongo Id. Surveys collection.
// app.delete('/api/surveys/untaken/:student_id', requireAuth, studentSurveyCtrl.deleteUntaken); // Delete untaken survey for student (after survey successfully completed). Param is student Mongo Id, and query is survey Mongo Id. Surveys collection.
app.get('/api/surveys/:id',  requireAuth, studentSurveyCtrl.read); // Get survey questions for survey id under Surveys.
app.post('/api/surveys/results', requireAuth, studentSurveyCtrl.create); // Write survey answers. Results collection. After successful write, delete untaken survey for student in the Surveys collection.
app.post('/api/admin/surveys', requireAdminAuth, adminSurveyCtrl.create); // Create new survey. Surveys collection. 
app.get('/api/admin/surveys', requireAdminAuth, adminSurveyCtrl.read) //  Get surveys. Accepts query parameter. Surveys collection.
app.get('/api/admin/surveys/names_dates', requireAdminAuth, adminSurveyCtrl.readNamesAndDates) //  Get all survey names and Mongo ID's, reverse sorted by date. Surveys collection.
app.get('/api/admin/surveys/:id', requireAdminAuth, adminSurveyCtrl.readOne) // Get survey based on id. Surveys collection.
app.get('/api/admin/results/:id', requireAdminAuth, adminSurveyCtrl.readResults) // Get survey results based on survey ID. Results collection.
app.get('/api/admin/surveys/sent_to/:survey_id', requireAdminAuth, adminSurveyCtrl.readSentTo); // Get First and last names of users sent survey. Param is survey Mongo ID. After getting array of Mongo user ID's, query first and last names of users in array, and return array of names. Surveys and Users collection.
app.get('/api/admin/surveys/untaken/:survey_id', requireAdminAuth, adminSurveyCtrl.readUntaken); // Get First and last names of users who have not yet taken survey. Param is survey Mongo ID. After getting array of Mongo user ID's, query first and last names of users in array, and return array of names. Surveys and Users collection.
// app.put('/api/admin/surveys/:cohort_id', requireAuth, adminSurveyCtrl.update); // Write requested and untaken users to survey record. Param is user cohort ID, and query is survey Mongo ID. Surveys collection.
app.get('/api/admin/templates', requireAdminAuth, templatesCtrl.readNames) // Get all template names and Mongo ID's. Templates collection.
app.get('/api/admin/templates/:id', requireAdminAuth, templatesCtrl.read) // Get specific template based on Mongo ID.
app.post('/api/admin/templates', requireAdminAuth, templatesCtrl.create) // Writes new template. Templates collection.
app.put('/api/admin/templates/:id', requireAdminAuth, templatesCtrl.update) // Updates existing template. Templates collection.
app.delete('/api/admin/templates/:id', requireAdminAuth, templatesCtrl.delete) // Delete template based on id
app.get('/api/admin/topics', requireAdminAuth, topicsCtrl.read); // Read all topics from Topics collection. Accepts query parameter.
app.post('/api/admin/topics', requireAdminAuth, topicsCtrl.create); // Write new topic record to Topics collection.
app.delete('/api/admin/topics/:id', requireAdminAuth, topicsCtrl.delete); // Delete topic record based on id from Topics collection.
app.get('/api/admin/users', requireAdminAuth, usersCtrl.read); // Get all users from Users collection. Can use query parameter to restrict query. Users collection.
app.get('/api/admin/users/cohort/:cohort_id', requireAdminAuth, usersCtrl.readUsersInCohort); // Get Mongo ID's of all users in a cohort specified by cohort_id.
// app.get('/api/admin/users/requested_surveys/:id', requireAuth, usersCtrl.readRequestedSurveyUsers); // Get first and last names of all users who were requested a particular survey specified by id.
// app.get('/api/admin/users/untaken_surveys/:id', requireAuth, usersCtrl.readUntakenSurveyUsers); // Get first and last names of all users who have not yet taken a requested survey specified by id.
app.put('/api/admin/users/:id', requireAdminAuth, usersCtrl.update); // Update user.
app.post('/api/admin/users', requireAdminAuth, usersCtrl.create); // Add new user.
app.delete('/api/admin/users/:id', requireAdminAuth, usersCtrl.delete); // Delete user based on id.


app.listen(port, function() {
    console.log('Server is running on port ' + port);
})

