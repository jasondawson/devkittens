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
	updateSection: function(req, res){
		var data = req.body;
		Lesson.update({ 'sections._id' : req.params.sectionId }, { $set:  data  }, function(err, data){
			console.log(err, data)
			if (err) return res.status(500).send('you need to enter the customer id');
			return res.send(data);
		})
	},

	removeSection: function(req, res){
		var data = req.body;
		console.log('data', data)
		Lesson.update({ 'sections._id' : req.params.sectionId }, { $pull: { 'sections' : { _id : req.params.sectionId }}  }, function(err, data){
			console.log(err, data)
			if (err) return res.status(500).send('you need to enter the customer id');
			return res.send(data);
		})
	},

	delete: function(req, res){
		Lesson.findByIdAndRemove(req.query.id, function(err, data){
			if (err) return res.status(500).send(err);
			return res.send(data)
		})
	}

}
