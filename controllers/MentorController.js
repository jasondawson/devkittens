var exports = module.exports = {};

var User = require('../models/User.js');
var	Cohort = require('../models/CohortModel.js');
var	Mentor = require('../models/MentorModel.js');

exports.getAllMentors = function(req, res){
	Mentor.find({})
	.populate('userId')
	.exec(function(err, data) {
		res.json(data);
	})
}

exports.assignMentorCohortId = function(req, res){
	Mentor.findById(req.body._id, function (err, mentor) {
		if (err) return res.status(500).send(err);
		mentor.cohortId = req.params.cohortId;
		mentor.save(function (err, savedMentor) {
			if (err) return res.status(500).send(err);
			return res.json(savedMentor);
		})
	})
}