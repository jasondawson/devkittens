var mongoose = require('mongoose'),
	Course = require('../models/CourseModel.js'),
	Schema = mongoose.Schema;

var cohortSchema = new Schema({
	  name: {type: String, index: true, unique: true, required: true}
	, courseType: { type: mongoose.Schema.Types.ObjectId, ref: "Course" }
	, students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
	, instructors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Instructor" }]
	, curriculum: [{
			topic: String,
			lesson: {
				topic: String,
			sections: [{
				read: [],
				edit: [],
				content: String,
				title: String,
				finishedStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: "User"}]
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

	if(this.startDate.getDay() !== 1) {
		var numDay = this.startDate.getDay() - 1;
		start = this.startDate.getTime() - ((1000 * 60 * 60 * 24) * (numDay));
	}

	var datesArr = [start];
	var formattedDates = [];

	for(var i = 1; i < this.curriculum.length; i++) {
		var tomorrow = datesArr[i - 1] + (1000 * 60 * 60 * 24);
		datesArr.push(tomorrow);
	}

	for(var i = 0; i < datesArr.length; i++) {
		formattedDates.push(new Date(datesArr[i]));
	}

	console.log('last day in array ', formattedDates[formattedDates.length - 1].getDay());

	var numDaysToAdd = 7 - (formattedDates[formattedDates.length - 1].getDay());
	console.log('numDaysToAdd ', numDaysToAdd);

	if(formattedDates[formattedDates.length - 1].getDay() !== 0) {
		for(var i = 0; i < numDaysToAdd; i++) {
			var endDate = (formattedDates[formattedDates.length - 1].getTime()) * (1000 * 60 * 60 * 24);
			formattedDates.push(new Date(endDate));
		}
	}
	
	console.log('formattedDates ', formattedDates[formattedDates.length - 1]);
	console.log('formattedDates.length ', formattedDates.length);
	console.log('curriculum.length ', this.curriculum.length);

	for(var i = 0; i < formattedDates.length; i++) {
		this.curriculum[i].day = formattedDates[i];
	}


	next();
})

module.exports = mongoose.model("Cohort", cohortSchema);