angular.module('devKittens')

.service('loginService', function($http){

	this.createUser = function(newUser){
		return $http({
			method: 'POST',
			url: '/api/user',
			data: newUser
		});
	};

	this.userLogin = function(user){
		console.log('LOGIN SERVICE:', user);
		return $http({
			method: 'POST',
			url: '/api/login',
			data: user
		});
	};


});
