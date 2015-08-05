var User = require('../models/User.js'),
	Mentor = require('../models/MentorModel.js'),
	Instructor = require('../models/InstructorModel.js');

exports.instructorPermissions = function(req, res) {
	User.findById(req.params.userId, function(err, user) {
		if (err) {
			res.status(500).json(err);
		} else {
			console.log(1111, user.userType);
			if (req.body.mentor) {
				Mentor.findOne({"userId": req.params.userId}, function(err, mentor) {
					if (!err && !mentor) {
						new Mentor({
							userId: req.params.userId
						}).save();
					}
				})
			} else if (!req.body.mentor) {
				Mentor.findOne({"userId": req.params.userId}, function(err, mentor) {
					if (!err) {
						mentor.remove();
					}
				})
			}
			user.userType.mentor = req.body.mentor;
			user.userType.admin = req.body.admin;
			user.save(function(err, newUser) {
				if (err) {
					res.status(500).json(err);
				} else {
					console.log(3333, newUser.userType);
					res.json(newUser.userType);
				}
			});
		}
	})
}

exports.mentorPermissions = function(req, res) {
	User.findById(req.params.userId, function(err, user) {
		if (err) {
			res.status(500).json(err);
		} else {
			console.log(1111, user.userType);
			if (req.body.instructor) {
				Instructor.findOne({"userId": req.params.userId}, function(err, instructor) {
					if (!err && !instructor) {
						new Instructor({
							userId: req.params.userId
						}).save();
					}
				})
			} else if (!req.body.instructor) {
				Instructor.findOne({"userId": req.params.userId}, function(err, instructor) {
					if (!err) {
						instructor.remove();
					}
				})
			}
			user.userType.instructor = req.body.instructor;
			user.userType.admin = req.body.admin;
			user.save(function(err, newUser) {
				if (err) {
					res.status(500).json(err);
				} else {
					console.log(3333, newUser.userType);
					res.json(newUser.userType);
				}
			});
		}
	})
}