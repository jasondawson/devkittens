angular.module('devKittens')

.service('authService', function ($http, $q) {

	this.createUser = function(name, email, password, userType, cohortId){

		if (userType != 'mentor' && userType != "instructor" && userType != 'admin') {
			var theType = 'student';
			cohortId = userType;
		} else {
			var theType = userType;
		}

		var image = 'http://www.gravatar.com/avatar/' + md5(email) + '?d=https%3A%2F%2Fm2.behance.net%2Frendition%2Fpm%2F6507107%2Fdisp%2F05d8e97450a4564f4ca3d53c7a1544e9.png';
		var data = {
			cohortId: cohortId,
			userType: theType,
			name: name,
			email: email,
			avatar: image,
			password: password
		}

		return $http.post('/api/user', data);

	}


	this.login = function(email, password){
		return $http({
			method: 'POST',
			url: '/auth/login',
			data: {
				email: email,
				password : password
			}
		})
	}
	
});