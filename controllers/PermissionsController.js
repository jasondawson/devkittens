var User = require('../models/User.js'),
	Mentor = require('../models/MentorModel.js'),
	Instructor = require('../models/InstructorModel.js'),
	Student = require('../models/StudentModel.js');
	Cohorts = require('../models/CohortModel.js');

exports.instructorPermissions = function(req, res) {
	User.findById(req.params.userId, function(err, user) {
		if (err) {
			res.status(500).json(err);
		} else {
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
					if (!err && mentor) {
						mentor.remove();
					}
				})
			}
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
					if (!err && instructor) {
						instructor.remove();
					}
				})
			}
			if (req.body.student) {
				Student.findOne({"userId": req.params.userId}, function(err, student) {
					if (!err && !student) {
						new Student({
							userId: req.params.userId
						}).save();
					}
				})
			} else if (!req.body.student) {
				Student.findOne({"userId": req.params.userId}, function(err, student) {
					if (!err && student) {
						student.remove();
					}
				})
			}
			user.userType.mentor = req.body.mentor;
			user.userType.admin = req.body.admin;
			user.userType.instructor = req.body.instructor;
			user.userType.student = req.body.student;
			user.save(function(err, newUser) {
				if (err) {
					res.status(500).json(err);
				} else {
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
					if (!err && instructor) {
						instructor.remove();
					}
				})
			}
			if (req.body.mentor) {
				Mentor.findOne({"userId": req.params.userId}, function(err, mentor) {
					if (!err && !mentor) {
						new Mentor({
							userId: req.params.userId
						}).save();
					}
				})
			} else if (!req.body.mentor) {
				Cohorts.find({'mentors.userId': req.params.userId}, function(err, cohorts) {
					if (!err && cohorts) {
						console.log(cohorts)
						for (var i = 0; i < cohorts.length; i++) {
							for (var j = 0; j < cohorts[i].students.length; j++) {
								if (cohorts[i].students[j].mentor == req.params.userId) {
									console.log('we have a match')
									cohorts[i].students[j].set({ mentor : null, assigned: false});
									cohorts[i].save(function(err, data){
										console.log('error', err, 'data', data)
									});
								}
							}
						}
					}
				})
				Mentor.findOne({"userId": req.params.userId}, function(err, mentor) {
					if (!err && mentor) {
						mentor.remove();
					}
				})
			}
			if (req.body.student) {
				Student.findOne({"userId": req.params.userId}, function(err, student) {
					if (!err && !student) {
						new Student({
							userId: req.params.userId
						}).save();
					}
				})
			} else if (!req.body.student) {
				Student.findOne({"userId": req.params.userId}, function(err, student) {
					if (!err && student) {
						student.remove();
					}
				})
			}
			user.userType.instructor = req.body.instructor;
			user.userType.admin = req.body.admin;
			user.userType.mentor = req.body.mentor;
			user.userType.student = req.body.student;
			user.save(function(err, newUser) {
				if (err) {
					res.status(500).json(err);
				} else {
					res.json(newUser.userType);
				}
			});
		}
	})
}