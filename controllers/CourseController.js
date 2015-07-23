var Lesson = require('../models/LessonModel.js'),
	Course = require('../models/CourseModel.js');

exports.createNewCourse = function(req, res) {
	new Course({title: req.body.title, courseLength: req.body.courseLength})
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
}