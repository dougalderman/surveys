var mongoose = require('mongoose');
var Schema = mongoose.Schema;
  
var answerSchema = new Schema({
    type: {type: 'String', lowercase: true, required: true, enum: ['numeric', 'boolean', 'text']},
	numericAnswer: {type: 'Number', min: 1},
	booleanAnswer: {type: 'Boolean' },
	textAnswer: {type: 'String'}
});

module.exports = answerSchema;