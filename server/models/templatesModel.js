var mongoose = require('mongoose');
var questionSchema = require('./../schema/questionSchema.js');
var Schema = mongoose.Schema;
  
var templatesSchema = new Schema({
    name: {type: 'String', required: true},
	description: {type: 'String'},
	questions: [questionSchema]
});

module.exports =  mongoose.model('Templates', templatesSchema);