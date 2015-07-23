var mongoose = require('mongoose');

var LessonSchema = mongoose.Schema({
	name: { type: String, required: true },
	preReading: name: { type: String, required: true },
	toyProblem: {
        name: { type: String, required: true },
        startTime: { type: String, required: true},
        endTime
    },
	
	objectives: [],
	miniProject: { type: String, required: true },
	Project: { type: String, required: true },
	additionReading: { type: String, required: true },
	teacher: { type: String},
})


module.exports = mongoose.model('Lesson', CustomerSchema);