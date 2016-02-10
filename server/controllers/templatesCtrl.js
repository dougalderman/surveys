var templatesModel = require('./../models/templatesModel.js');

module.exports = {
    
    create: function(req, res) {
        
        console.log('in templatesCtrl');
        console.log('in create');
        console.log('req.body = ', req.body);
      
        var newTemplate = new templatesModel(req.body)
        newTemplate.save(function(err, result) {
            if (err)
                return res.status(500).send(err);
            else 
                res.send(result);
        });
    },
    
    read: function(req, res) {
        console.log('in templatesCtrl');
        console.log('in read');
        console.log('req.params', req.params)
        templatesModel
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
        console.log('in templatesCtrl');
        console.log('in readNames');
        templatesModel
        .find({},'name')
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
        console.log('in templatesCtrl');
        console.log('in update');
        console.log('req.params = ', req.params)
        templatesModel
        .findById(req.params.id)
        .exec(function(err, result) {
            console.log('err', err);
            console.log('result', result);
            if (err) {
                console.log('in error routine');
                return res.status(500).send(err);
            }
            else {
                for (var p in req.body) {
                      if (req.body.hasOwnProperty(p)) {
                          result[p] = req.body[p];
                      }
                }
                result.save(function(er, re) {
                    if (er)
                        return res.status(500).send(er);
                    else
                        res.send(re);  
                });
                
             }
        });
    },
    
    delete: function(req, res) {
        console.log('in templatesCtrl');
        console.log('in update');
        console.log('req.params = ', req.params)
        templatesModel
        .findById(req.params)
        .exec(function(err, result) {
            console.log('err', err);
            console.log('result', result);
            if (err) {
                console.log('in error routine');
                return res.status(500).send(err);
            }
            else {
                result.delete(function(er, re) {
                    if (er)
                        return res.status(500).send(er);
                    else
                        res.send(re);  
                });
                
             }
        });
    }
 
 
}