var mongoose = require('mongoose'),
	User = require('../models/User.js'),
	Lesson = require('../models/LessonModel.js'),
	Cohort = require('../models/CohortModel.js'),
	Schema = mongoose.Schema;

var instructorSchema = new Schema({
	userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
	cohorts: [{type: mongoose.Schema.Types.ObjectId, ref: "Cohort"}],
	rating: Number,
	comments: [String],
	skills: [String],
	schedule: [{date: Date, lesson: {type: mongoose.Schema.Types.ObjectId, ref: "Lesson"}}]
})

module.exports = mongoose.model('Instructor', instructorSchema);