angular.module('devKittens')

.controller('registrationController', function($scope, authService, $location){
	$scope.errorMessage = '';
	$scope.createUser = function(name, email, password, confirmPassword) {
		if(password !== confirmPassword) return $scope.errorMessage = 'Your passwords don\'t match';

		authService.createUser(name, email, password)
		.then(function (response){
			console.warn('user info', response);

			// TODO: send them to the right place
			$location.path('/dashboard');
		})
	}
})