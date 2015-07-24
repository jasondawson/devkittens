angular.module('devKittens')

.controller('LoginController', function ($scope, loginService) {

	$scope.createUser = function(newUser){
		newUser = newUser;
		loginService.createUser(newUser).then(function(response){
			console.log(response);
		});
	};

	$scope.userLogin = function(user){
		user = user;
		loginService.userLogin(user).then(function(response){
			console.log(response);
		});
	};


});
