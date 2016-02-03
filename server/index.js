var express = require('express'),
    expressSession = require('express-session'),
    passport = require('passport'),
    config = require('./config.js'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    localStrategy = require('passport-local'),
    config = require('./config.js');

// db models
// var User = require('./api/models/UserModel.js');


var app = express(),
    port = 7518;

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
})); */


passport.serializeUser(function(user, done) {
    done(null, user);
})

passport.deserializeUser(function(obj, done) {
    done(null, obj);
})

/* var mongoUri = 'mongodb://localhost:27017/surveys';

mongoose.connect(mongoUri);

mongoose.connection.once('open', function() {
    console.log("Successfully connected to mongodb")
}) */


var requireAuth = function(req, res, next) {
  if (req.isAuthenticated()) {
		next();
	}
    else {
        return res.status(403).send('Not logged in');
    }
}

/* app.get('/api/github/following', requireAuth, gitCtrl.getFollowing); 

app.get('/api/github/:username/activity', requireAuth, gitCtrl.getActivity); */


app.listen(port, function() {
    console.log('Server is running on port ' + port);
})

