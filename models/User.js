var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var UserSchema = mongoose.Schema({
	  local: {
	  	  email: { type: String, required: true }
	  	, password: { type: String, required: true }
	  }
	, name: String
	, avatar: String 
	, permissions: {
		  isAdmin: { type: Boolean, default: false }
		, isMentor: { type: Boolean, default: false }
		, isInstructor: { type: Boolean, default: false }
		, isStudent: { type: Boolean, default: true }
	}
	// mentor specific
	, mentorData: {
		  mentos: [
		  	{
		  		name: String
		  	, heartbeat: String
		  	,	email: String
		  	}
		  ]
		, mentorType: String
		, seniority: Number
		, cohort: String
		, duties: String
		, options: String
	}

	// TODO: Enable github info
	// , github: {
	// 	  userName: String
	// 	, img: String
	// 	, email: String
	// }	

})


// hash password
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// validate password
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// exporting model
module.exports = mongoose.model('User', UserSchema);