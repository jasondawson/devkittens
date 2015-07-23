var mongoose = require('mongoose');

var LessonSchema = mongoose.Schema({
	topic: { type: String, required: true },
	preReading: [{
		title: { type: String },
		url: { type: String }
	}],
	objectives: [],
	miniProject: { 
		name: {type: String },
		url: { type: String }
	},
	project: { 
		name: {type: String },
		url: { type: String }
	},
	additionReading: [{
		title: { type: String },
		url: { type: String }
	}],
	teacher: { type: String},
})


module.exports = mongoose.model('Lesson', LessonSchema);