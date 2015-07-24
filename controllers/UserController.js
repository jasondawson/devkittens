var exports = module.exports = {};

// Dependencies
var User = require('../models/User.js');


exports.getAll = function (req, res) {
	User.find({}, function (err, users) {
		if (err) return res.status(500).send(err);
		
		// TODO: remove passwords
		return res.json(users);
	})
}

exports.put = function (req, res) {
	var id = req.params.id;
	var permission = req.body.permissions;

	User.findOne({ '_id' : id }, function (err, user) {
		if (err) res.status(500).send(err);

		switch (permission.type) {
			case 'isAdmin':
				user.permissions.isAdmin = permission.status;
				break;
			case 'isMentor':
				console.log(permission.status, permission.type);
				user.permissions.isMentor = permission.status;
				break;
			case 'isInstructor':
				user.permissions.isInstructor = permission.status;
				break;
			case 'isStudent':
				user.permissions.isStudent = permission.status;
				break;
		}

		user.save(function (err, result) {
			if (err) return res.status(500).send(err);
			return res.json(result);
		})

	})
}

// TODO: FOR TESTING PURPOSES ONLY -- REPLACE BY ANDREW AUTH
exports.post = function (req, res) {
	console.log('req.body ', req.body);
	var data = req.body;
	var newUser = new User(req.body);

	// newUser.local.email = data.local.email;
	// newUser.local.password = data.local.password;
	// newUser.name = data.name;
	// newUser.permissions.isAdmin = data.permissions.isAdmin;
	// newUser.permissions.isStudent = data.permissions.isStudent;


	newUser.save(function (err, result) {
		console.log(err, result);
		if (err) return res.status(500).send(err);
		return res.json(result);
	})
}

// DEPRECATED
exports.get = function (req, res) {
	var id = req.params.id;

	User.findOne({ '_id' : id }, function (err, user) {
		if (err) return res.status(500).send(err);
		user.local.password = 'hidden';

		return res.json(user);
	})
}


// DUMMY DATA TO CREATE USER:
// {
//     "local": {
//         "email" : "jeremy@gmail.com",
//         "password" : "McAndCheese"
//     },
//     "name" : "Jeremy",
//     "permissions": {
//         "isAdmin": "true",
//         "isStudent": "false"
//     }
// }