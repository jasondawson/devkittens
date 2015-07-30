var Lesson = require('../models/LessonModel.js');
var Course = require('../models/CourseModel.js');

module.exports = {

	create: function(req, res){
		new Lesson(req.body)
		.save(function(err, data){
			if (err) {
				console.log(err);
				res.status(500).send(err);
			} else {
				res.send(data);
			}
		})
	},

	get: function(req, res){
		Lesson.find(req.query)
		.populate('teacher')
		.exec(function(err, data){
			if(err) return res.status(500).send(err);
			return res.send(data);
		})
	},

	getOne: function (req, res) {
		Course.findById(req.params.curriculumId, function (err, course) {
			if (err) return res.status(500).send(err);

			// get lesson id
			for (var i = 0; i < course.curriculum.length; i++) {
				if (course.curriculum[i]._id == req.params.dayId) {
					Lesson.findById(course.curriculum[i].lesson, function (err, lesson) {
						if (err) return res.status(500).send(err);
						if (lesson) return res.json(lesson);
					})
					return;
				}
			}
		})

	},

	update: function(req, res){
		console.log(1111111, req.body)
		Lesson.findByIdAndUpdate(req.query.id, req.body, function(err, data){
			if (err) return res.status(500).send(err);
			
			// Reflecting changes on curriculum;
			Course.findById(req.body.info.courseId, function (err, course) {
				course.curriculum.id(req.body.info.dayId).set({ topic: req.body.topic});
				console.log(22222222, course)
				course.save(function (err, savedCourse) {
					if (err) return res.status(500).send(err);
					return res.send(data);
				});
			})
		})
	},

	addSection: function(req, res){
		var body = req.body;
		Lesson.findOne({ _id: req.params.lessonId }, function(err, lesson){
			lesson.sections.push(body);
			lesson.save(function(err, data){
				res.send(data)
			})
		})
		//	Lesson.findByIdAndUpdate({ _id: req.params.lessonId }, { $push: { sections: body } }, function(err, data){
		// 	if (err) return res.status(500).send('there was an error');
		// 	return res.send(data);
		// })
	},

	updateSection: function(req, res) {
		var data = req.body;
		Lesson.update({ 'sections._id' : req.params.sectionId }, { $set:  data  }, function (err, data){
			if (err) return res.status(500).send(err);
			return res.send(data);
		})
	},

	removeSection: function(req, res){
		var data = req.body;
		Lesson.findOne({ 'sections._id' : req.params.sectionId }, function(err, lesson){
			lesson.sections.id(req.params.sectionId).remove();
			lesson.save(function(err, data){
				res.send(data);
			})
		})
		// Lesson.update({ 'sections._id' : req.params.sectionId }, { $pull: { 'sections' : { _id : req.params.sectionId }}  }, function(err, data){
		// 	if (err) return res.status(500).send('you need to enter the customer id');
		// 	return res.send(data);
		// })
	},

	delete: function(req, res){
		Lesson.findByIdAndRemove(req.query.id, function(err, data){
			if (err) return res.status(500).send(err);
			return res.send(data)
		})
	}

}
