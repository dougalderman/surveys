var express = require('express'),
    expressSession = require('express-session'),
    passport = require('passport'),
    config = require('./config.js'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    localStrategy = require('passport-local').Strategy,
    config = require('./config.js');

var adminSurveyCtrl = require('./controllers/adminSurveyCtrl.js'),
    studentSurveyCtrl = require('./controllers/studentSurveyCtrl.js'),
    templatesCtrl = require('./controllers/templatesCtrl.js'),
    topicsCtrl = require('./controllers/topicsCtrl.js'),
    usersCtrl = require('./controllers/usersCtrl.js');


var app = express(),
    port = 7518;

app.use(bodyParser.json());

app.use(express.static(__dirname + '/../public'));
app.use(expressSession(config.express)); // use separate config file for secret
app.use(passport.initialize());
app.use(passport.session());


/* passport.use(new localStrategy(function (username, password, done) {
	User.findOne({ username: username }).exec(function (err, user) {
		if (err) {
			console.log(err);
			return done(err);
		}
		if (!user) {
			return done('user not found', false);
		}
		user.verifyPassword(password).then(function (isMatch) {
			if (!isMatch) {
				return done('incorrect credentials', false);
			}
			return done(null, user.toJSON());
		});
	});
})); 


passport.serializeUser(function(user, done) {
    done(null, user);
})

passport.deserializeUser(function(obj, done) {
    done(null, obj);
})
*/

var mongoUri = 'mongodb://localhost:27017/surveys';

mongoose.connect(mongoUri);

mongoose.connection.once('open', function() {
    console.log("Successfully connected to mongodb")
}) 


/* var requireAuth = function(req, res, next) {
  if (req.isAuthenticated()) {
		next();
	}
    else {
        return res.status(403).send('Not logged in');
    }
} */

var requireAuth = function(req, res, next) {
    next();
}

// Endpoints
app.get('/api/surveys/untaken/:student_id', requireAuth, studentSurveyCtrl.readUntaken); // Get untaken surveys for student Mongo Id. Users collection.
app.delete('/api/surveys/untaken/:survey_id', requireAuth, studentSurveyCtrl.deleteUntaken); // Delete untaken survey for student (after survey successfully completed). Param is survey Mongo Id, and query is student Mongo Id. Users collection.
app.get('/api/surveys/:id',  requireAuth, studentSurveyCtrl.read); // Get survey questions for survey id under Surveys.
app.post('/api/surveys/results', requireAuth, studentSurveyCtrl.create); // Write survey answers. Results collection.
app.post('/api/admin/surveys', requireAuth, adminSurveyCtrl.create); // Create new survey. Surveys collection.
app.put('/api/admin/surveys/:survey_id', requireAuth, adminSurveyCtrl.update); // Write requested and untaken surveys to user record. Param is survey Mongo ID, and query is student cohort Id. Users collection.
app.get('/api/admin/surveys', requireAuth, adminSurveyCtrl.readNames) //  Get all survey names and Mongo ID's, reverse sorted by date. Surveys collection.
app.get('/api/admin/surveys/:id', requireAuth, adminSurveyCtrl.read) // Get survey based on id. Surveys collection.
app.get('/api/admin/results/:id', requireAuth, adminSurveyCtrl.readResults) // Get survey results based on survey ID. Results collection.
app.get('/api/admin/templates', requireAuth, templatesCtrl.readNames) // Get all template names and Mongo ID's. Templates collection.
app.get('/api/admin/templates/:id', requireAuth, templatesCtrl.read) // Get specific template based on Mongo ID.
app.post('/api/admin/templates', requireAuth, templatesCtrl.create) // Writes new template. Templates collection.
app.put('/api/admin/templates/:id', requireAuth, templatesCtrl.update) // Updates existing template. Templates collection.
app.delete('/api/admin/templates/:id', requireAuth, templatesCtrl.delete) // Delete template based on id
app.get('/api/admin/topics', requireAuth, topicsCtrl.read); // Read all topics from Topics collection. Accepts query parameter.
app.post('/api/admin/topics', requireAuth, topicsCtrl.create); // Write new topic record to Topics collection.
app.delete('/api/admin/topics/:id', requireAuth, topicsCtrl.delete); // Delete topic record based on id from Topics collection.
app.get('/api/admin/users', requireAuth, usersCtrl.read); // Get all users from Users collection. Can use query parameter to restrict query. Users collection.
// app.get('/api/admin/users/cohort/:cohort_id', requireAuth, usersCtrl.readUsersInCohort); // Get Mongo ID's of all users in a cohort specified by cohort_id.
app.get('/api/admin/users/requested_surveys/:id', requireAuth, usersCtrl.readRequestedSurveyUsers); // Get first and last names of all users who were requested a particular survey specified by id.
app.get('/api/admin/users/untaken_surveys/:id', requireAuth, usersCtrl.readUntakenSurveyUsers); // Get first and last names of all users who have not yet taken a requested survey specified by id.
app.put('/api/admin/users/:id', requireAuth, usersCtrl.update); // Update user.
app.post('/api/admin/users', requireAuth, usersCtrl.create); // Add new user.
app.delete('/api/admin/users/:id', requireAuth, usersCtrl.delete); // Delete user based on id.


app.listen(port, function() {
    console.log('Server is running on port ' + port);
})

