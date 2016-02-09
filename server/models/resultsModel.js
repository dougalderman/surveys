var mongoose = require('mongoose');
var answerSchema = require('./../schema/answerSchema.js');
var Schema = mongoose.Schema;
  
var resultsSchema = new Schema({
    survey: {type: Schema.Types.ObjectId, ref: 'Surveys'},
	user: {type: Schema.Types.ObjectId, ref: 'Users'},
	answers: [answerSchema]
});

module.exports =  mongoose.model('Results', resultsSchema);