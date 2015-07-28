var Course = require('../models/CourseModel.js'),
	Cohort = require('../models/CohortModel.js'),
	Lesson = require('../models/LessonModel.js'),
	User   = require('../models/User.js');

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
}

exports.getCohort = function(req, res) {
	Cohort.findById(req.params.cohortId)
	.populate('students')
	.exec(function (err, data) {
		res.json(data);
	})
};


// TODO: This is going to be a huge request
exports.getAllCohorts = function(req, res) {
	Cohort.find({}, function(err, data) {
		if (err) {
			res.status(500).json(err);
		} else {
			res.json(data);
		}
	})
};