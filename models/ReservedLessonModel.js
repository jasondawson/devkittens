var mongoose = require('mongoose'),
	User = require('../models/User.js'),
	Schema = mongoose.Schema;

var reservedSchema = new Schema({
	userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
	dayId: {type: mongoose.Schema.Types.ObjectId, ref: "Cohort.curriculum"}
});

module.exports = mongoose.model('ReservedLesson', reservedSchema);
