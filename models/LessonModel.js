var mongoose = require('mongoose');

var LessonSchema = mongoose.Schema({
	topic: { type: String, required: true },
	sections: [{
		title: String,
		content: String,
		read: { type: [String], default: ['admin', 'mentor', 'student', 'instructor'] },
		edit: { type: [String], default: ['admin', 'mentor', 'instructor'] }
		// read: {
		// 	admin: {type: Boolean, default: true},
		// 	mentor: {type: Boolean, default: true},
		// 	student: {type: Boolean, default: true},
		// 	instructor: {type: Boolean, default: true},
		// },
		// edit: {
		// 	admin: {type: Boolean, default: true},
		// 	mentor: {type: Boolean, default: true},
		// 	student: {type: Boolean, default: false},
		// 	instructor: {type: Boolean, default: false},
		// }
	}],
	instructor: { type: String}
})


module.exports = mongoose.model('Lesson', LessonSchema);