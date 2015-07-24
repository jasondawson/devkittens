var mongoose = require('mongoose');

var LessonSchema = mongoose.Schema({
	topic: { type: String, required: true },
	sections: [{
		title: String,
		content: String,
		readPermissions: { type: [String], default: ['mentor', 'student', 'instructor'] },
		editPermissions: { type: [String], default: ['mentor', 'instructor'] }
	}],
	instructor: { type: String}
	
})


module.exports = mongoose.model('Lesson', LessonSchema);