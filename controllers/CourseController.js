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
	Course.findOne({_id: req.params.courseId})
	.populate('curriculum.lesson')
	.exec(function (err, data) {
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
			Course
				.findById({ '_id': course._id })
				.populate('curriculum.lesson')
				.exec(function(err, data){
					return res.json(data);
				})

			// TODO: NEED TO POPULATE THE COURSES
			
		})
	});

	// Course.update({ 'curriculum._id' :  req.params.curriculumId}, { $set: {'curriculum.$.lesson': data.lesson}}, function (err, data) {
	// 	if (err) {
	// 		console.log(2222, err)
	// 		return res.status(500).send(err);
	// 	}
	// 	Course.find(
	// 		{ 'curriculum._id' :  req.params.curriculumId },
	// 		function(err, data){
	// 			if (err) {
	// 				return res.status(500).send(err)
	// 			}
	// 			data[0]
	// 			.populate('curriculum.lesson')
	// 			.exec(function(err, result){
	// 				console.log(33333, result)
	// 			})
	// 		}
	// 	)
		// .populate('curriculum.lesson')
		// .exec(function(err, course){
		// 	if (err) {
		// 		// console.log(333, err)
		// 		return res.status(500).send(err)
		// 	}
		// 	// console.log(4444, course)
		// 	return res.json(course)
		// })
	// });
}

