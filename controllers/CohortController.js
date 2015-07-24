var Course = require('../models/CourseModel.js'),
	Cohort = require('../models/CohortModel.js'),
	Lesson = require('../models/LessonModel.js');

exports.createNewCohort = function(req, res) {
	console.log(req.body);
	Course.findById(req.body.courseType._id)
	.populate('curriculum.lesson')
	.lean()
	.exec(function(err, data) {
		if (err) {
			res.status(500).json(err);
		} else {
			// console.log(123123, data.curriculum);
			var arrayToUse = data.curriculum;
			console.log(987987, arrayToUse);

			new Cohort({
						name: req.body.name,
						courseType: req.body.courseType._id,
						curriculum: arrayToUse,
						startDate: req.body.startDate,
						location: req.body.location
			})

			// return console.log(newCohort);

			.save(function(err2, data2) {
				console.log('this is saved cohort', err2, data2);
				if (err2) {
					res.status(500).json(err2);
				} else {
					console.log(9990099, data2)
					res.json(data2);
				}
			})
		}
	})
};

exports.getCohort = function(req, res) {
	Cohort.findById(req.params.cohortId, function(err, data) {
		if (err) {
			res.status(500).json(err);
		} else {
			res.json(data);
		}
	})
};

exports.getAllCohorts = function(req, res) {
	Cohort.find({}, function(err, data) {
		if (err) {
			res.status(500).json(err);
		} else {
			res.json(data);
		}
	})
};