var Lesson = require('../models/LessonModel.js');

module.exports = {

	create: function(req, res){
		new Lesson(req.body)
		.save(function(err, data){
			if(err){
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
			if(err){
				res.error(500).send(err);
			} else {
				res.send(data);
			}
		})
	},

	update: function(req, res){
		Lesson.findByIdAndUpdate(req.query.id, req.body, function(err, data){
			if(err){
				res.error(500).send('you need to enter the customer id');
			} else {
				res.send(data);
			}
		})
	},

	delete: function(req, res){
		Lesson.findByIdAndRemove(req.query.id, function(err, data){
			if(err){
				res.status(500).send(err);
			} else {
				res.send(data)
			}
		})
	},

}
