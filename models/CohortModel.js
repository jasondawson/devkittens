var mongoose = require('mongoose'),
	Course = require('../models/CourseModel.js'),
	Schema = mongoose.Schema;

var cohortSchema = new Schema({
	  name: {type: String, index: true, unique: true, required: true}
	, courseType: { type: mongoose.Schema.Types.ObjectId, ref: "Course" }
	, students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
	, curriculum: [{
		topic: String,
		lesson: {},
		day: Number,
		instructor: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
	}]
	, startDate: {type: Date, required: true}
	, dates: [ String ]
	, location: String
})

// cohortSchema.pre('save', function(startDate, duration, next) {
// 	var datesArr = [startDate];
// 	var formattedDates = [];
// 	for(var i = 1; i < duration; i++) {
// 		var tomorrow = datesArr[i - 1] + (1000 * 60 * 60 * 24);
// 		datesArr.push(tomorrow);
// 	}
// 	for(var i = 0; i < datesArr.length; i++) {
// 		formattedDates.push(new Date(datesArr[i]))
// 	}

// 	this.dates = formattedDates;
// 	next();
// })

module.exports = mongoose.model("Cohort", cohortSchema);