var mongoose = require('mongoose');
var Schema = mongoose.Schema;
  
var questionSchema = new Schema({
    questionText: {type: 'String', required: true},
	type: {type: 'String', lowercase: true, required: true, enum: ['numeric', 'boolean', 'text']},
	required: {type: 'Boolean', required: true, default: true},
	lowValue: {type: 'Number', min: 1},
	highValue: {type: 'Number', min: 1}
});

module.exports = questionSchema;