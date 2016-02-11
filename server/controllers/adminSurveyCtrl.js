var surveysModel = require('./../models/surveysModel.js');
var usersModel = require('./../models/usersModel.js');
var resultsModel = require('./../models/resultsModel.js');

module.exports = {
    
    create: function(req, res) {
        
        console.log('in adminSurveyCtrl');
        console.log('in create');
        console.log('req.body = ', req.body);
      
        var newSurvey = new surveysModel(req.body)
        var cohort_id = newSurvey.cohortSentTo;
        usersModel
        .find({'cohort': cohort_id}, '_id')
        .exec(function(error, result) {
            if (error) {
                return res.status(500).send(error);
            }
            else {
                newSurvey._doc.usersSentTo = [];
                newSurvey._doc.usersUntaken = [];
                result.forEach(function(resul, index, array) {
                    newSurvey._doc.usersSentTo.push(resul._doc._id);
                    newSurvey._doc.usersUntaken.push(resul._doc._id);
                })
                newSurvey.save(function(er, re) {
                    if (er)
                        return res.status(500).send(er);
                    else 
                        res.send(re);
                });
            }
        });
        
    },
    
    read: function(req, res) {
        console.log('in adminSurveyCtrl');
        console.log('in read');
        console.log('req.query', req.query)
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
                 res.send(result)
             }
        })
    },
    
    readOne: function(req, res) {
        console.log('in adminSurveyCtrl');
        console.log('in readOne');
        console.log('req.params', req.params)
        surveysModel
        .findById(req.params.id)
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
    
    readNamesAndDates: function(req, res) {
        console.log('in adminSurveyCtrl');
        console.log('in readNamesAndDates');
        surveysModel
        .find({},'name dateSent')
        .sort({dateSent: 'desc'})
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
    
    readResults: function(req, res) {
        console.log('in adminSurveyCtrl');
        console.log('in readResults');
        console.log('req.params', req.params)
        resultsModel
        .find({survey: req.params.id})
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
    
    readSentTo: function(req, res) {
        console.log('in adminSurveyCtrl');
        console.log('in readSentTo');
        console.log('req.params', req.params)
        surveysModel
        .findById(req.params.survey_id, 'usersSentTo')
        .exec(function(err, result) {
             console.log('err', err);
             console.log('result', result);
             if (err) {
                 console.log('in error routine');
                 return res.status(500).send(err);
             }
             else {
                    usersModel
                    .find({'_id': { $in: result._doc.usersSentTo} }, 'first_name last_name')
                    .exec(function(er, re) {
                    if (er)
                        return res.status(500).send(er);
                    else
                        res.send(re);  
                });
             }
        })
    },
    
    readUntaken: function(req, res) {
        console.log('in adminSurveyCtrl');
        console.log('in readUntaken');
        console.log('req.params', req.params)
        surveysModel
        .findById(req.params.survey_id, 'usersUntaken')
        .exec(function(err, result) {
             console.log('err', err);
             console.log('result', result);
             if (err) {
                 console.log('in error routine');
                 return res.status(500).send(err);
             }
             else {
                    usersModel
                    .find({'_id': { $in: result._doc.usersUntaken} }, 'first_name last_name')
                    .exec(function(er, re) {
                    if (er)
                        return res.status(500).send(er);
                    else
                        res.send(re);  
                });
             }
        })
    }
    
    /* update: function(req, res) {
        console.log('in adminSurveyCtrl');
        console.log('in update');
        console.log('req.params = ', req.params);
        console.log('req.query = ', req.query);
        surveysModel
        .find(req.query, 'usersSentTo usersUntaken')
        .exec(function(err, result) {
            console.log('err', err);
            console.log('result', result);
            if (err) {
                console.log('in error routine');
                return res.status(500).send(err);
            }
            else {
                if (!result.usersSentTo)
                    result.usersSentTo = [];
                 
                result.usersSentTo.push(req.params.user_id);
                    
                if (!result.usersUntaken)
                    result.usersUntaken = [];
                 
                result.usersUntaken.push(req.params.user_id);
                 
                result.save(function(er, re) {
                    if (er)
                        return res.status(500).send(er);
                    else
                        res.send(re);  
                });
                
             }
        });
    } */
 
}