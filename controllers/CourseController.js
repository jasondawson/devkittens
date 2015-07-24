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
	console.log(2222, req.body)
	var data = req.body.lesson;
	console.log(3333, req.params);
	Course.update({'curriculum._id': req.params.curriculumId}, {'$set': { 'curriculum.$.lesson': data }}, function (err, data) {
			if (err) {
				console.log(1111, err);
				res.status(500).json(err);
			} else {
				console.log(3333, data)
				res.json(data);
			}
		})
}

