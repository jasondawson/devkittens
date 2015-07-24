var mongoose = require('mongoose'),
	Course = require('../models/CourseModel.js'),
	Schema = mongoose.Schema;

var cohortSchema = new Schema({
	name: {type: String, index: true, unique: true, required: true},
	courseType: {type: mongoose.Schema.Types.ObjectId, ref: "Course"},
	curriculum: [{day: Number, lesson: {topic: { type: String, required: true },
										sections: [{
											title: String,
											content: String,
											readPermissions: { type: [String], default: ['mentor', 'student', 'instructor'] },
											editPermissions: { type: [String], default: ['mentor', 'instructor'] }
										}],
										instructor: { type: String}}}],
	startDate: {type: Date, required: true},
	location: String
})

module.exports = mongoose.model("Cohort", cohortSchema);