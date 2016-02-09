var mongoose = require('mongoose');
var questionSchema = require('./../schema/questionSchema.js');
var Schema = mongoose.Schema;
  
var surveysSchema = new Schema({
    name: {type: 'String', required: true]},
	description: {type: 'String'},
	sentTo: [{type: Schema.Types.ObjectId, ref: 'Users'}],
	dateSent: {type: 'Date', required: true},
	topic: {type: 'String', required: true},
	results: [{type: Schema.Types.ObjectId, ref: 'Results'}],
	questions: [questionSchema]
});

module.exports =  mongoose.model('Surveys', surveysSchema);