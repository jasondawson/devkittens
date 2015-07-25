angular.module('devKittens')

.controller('HomeController', function ($scope, authService, $location) {

	

	$scope.login = function(email, password){
		authService.login(email, password).then(function(response){
			$location.path('/dashboard');
		})
	}


});