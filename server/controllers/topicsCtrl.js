var topicsModel = require('./../models/topicsModel.js');

module.exports = {
    
    create: function(req, res) {
        
        console.log('in topicsCtrl');
        console.log('in create');
        console.log('req.body = ', req.body);
      
        var newTopic = new topicsModel(req.body)
        newTopic.save(function(err, result) {
            if (err)
                return res.status(500).send(er);
            else 
                res.send(result);
        });
    },
    
    read: function(req, res) {
        console.log('in topicsCtrl');
        console.log('in read');
        console.log('req.query = ', req.query)
        topicsModel
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
    
    
    delete: function(req, res) {
        console.log('in topicsCtrl');
        console.log('in update');
        console.log('req.params = ', req.params)
        topicsModel
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