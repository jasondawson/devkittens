var User = require('../models/User.js'),
	Cohort = require('../models/CohortModel.js');

exports.markAsCompleted = function(req, res) {
	Cohort.findOne({"curriculum._id": req.body.dayId})
	.exec(function(err, cohort) {
		if (err) {
			res.status(500).json(err);
		} else {
			cohort.curriculum[req.body.dayIndex].lesson.sections[req.body.sectionIndex].finishedStudents.push(req.body.userId);
			cohort.save(function(err, data) {
				res.json(data);
			})
		}
	})
}

exports.markAsIncomplete = function(req, res) {
	Cohort.findOne({"curriculum._id": req.body.dayId})
	.exec(function(err, cohort) {
		if (err) {
			res.status(500).json(err);
		} else {
			var whereToSplice = cohort.curriculum[req.body.dayIndex].lesson.sections[req.body.sectionIndex].finishedStudents.indexOf(req.body.userId);
			cohort.curriculum[req.body.dayIndex].lesson.sections[req.body.sectionIndex].finishedStudents.splice(whereToSplice, 1);
			cohort.save(function(err, data) {
				res.json(data);
			})
		}
	})
}