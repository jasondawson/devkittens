var Cohort 			= require('../models/CohortModel.js'),
	User 			= require('../models/User.js'),
	Instructor 		= require('../models/InstructorModel.js'),
	ReservedLesson 	= require('../models/ReservedLessonModel.js');

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
				if (instructor.schedule[i]._id == req.params.dayId) {
					instructor.schedule.splice(i, 1);
				}
			}
			instructor.save(function(err, newUser) {
				if (!err) {
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

exports.createReserve = function(req, res) {
	new ReservedLesson({
		userId: req.params.userId,
		dayId: req.params.dayId
	}).save(function(err, data) {
		if (err) {
			res.status(500).json(err);
		} else {
			res.json(data);
		}
	})
}

exports.deleteReserve = function(req, res) {
	ReservedLesson.findOne({
		userId: req.params.userId,
		dayId: req.params.dayId
	}).remove(function(err, data) {
		if (err) {
			res.status(500).json(err);
		} else {
			res.json(data);
		}
	})
}

exports.assignToCohort = function (req, res) {
	req.body.userIds.forEach(function (userId) {		
		// Save to instructor's model
		Instructor.findById(userId, function (err, result) {
			result.cohorts.push(req.body.cohortId);

			// TODO: this gets triggered a ton of times, make it async
			result.save(function (err, saved) {
				if (err) return res.status(500).send(err);
				return res.json(saved);
			})
		})

		// Push instructor id to
		Cohort.findById(req.body.cohortId, function (err, result) {
			if (err) return res.status(500).send(err);

			result.instructors.push(userId);
			result.save();
		})
	})
}

exports.getCohortInstructors = function (req, res) {
	var cohortId = req.params.cohortId;
	var populateQuery = [{path:'instructors'}];

	Cohort.findById(cohortId)
	.populate(populateQuery)
	.exec(function (err, data) {
		if (err) res.status(500).send(err);
		
		Cohort.populate(data, {
			path: 'instructors.userId',
			model: 'User'
		},
		function (err, cleanCohort) {
			if (err) return res.status(500).send(err);
			return res.json(cleanCohort);
		})
	})
}


exports.getAllInstructors = function (req, res) {
	Instructor.find({})
	.populate('userId')
	.exec(function (err, instructors) {
		if (err) return res.status(500).send(err);
		return res.json(instructors);
	})
}


exports.teachRequest = function(req, res) {
	Cohort.findById(req.params.cohortId, function(err, cohort) {
		if (err) {
			res.status(500).json(err);
		} else {
			cohort.curriculum[req.params.dayIndex].wantsToTeach.push(req.body._id)
			cohort.save(function(err, data) {
				if (!err) {
					res.json(data);
				}
			})
		}
	})
}

exports.cancelRequest = function(req, res) {
	Cohort.findById(req.params.cohortId, function(err, cohort) {
		if (err) {
			res.status(500).json(err);
		} else {
			cohort.curriculum[req.params.dayIndex].wantsToTeach.remove(req.body._id)
			cohort.save(function(err, data) {
				if (!err) {
					res.json(data);
				}
			})
		}
	})
}

exports.deleteRequests = function(req, res) {
	Cohort.findById(req.params.cohortId, function(err, cohort) {
		if (err) {
			res.status(500).json(err);
		} else {
			req.curriculum[req.params.dayIndex].wantsToTeach.remove()
			cohort.save(function(err, data) {
				if (!err) {
					res.json(data);
				}
			})
		}
	})
}