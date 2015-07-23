var mongoose = require('mongoose');

var LessonSchema = mongoose.Schema({
	topic: { type: String, required: true },
	preReading: [],
	objectives: [],
	miniProject: { type: String, required: true },
	project: { type: String, required: true },
	additionReading: { type: String, required: true },
	teacher: { type: String},
})


module.exports = mongoose.model('Lesson', LessonSchema);