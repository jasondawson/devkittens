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

// TODO: FOR TESTING PURPOSES ONLY -- REPLACE BY ANDREW AUTH
exports.post = function (req, res) {
	
	var data = req.body;
	var newUser = new User();

	newUser.local.email = data.local.email;
	newUser.local.password = newUser.generateHash(req.body.local.password);
	newUser.name = data.name;
	// newUser.permissions.isAdmin = data.permissions.isAdmin;
	// newUser.permissions.isStudent = data.permissions.isStudent;
	newUser.save(function (err, result) {
		console.log(err, result);
		if (err) return res.status(500).send(err);
		
		return res.json(result);
	})
}

//////////////////
/// DEPRECATED ///
//////////////////

exports.get = function (req, res) {
	var id = req.params.id;

	User.findOne({ '_id' : id }, function (err, user) {
		if (err) return res.status(500).send(err);
		user.local.password = 'hidden';

		return res.json(user);
	})
}


// exports.put = function (req, res) {
// 	var id = req.params.id;
// 	var permission = req.body.permissions;

// 	User.findOne({ '_id' : id }, function (err, user) {
// 		if (err) res.status(500).send(err);

// 		switch (permission.type) {
// 			case 'isAdmin':
// 				user.permissions.isAdmin = permission.status;
// 				break;
// 			case 'isMentor':
// 				user.permissions.isMentor = permission.status;
// 				break;
// 			case 'isInstructor':
// 				user.permissions.isInstructor = permission.status;
// 				break;
// 			case 'isStudent':
// 				user.permissions.isStudent = permission.status;
// 				break;
// 		}

// 		user.save(function (err, result) {
// 			if (err) return res.status(500).send(err);
// 			return res.json(result);
// 		})

// 	})
// }


//////////////////
//////////////////
//////////////////