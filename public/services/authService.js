angular.module('devKittens')

.service('authService', function ($http, $q) {

	this.createUser = function(name, email, password, courseId){
		if (courseId) {
			var permissions = {
				isStudent: {
					status: true,
					courseId: courseId
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

		return $http({
			method: 'POST',
			url: '/api/user',
			data: {
				name: name,
				email: email,
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