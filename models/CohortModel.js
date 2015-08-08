var mongoose = require('mongoose'),
	Course = require('../models/CourseModel.js'),
	User = require('../models/User.js'),
	Instructor = require('../models/InstructorModel.js'),
	Mentor = require('../models/MentorModel.js'),
	Schema = mongoose.Schema;

var cohortSchema = new Schema({
	  name: {type: String, index: true, unique: true, required: true}
	, courseType: { type: mongoose.Schema.Types.ObjectId, ref: "Course" }
	, students: [{ 
		userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		mentor: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
	}]
	, instructors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Instructor" }]
	, mentors: [{
		userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		students: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
	}]
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
		wantsToTeach: [{ type: mongoose.Schema.Types.ObjectId, ref: "User"}],
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

	for(var i = 0; i < formattedDates.length; i++) {
		this.curriculum[i].day = formattedDates[i];
	}


	next();
})

module.exports = mongoose.model("Cohort", cohortSchema);