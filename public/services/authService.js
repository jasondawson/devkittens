angular.module('devKittens')

.service('authService', function ($http, $q) {

	this.createUser = function(name, email, password){
		return $http({
			method: 'POST',
			url: '/api/user',
			data: {
				name: name,
				email: email,
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
})