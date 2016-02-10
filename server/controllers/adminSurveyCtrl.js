var surveysModel = require('./../models/surveysModel.js');
var usersModel = require('./../models/usersModel.js');
var resultsModel = require('./../models/resultsModel.js');

module.exports = {
    
    create: function(req, res) {
        
        console.log('in adminSurveyCtrl');
        console.log('in create');
        console.log('req.body = ', req.body);
      
        var newSurvey = new surveysModel(req.body)
        newSurvey.save(function(err, result) {
            if (err)
                return res.status(500).send(err);
            else 
                res.send(result);
        });
    },
    
    read: function(req, res) {
        console.log('in adminSurveyCtrl');
        console.log('in read');
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
    
    readNames: function(req, res) {
        console.log('in adminSurveyCtrl');
        console.log('in readNames');
        surveysModel
        .find({},'name')
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
        console.log('in readNames');
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
    
    update: function(req, res) {
        console.log('in adminSurveyCtrl');
        console.log('in update');
        console.log('req.params = ', req.params);
        console.log('req.query = ', req.query);
        usersModel
        .find(req.query)
        .exec(function(err, result) {
            console.log('err', err);
            console.log('result', result);
            if (err) {
                console.log('in error routine');
                return res.status(500).send(err);
            }
            else {
                if (!result.requested_surveys)
                    result.requested_surveys = [];
                 
                result.requested_surveys.push(req.params.survey_id);
                    
                if (!result.requested_surveys)
                    result.requested_surveys = [];
                 
                result.requested_surveys.push(req.params.survey_id);
                 
                result.save(function(er, re) {
                    if (er)
                        return res.status(500).send(er);
                    else
                        res.send(re);  
                });
                
             }
        });
    }
 
}