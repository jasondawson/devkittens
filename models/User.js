var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var UserSchema = mongoose.Schema({
	  local: {
	  	  email: { type: String, required: true }
	  	, password: { type: String, required: true }
	  }
	, name: String
	, avatar: String 
	// , permissions: {
	// 	  isAdmin: { type: Boolean, default: false }
	// 	, isMentor: { type: Boolean, default: false }
	// 	, isInstructor: { type: Boolean, default: false }
	// 	, isStudent: {
	// 		  status: { type: Boolean, default: true }
	// 		, cohortId: String
	// 	}
	// }
	// // mentor specific
	// , mentorData: {
	// 	mentos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserSchema' }],
	//   }
	// , mentorType: String
	// , seniority: Number
	// , cohort: String
	, userType: {type: mongoose.Schema.Types.ObjectId, ref: {type: String, enum: ["Mentor", "Instructor", "Student", "Admin"], default: "Student"}}

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
    return bcrypt.compareSync(password, this.local.password);
};

// exporting model
module.exports = mongoose.model('User', UserSchema);

// {
//     "local": {
//         "email": "yoda@gmail.com",
//         "password": "theforce"
//     },
//     "name": "Master Yoda",
//     "avatar": "http://www.magnifiedview.com/wp-content/uploads/2013/01/yoda-Avatar-3.jpg",
//     "permissions": {
//         "isAdmin": "true"
//     },
//     "mentorData": {
//         "mentos": "123412341234"
//     },
//     "mentorType": "Master Mentor",
//     "seniority": "5 months",
//     "cohort": "Full Immersive Web DM4"
// }