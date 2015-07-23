var mongoose = require('mongoose');

var LessonSchema = mongoose.Schema({
	name: { type: String, required: true },
	preReading: { type: String, required: true },
	objectives: [],
	miniProject: { type: String, required: true },
	Project: { type: String, required: true },
	additionReading: { type: String, required: true },
	teacher: { type: String},
})


module.exports = mongoose.model('Lesson', LessonSchema);