var mongoose = require('mongoose'),
	Lesson = require('../models/LessonModel.js'),
	Schema = mongoose.Schema;

var courseSchema = new Schema({
	title: {type: String, index: true, unique: true, required: true},
	courseLength: {type: Number, required: true},
	curriculum: [{day: Number, lesson: {type: mongoose.Schema.Types.ObjectId, ref: "Lesson"}}]

});

module.exports = mongoose.model('Course', courseSchema);