angular.module('devKittens')

.service('authService', function ($http, $q) {

	this.createUser = function(name, email, password, courseId){
		if (courseId) {
			var permissions = {
				isStudent: {
					status: true,
					cohortId: courseId
				}
			}
		} else {
			var permissions = {
				isAdmin: true,
				isStudent: {
					status: false
				}
			}
		}

		var image = 'http://www.gravatar.com/avatar/' + md5(email) + '?d=https%3A%2F%2Fm2.behance.net%2Frendition%2Fpm%2F6507107%2Fdisp%2F05d8e97450a4564f4ca3d53c7a1544e9.png';

		return $http({
			method: 'POST',
			url: '/api/user',
			data: {
				name: name,
				email: email,
				avatar: image,
				password: password,
				permissions: permissions
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
})