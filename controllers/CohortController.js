var Course = require('../models/CourseModel.js'),
	Cohort = require('../models/CohortModel.js'),
	Lesson = require('../models/LessonModel.js'),
	User   = require('../models/User.js');

// Create dates to populate the calendar.
var populateCalendar = function(startDate, numDays) {
	var datesArr = [startDate];
	var formattedDates = [];
	for(var i = 1; i < numDays; i++) {
		var tomorrow = datesArr[i - 1] + (1000 * 60 * 60 * 24);
		datesArr.push(tomorrow);
	}
	for(var i = 0; i < datesArr.length; i++) {
		formattedDates.push(new Date(datesArr[i]).toISOString());
	}
	// console.log('calendar Dates ', formattedDates);
	console.log('test date ', formattedDates[2]);
	return formattedDates;
}

// getQuarter(Date.now(), 90)

exports.createNewCohort = function(req, res) {
	console.log('curriculum', req.body)
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
					console.log(22222, 'err2', err2)

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
	Cohort.findById(req.params.cohortId)
	.populate('students')
	.exec(function (err, data) {
		console.log('data ', data)
		var dates = populateCalendar(data.startDate.getTime(), data.curriculum.length);
		data.dates = dates;
		console.log('data.dates ', data);
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
	console.log(22222, req.params, 3333333, req.body)
	Cohort.findOne({_id: req.params.cohortId}, function(err, data) {
		if (err) {
			res.status(500).json(err);
		} else {
			console.log(444444, data)
			var lesson;
			for (var i = 0; i < data.curriculum.length; i++) {
				if (data.curriculum[i]._id == req.params.dayId) {
					// lesson = data.curriculum[i].lesson;
					return res.json(data.curriculum[i]);
				}
			}
			// console.log(lesson);
			// res.json(lesson);
		}
	})
};


exports.updateLesson = function (req, res) {
	console.log(1111111, req.body, 2222222, req.params)
	var topic = req.body.topic;
	var sections = req.body.sections
	Cohort.findById(req.params.cohortId, function (err, cohort) {
		console.log('cohort', cohort);
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
		console.log('info', 4444444444444, cohort.curriculum.id(req.body.dayId).lesson)
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
