var exports = module.exports = {};

// Dependencies
var User = require('../models/User.js');


exports.getAll = function (req, res) {
	User.find({}, function (err, users) {
		if (err) return res.status(500).send(err);

		// TODO: remove passwords
		user.local.password = 'hidden';
		return res.json(users);
	});
};


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
		});

	});
};

// AUTHENTICATION
exports.register = function(req, res) {
	var newUser = new User(req.body);
	newUser.save(function(err, user) {
		if(err) return res.send(err);
		user.password = null;
		return res.send(user);
	});
};

exports.me = function(req, res) {
	if (!req.user) return res.send("current user not defined");
	req.user.password = null;
	return res.json(req.user);
};

exports.update = function(req, res, done) {
    User.findByIdAndUpdate(req.user._id, req.body, function(err, result) {
      if (err) done(err);
      res.sendStatus(200);
    });
};

// DEPRECATED
exports.get = function (req, res) {
	var id = req.params.id;

	User.findOne({ '_id' : id }, function (err, user) {
		if (err) return res.status(500).send(err);
		user.local.password = 'hidden';

		return res.json(user);
	});
};





// FOR CHANGING PASSWORD LATER
// exports.update = function(req, res, done) {
// 	User.findByIdAndUpdate(req.user._id, req.body, function(err, result) {
// 		if (err) done(err);
// 		res.sendStatus(200);
// 	});
// };





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
