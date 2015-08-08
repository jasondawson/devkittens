var Course 		= require('../models/CourseModel.js'),
	Cohort 		= require('../models/CohortModel.js'),
	Instructor 	= require('../models/InstructorModel.js'),
	Lesson 		= require('../models/LessonModel.js'),
	User   		= require('../models/User.js');


exports.createNewCohort = function(req, res) {
	Course.findById(req.body.courseType._id)
	.populate('curriculum.lesson')
	.lean()
	.exec(function(err, data) {
		if (err) {
			res.status(500).json(err);
		} else {
			var arrayToUse = data.curriculum;
			new Cohort({
						name: req.body.name,
						courseType: req.body.courseType._id,
						curriculum: arrayToUse,
						startDate: req.body.startDate,
						location: req.body.location
			})

			.save(function(err2, data2) {
				if (err2) {
					res.status(500).json(err2);
				} else {
					res.json(data2);
				}
			})
		}
	})
};

exports.updateLessonOrder = function (req, res) {
	var cohortId = req.params.cohortId;
	Cohort.findById(cohortId, function (err, cohort) {
		if (err) return res.status(500).send(err);
		
		var newCourse = [];
		
		req.body.forEach(function (courseId) {
			cohort.curriculum.forEach(function (lesson) {
				if (courseId == lesson._id) {
					newCourse.push(lesson);
				}
			})
		})

		cohort.curriculum = newCourse;
		cohort.save(function (err, result) {
			if (err) return res.status(500).send(err);
			return res.json(result);
		});
	})
};

exports.getCohort = function(req, res) {
	var populateQuery = [{path:'students.userId'}, {path:'students.mentor'}, {path:'instructors'}, {path:'mentors.userId'}];

	Cohort.findById(req.params.cohortId)
	.populate(populateQuery)
	.populate('curriculum.wantsToTeach')
	.exec(function (err, data) {
		res.json(data);
	})
};


// TODO: This is going to be a huge request but I'll do it for you becaues I really care
exports.getAllCohorts = function(req, res) {
	Cohort.find({}, function(err, data) {
		if (err) {
			res.status(500).json(err);
		} else {
			res.json(data);
		}
	})
};


exports.getCohortDay = function(req, res) {
	Cohort.findOne({_id: req.params.cohortId})
	.populate('curriculum.instructor')
	.populate('curriculum.wantsToTeach')
	.exec(function(err, data) {
		if (err) {
			res.status(500).json(err);
		} else {
			for (var i = 0; i < data.curriculum.length; i++) {
				if (data.curriculum[i]._id == req.params.dayId) {
					
					return res.json(data.curriculum[i]);
				}
			}
		}
	})
};


exports.updateMentorGroup = function (req, res) {
	Cohort.findById(req.params.cohortId, function (err, cohort) {
		if (err) {
			res.status(500).send(err);
		}
		cohort.mentors.id(req.body._id).set({ 'students' : req.body.students })
		cohort.save(function(err, data){
			if (err) res.status(500).send(err);
			res.send(data);
		})
	})
}


exports.updateLesson = function (req, res) {
	var topic = req.body.topic;
	var sections = req.body.sections
	Cohort.findById(req.params.cohortId, function (err, cohort) {
		cohort.curriculum.id(req.body.dayId).set({topic: topic});
		cohort.curriculum.id(req.body.dayId).set({ lesson: { topic: topic, sections: sections } });
		cohort.save(function(err, data){
			res.send(data)
		})
	})
};

exports.addSection = function(req, res){
	Cohort.findById(req.params.cohortId, function(err, cohort){
		cohort.curriculum.id(req.params.dayId).lesson.sections.push(req.body);
		cohort.save(function(err, data){
			res.send(data.curriculum.id(req.params.dayId))
		})
	})
};

exports.removeSection = function(req, res){
	var data = req.body;
	Cohort.findById(req.body.cohortId , function(err, cohort){
		cohort.curriculum.id(req.body.dayId).lesson.sections.id(req.body.sectionId).remove();
		cohort.save(function(err, data){
			res.send(data);
		})
	})
	// Lesson.update({ 'sections._id' : req.params.sectionId }, { $pull: { 'sections' : { _id : req.params.sectionId }}  }, function(err, data){
	// 	if (err) return res.status(500).send('you need to enter the customer id');
	// 	return res.send(data);
	// })
};




// DEPRECATED 
// Create dates to populate the calendar.
// var populateCalendar = function(startDate, numDays) {
// 	var datesArr = [startDate];
// 	var formattedDates = [];
// 	for(var i = 1; i < numDays; i++) {
// 		var tomorrow = datesArr[i - 1] + (1000 * 60 * 60 * 24);
// 		datesArr.push(tomorrow);
// 	}
// 	for(var i = 0; i < datesArr.length; i++) {
// 		formattedDates.push(new Date(datesArr[i]));
// 	}
// 	return formattedDates;
// }

// getQuarter(Date.now(), 90)


// BREAKS UP THE CALENDAR BASED ON THE MONTH - PUTS EACH MONTH IN IT'S OWN ARRAY
// function splitArr(arr) {
// 	var newArr = []
// 	var start = 0;
// 	var last;
// 	for(var i = 0; i < arr.length; i++) {
// 		if(arr[i] === arr.length) {
// 			newArr.push(arr.splice(start, arr.length + 1))
// 		}
		
// 		if(arr[i] === 1) {
// 			last = i;
// 			newArr.push(arr.splice(start, last));
//             i = 0;
//             last = 0;
// 		}
// 	}
// 	return newArr;
// }
