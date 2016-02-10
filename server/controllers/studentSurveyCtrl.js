var surveysModel = require('./../models/surveysModel.js');
var usersModel = require('./../models/usersModel.js');
var resultsModel = require('./../models/resultsModel.js');

module.exports = {
    
    create: function(req, res) {
        
        console.log('in studentSurveyCtrl');
        console.log('in create');
        console.log('req.body = ', req.body);
      
        var newResults = new resultsModel(req.body)
        newResults.save(function(err, result) {
            if (err)
                return res.status(500).send(er);
            else 
                res.send(result);
        });
    },
    
    read: function(req, res) {
        console.log('in studentSurveyCtrl');
        console.log('in read');
        console.log('req.params = ', req.params)
        surveysModel
        .findById(req.params.id, 'name description topic questions')
        .exec(function(err, result) {
             console.log('err', err);
             console.log('result', result);
             if (err) {
                 console.log('in error routine');
                 return res.status(500).send(err);
             }
             else {
                 res.send(result)
             }
        })
    },
    
    readUntaken: function(req, res) {
        console.log('in studentSurveyCtrl');
        console.log('in readUntaken');
        console.log('req.params = ', req.params)
        surveysModel
        .find({users_untaken: req.params.student_id}, 'users_untaken')
        .exec(function(err, result) {
             console.log('err', err);
             console.log('result', result);
             if (err) {
                 console.log('in error routine');
                 return res.status(500).send(err);
             }
             else {
                 res.send(result)
             }
        })
    },
    
    deleteUntaken: function(req, res) {
        console.log('in studentSurveyCtrl');
        console.log('in deleteUntaken');
        console.log('req.params = ', req.params)
        console.log('req.query = ', req.query)
        surveysModel
        .find(req.query)
        .exec(function(err, result) {
             console.log('err', err);
             console.log('result', result);
             if (err) {
                 console.log('in error routine');
                 return res.status(500).send(err);
             }
             else {
                 if (result.usersUntaken) {
                    var indx = result.usersUntaken.indexOf(req.params.student_id);
                    if (indx !== -1) {
                        result.usersUntaken = result.usersUntaken.splice(indx, 1)
                    }
                    result.save(function(er, re) {
                        if (er)
                            return res.status(500).send(er);
                        else
                            res.send(re);  
                    });
                 }
             }
        });
    }
    
}