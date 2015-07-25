angular.module('devKittens')

.controller('registrationController', function($scope, authService){
	$scope.errorMessage = '';
	$scope.createUser = function(name, email, password, confirmPassword){
		if(password !== confirmPassword){
			$scope.errorMessage = 'your passwords do not match';
			return
		}
		authService.createUser(name, email, password).then(function(response){
			console.log(11111, response);
		})
	}
})