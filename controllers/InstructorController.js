var Cohort = require('../models/CohortModel.js'),
	Instructor = require('../models/InstructorModel.js');

exports.getInstructorInfo = function(req, res) {
	Instructor.findOne({"userId": req.params.userId}, function(err, data) {
		if (err) {
			res.status(500).json(err);
		} else {
			res.json(data);
		}
	})
}

exports.addToInstructor = function(req, res) {
	Instructor.update({"userId": req.params.userId}, 
	{$push: {'schedule': req.body}},
	function(err, data) {
		if (err) {
			res.status(500).json(err);
		} else {
			res.json(data);
		}
	})
}

exports.addInstructor = function(req, res) {
	Cohort.findOne({"curriculum._id": req.params.dayId}, function(err, data) {
		if(err) {
			res.status(500).json(err);
		} else {
			var cohort = data;
			cohort.curriculum.id(req.params.dayId).set({instructor: req.body._id})
			cohort.save(function(err, newDay) {
				if(!err) {
					res.json(newDay);
				}
			})
		}
	})
}

exports.removeFromInstructor = function(req, res) {
	Instructor.findOne({"userId": req.params.userId}, function(err, data) {
		if (err) {
			res.status(500).json(err);
		} else {
			var instructor = data;
			for (var i = 0; i < instructor.schedule.length; i++) {
				if (instructor.schedule[i]._id == req.body._id) {
					instructor.schedule.splice(i, 1);
				}
			}
			instructor.save(function(err, newUser) {
				if (!err) {
					console.log(newUser);
					res.json(newUser);
				}
			})
		}
	})
}

exports.removeInstructor = function(req, res) {
	Cohort.findOne({"curriculum._id": req.params.dayId}, function(err, data) {
		if (err) {
			res.status(500).json(err);
		} else {
			var cohort = data;
			cohort.curriculum.id(req.params.dayId).set({instructor: null})
			cohort.save(function(err, newDay) {
				if (!err) {
					res.json(newDay);
				}
			})
		}
	})
}