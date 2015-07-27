var mongoose = require('mongoose');
	User = require('..models/User.js');
	Lesson = require('..models/LessonModel.js');
	Course = require('../models/CourseModel.js'),
	Schema = mongoose.Schema;

var MentorSchema = mongoose.Schema({
	  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
	, cohortId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }]
	, mentorData: {
		mentos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	  }
	, mentorType: String
	, seniority: Number
});

module.exports = mongoose.model('')