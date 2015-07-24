var Lesson = require('../models/LessonModel.js'),
	Course = require('../models/CourseModel.js');

exports.createNewCourse = function(req, res) {
	var daysArray = [];
	for (var i = 1; i <= req.body.courseLength; i++) {
		daysArray.push({day: i});
	}
	new Course({title: req.body.title, courseLength: req.body.courseLength, curriculum: daysArray})
	.save(function(err, data) {
		if (err) {
			res.status(500).json(err);
		} else {
			res.json(data);
		}
	})
};

exports.getCourse = function(req, res) {
	Course.findOne({_id: req.params.courseId}, function (err, data) {
		if (err) {
			res.status(500).json(err);
		} else {
			res.json(data);
		}
	})
};

exports.getAllCourses = function(req, res) {
	Course.find({}, function(err, data) {
		if (err) {
			res.status(500).json(err);
		} else {
			res.json(data);
		}
	})
}


exports.updateCourseCurriculum = function(req, res) {
	var data = req.body;

	Course.findOne({ 'curriculum._id' :  req.params.curriculumId}, function (err, course) {
		if (err) return res.status(500).send(err);
		course.curriculum[data.index - 1].lesson = data.lesson;

		course.save(function (err, result) {
			if (err) return res.status(500).send(err);

			// TODO: NEED TO POPULATE THE COURSES
			return res.json(course);
		})
	});
}

