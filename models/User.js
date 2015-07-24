var mongoose = require('mongoose');
var bcrypt   = require('bcryptjs');

var UserSchema = mongoose.Schema({
	  local: {
	  	  email: { type: String, required: true },
	   	  password: { type: String, required: true }
	  },
	  name: String,
	  permissions: {
		  isAdmin: { type: Boolean, default: false },
		  isMentor: { type: Boolean, default: false },
		  isInstructor: { type: Boolean, default: false },
		  isStudent: { type: Boolean, default: true }
	},
	// mentor specific
	  mentorData: {
		  mentos: [String],
		  mentorType: String,
		  seniority: Number,
		  cohort: String
	}

	// TODO: Enable github info
	// , github: {
	// 	  userName: String
	// 	, img: String
	// 	, email: String
	// }

});

UserSchema.pre('save', function(next) {
  var user = this;

  if (!user.isModified('password'))	return next();
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(user.local.password, salt);

  user.local.password = hash;
  return next(null, user);
});

UserSchema.methods.verifyPassword = function(reqBodyPassword) {
  var user = this;
  return bcrypt.compareSync(reqBodyPassword, user.password);
};



// // hash password
// UserSchema.methods.generateHash = function(password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };

// // validate password
// UserSchema.methods.validPassword = function(password) {
//     return bcrypt.compareSync(password, this.password);
// };

// exporting model
module.exports = mongoose.model('User', UserSchema);
