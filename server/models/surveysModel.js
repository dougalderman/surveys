var mongoose = require('mongoose');
var questionSchema = require('./../schema/questionSchema.js');
var Schema = mongoose.Schema;
  
var surveysSchema = new Schema({
    name: {type: 'String', required: true},
	description: {type: 'String'},
	cohortSentTo: {type: 'Number', required: true},
    usersSentTo: [{type: Schema.Types.ObjectId, ref: 'Users'}],
	usersUntaken: [{type: Schema.Types.ObjectId, ref: 'Users'}],
	dateSent: {type: 'Date', required: true},
	topic: {type: Schema.Types.ObjectId, ref: 'Topics'},
	questions: [questionSchema]
});

module.exports =  mongoose.model('Surveys', surveysSchema);