var usersModel = require('./../models/usersModel.js');

var checkRoles = function(user, role) {
    for (var i = 0; i < user.roles.length; i++) {
        if (user.roles[i] === role)
            return true;
    }
    return false;
}

var setSignupDefaults = function(user) {
    user.cohort = 350;
    user.roles = ['student'];
    return user;
}

module.exports = {
    
    successRedirect: function(req, res) {
        if (checkRoles(req.user, 'admin'))
            res.redirect('/#/admin');
        else 
            return res.status(403).send('Not authorized');
    },

    
    successRespond: function(req, res) {
        res.json(req.user);
    },
    
    localSignup: function(req, res) {
        console.log('in localSignup');
        console.log('req.body = ', req.body)
        var user = setSignupDefaults(req.body);
        console.log('user after setSignupDefaults = ', user)
        var newUser = new usersModel(user);
        newUser.password = newUser.generateHash(newUser.password);
        newUser.save(function(err, result) {
            if (err)
                return res.status(500).send(err);
            else 
                res.send(result);
        });
    },
    
    logout: function(req, res) {
        req.logout();
        res.redirect('/#/login');
    },
    
    current_user: function(req, res) {
        if (req.isAuthenticated())
            res.send(req.user);
        else
            res.status(401).send('Not logged in');
    },
    
    current_admin_user: function(req, res) {
        if (req.isAuthenticated() && checkRoles(req.user, 'admin'))
            res.send(req.user);
        else
            res.status(403).send('Not authorized');
    },
    
    requireAuth: function (req, res, next) {
        if (req.isAuthenticated()) {
            next();
        } else {
            return res.status(401).send('Not logged in');
        }
    },

    requireAdminAuth: function (req, res, next) {
        // Check user record for admin role
        if (req.isAuthenticated() && checkRoles(req.user, 'admin')) {
            next();
        } else {
            return res.status(403).send('Not authorized');
        }
    }
    
}
        