var exports = module.exports = {};

// Dependencies
var User = require('../models/User.js');

exports.get = function (req, res) {
	var id = req.params.id;

	User.findOne({ '_id' : id }, function (err, user) {
		if (err) return res.status(500).send(err);
		return res.json(user);
	})
}

exports.put = function (req, res) {
	var id = req.params.id;
	var permission = req.body.permission;

	User.findOne({ '_id' : id }, function (err, user) {
		if (err) res.status(500).send(err);

		switch (permission.type) {
			case 'isAdmin':
				user.permissions.isAdmin = permission.status;
				break;
			case 'isMentor':
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
	var data = req.body;
	var newUser = new User();

	newUser.local.email = data.email;
	newUser.local.password = data.password;
	newUser.name = data.name;
	newUser.permissions.isAdmin = true;
	newUser.permissions.isStudent = false;

	newUser.save(function (err, result) {
		if (err) return res.status(500).send(err);
		return res.json(result);
	})
}