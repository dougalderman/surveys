var mongoose = require('mongoose');
var Schema = mongoose.Schema;
  
var topicsSchema = new Schema({
    name: {type: 'String', required: true}
});

module.exports =  mongoose.model('Topics', topicsSchema);