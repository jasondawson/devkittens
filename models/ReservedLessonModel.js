var mongoose = require('mongoose'),
	User = require('../models/User.js'),
	Schema = mongoose.Schema;

var reservedSchema = new Schema({
	userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
	dayId: String
});

module.exports = mongoose.model('ReservedLesson', reservedSchema);
