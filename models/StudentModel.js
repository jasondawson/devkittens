var mongoose = require('mongoose');
	User = require('../models/User.js');
	Lesson = require('../models/LessonModel.js');
	Course = require('../models/CourseModel.js');
	Mentor = require('../models/MentorModel.js')
	Schema = mongoose.Schema;

var StudentSchema = mongoose.Schema({
	  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
	, cohortId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" }
	, mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
	, somethingAboutCompleteAssignments: [String]
});

module.exports = mongoose.model('Student', StudentSchema);