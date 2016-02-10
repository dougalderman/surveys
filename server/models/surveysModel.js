var mongoose = require('mongoose');
var questionSchema = require('./../schema/questionSchema.js');
var Schema = mongoose.Schema;
  
var surveysSchema = new Schema({
    name: {type: 'String', required: true},
	description: {type: 'String'},
	cohortSentTo: {type: 'Number', required: true},
	dateSent: {type: 'Date', required: true},
	topic: {type: Schema.Types.ObjectId, ref: 'Topics'},
//	results: [{type: Schema.Types.ObjectId, ref: 'Results'}],
	questions: [questionSchema]
});

module.exports =  mongoose.model('Surveys', surveysSchema);