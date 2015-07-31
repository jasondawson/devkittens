var mongoose = require('mongoose'),
	Course = require('../models/CourseModel.js'),
	Schema = mongoose.Schema;

var cohortSchema = new Schema({
	  name: {type: String, index: true, unique: true, required: true}
	, courseType: { type: mongoose.Schema.Types.ObjectId, ref: "Course" }
	, students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
	, curriculum: [{
		topic: String,
		lesson: {
			topic: String,
			sections: [{
				readPermissions: [{}],
				editPermissions: [{}],
				content: String,
				title: String
			}]
		},
		day: Date,
		instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
	}]
	, startDate: {type: Date, required: true}
	, location: String
})

cohortSchema.pre('save', function(next, startDate, curriculum) {
	var start = this.startDate.getTime();
	var datesArr = [start];
	var formattedDates = [];
	for(var i = 1; i < this.curriculum.length; i++) {
		var tomorrow = datesArr[i - 1] + (1000 * 60 * 60 * 24);
		datesArr.push(tomorrow);
	}
	for(var i = 0; i < datesArr.length; i++) {
		formattedDates.push(new Date(datesArr[i]));
		// console.log('formatted date ', formattedDates[i]);
	}


	for(var i = 0; i < formattedDates.length; i++) {
		this.curriculum[i].day = formattedDates[i];
	}
	next();
})

module.exports = mongoose.model("Cohort", cohortSchema);