var exports = module.exports = {};

// Dependencies
var User = require('../models/User.js');
var Student = require('../models/StudentModel.js');
var Mentor = require('../models/MentorModel.js');
var Instructor = require('../models/InstructorModel.js');


exports.getAll = function (req, res) {
	User.find({}, function (err, users) {
		if (err) return res.status(500).send(err);
		
		// TODO: remove passwords
		return res.json(users);
	})
}

exports.put = function (req, res) {
	var id = req.params.id;
	

	User.findOne({ '_id' : id }, function (err, user) {
		// Do some error handling
		if (!req.body.name || !req.body.local.email) return res.status(500).send('Missing information.');

		user.name = req.body.name;
		user.local.email = req.body.local.email;

		if (req.body.githubUrl) user.githubUrl = req.body.githubUrl;
		if (req.body.local.password) user.local.password = user.generateHash(req.body.local.password);

		user.save(function (err, result) {
			if (err) return res.status(500).send(err);
			return res.json(result);
		})

	})
}

exports.getTypeData = function (req, res) {
	switch(req.body.userType) {
	    case 'student':
	        Student.find({'userId':req.body._id}, function (err, student) {
	        	if (err) return res.status(500).send(err);
	        	return res.json(student);
	        })
	        break;
	    case 'mentor':
	        Mentor.find({'userId':req.body._id}, function (err, mentor) {
	        	if (err) return res.status(500).send(err);
	        	return res.json(mentor);
	        })
	        break;
        case 'instructor':
	        Instructor.find({'userId':req.body._id}, function (err, instructor) {
	        	if (err) return res.status(500).send(err);
	        	return res.json(instructor);
	        })
	        break;
	    default:
	        res.send(req.body);
	}
}


exports.post = function (req, res) {
	
	var data = req.body;
	var newUser = new User();

	newUser.local.email = data.local.email;
	newUser.local.password = newUser.generateHash(req.body.local.password);
	newUser.name = data.name;
	// newUser.permissions.isAdmin = data.permissions.isAdmin;
	// newUser.permissions.isStudent = data.permissions.isStudent;
	newUser.save(function (err, result) {
		if (err) return res.status(500).send(err);
		
		return res.json(result);
	})
}