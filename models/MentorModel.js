var mongoose = require('mongoose');
	User = require('../models/User.js');
	Lesson = require('../models/LessonModel.js');
	Course = require('../models/CourseModel.js'),
	Schema = mongoose.Schema;

var MentorSchema = mongoose.Schema({
	  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
	, cohorts: [{
		  cohortId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" }
		, mentos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
		
	  }]
	, schedule: []
	, tasks: []
});

module.exports = mongoose.model('Mentor', MentorSchema);

