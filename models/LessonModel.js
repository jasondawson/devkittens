var mongoose = require('mongoose');

var LessonSchema = mongoose.Schema({
	topic: { type: String, required: true },
	sections: [{
		title: String,
		content: String,
		readPermissions: [],
		updatePermissions: []
	}],
	instructor: { type: String}
	// preReading: [{
	// 	title: { type: String },
	// 	url: { type: String }
	// }],
	// objectives: [],
	// miniProject: [{ 
	// 	name: {type: String },
	// 	url: { type: String }
	// }],
	// project: [{ 
	// 	name: {type: String },
	// 	url: { type: String }
	// }],
	// additionReading: [{
	// 	title: { type: String },
	// 	url: { type: String }
	// }],
	
})


module.exports = mongoose.model('Lesson', LessonSchema);