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
	console.log(1111111, req.body)
	var cohort = {
		cohortId: req.params.cohortId,
		mentos: []
	}
	Mentor.findOne({ userId: req.body._id }, function (err, mentor) {
		if (err) return res.status(500).send(err);
		console.log(2222222222222, mentor)
		mentor.cohorts.push(cohort);
		mentor.save(function (err, savedMentor) {
			if (err) return res.status(500).send(err);
			return res.json(savedMentor);
		})
	})
}