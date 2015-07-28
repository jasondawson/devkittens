var mongoose = require('mongoose');
	User = require('..models/User.js');
	Lesson = require('..models/LessonModel.js');
	Course = require('../models/CourseModel.js');
	Mentor = require('../models/Mentor')
	Schema = mongoose.Schema;

var StudentSchema = mongoose.Schema({
	  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
	, cohortId: {[ type: mongoose.Schema.Types.ObjectId, ref: "Course" ]}
	, mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('');