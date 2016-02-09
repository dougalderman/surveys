var mongoose = require('mongoose');
var Schema = mongoose.Schema;
  
var usersSchema = new Schema({
    first_name: {type: 'String', required: true},
	last_name: {type: 'String', required: true},
	student_id: {type: 'Number', required: true},
	cohort:  {type: 'Number', required: true},
	email: {type: 'String', required: true},
	password: {type: 'String', required: true},
	roles: [{type: 'String', required: true}],
	requested_surveys: [{type: Schema.Types.ObjectId, ref: 'Surveys'}],
	untaken_surveys: [{type: Schema.Types.ObjectId, ref: 'Surveys'}]
});

module.exports =  mongoose.model('Users', usersSchema);