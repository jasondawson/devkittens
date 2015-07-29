angular.module('devKittens')

.service('authService', function ($http, $q) {

	this.createUser = function(name, email, password, courseId){
		
		if (courseId != 'mentor' && courseId != "instructor") {
			var theType = 'student';
		} else {
			var theType = courseId;
		}

		var image = 'http://www.gravatar.com/avatar/' + md5(email) + '?d=https%3A%2F%2Fm2.behance.net%2Frendition%2Fpm%2F6507107%2Fdisp%2F05d8e97450a4564f4ca3d53c7a1544e9.png';

		return $http({
			method: 'POST',
			url: '/api/user',
			data: {
				cohortId: courseId,
				userType: theType,
				name: name,
				email: email,
				avatar: image,
				password: password
			}
		})
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