angular.module('devKittens')

.controller('loginController', function($scope, authService, $location){

	$scope.login = function(email, password){
		authService.login(email, password).then(function(response){
			console.log(22222, response);
			$location.path('/dashboard');
		})
	}
})