var mongoose = require('mongoose');

var LessonSchema = mongoose.Schema({
	topic: { type: String, required: true },
	sections: [{
		title: String,
		content: String,
		read: { type: [String], default: ['admin', 'mentor', 'student', 'instructor'] },
		edit: { type: [String], default: ['admin', 'mentor', 'instructor'] }
	}],
	instructor: { type: String}
})


module.exports = mongoose.model('Lesson', LessonSchema);