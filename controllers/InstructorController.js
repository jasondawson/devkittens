var Cohort = require('../models/CohortModel.js'),
	Instructor = require('../models/InstructorModel.js');


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
			console.log(111, cohort, 222, req.body._id)
			cohort.curriculum.id(req.params.dayId).set({instructor: req.body._id})
			cohort.save(function(err, newDay) {
				if(!err) {
					console.log(newDay)
					res.json(newDay);
				}
			})
		}
	})
}