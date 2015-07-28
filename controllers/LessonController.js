var Lesson = require('../models/LessonModel.js');

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

	update: function(req, res){
		Lesson.findByIdAndUpdate(req.query.id, req.body, function(err, data){
			if (err) return res.status(500).send('you need to enter the customer id');
			return res.send(data);
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
  // 		Lesson.findByIdAndUpdate({ _id: req.params.lessonId }, { $push: { sections: body } }, function(err, data){
		// 	if (err) return res.status(500).send('there was an error');
		// 	console.log(11111, data)
		// 	return res.send(data);
		// })
	},

	updateSection: function(req, res){
		var data = req.body;
		Lesson.update({ 'sections._id' : req.params.sectionId }, { $set:  data  }, function(err, data){
			if (err) return res.status(500).send('you need to enter the customer id');
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
		// 	console.log(err, data)
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
