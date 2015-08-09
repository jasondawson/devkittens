var mongoose = require('mongoose'),
	User = require('../models/User.js'),
	Lesson = require('../models/LessonModel.js'),
	Cohort = require('../models/CohortModel.js'),
	Schema = mongoose.Schema;

var StudentSchema = mongoose.Schema({
	  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
	, cohortId: { type: mongoose.Schema.Types.ObjectId, ref: "Cohort" }
	, mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
	, somethingAboutCompleteAssignments: [String]
});

module.exports = mongoose.model('Student', StudentSchema);