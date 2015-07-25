angular.module('devKittens')

.controller('registrationController',
function ($scope, authService, $location, infoStorage, courseId) {
	
	// Init
	$scope.errorMessage = '';

	$scope.createUser = function (name, email, password, confirmPassword) {
		if(password !== confirmPassword) return $scope.errorMessage = 'Your passwords don\'t match';

		authService.createUser(name, email, password, courseId)
		.then(function (response) {
			// Temp store user info
			infoStorage.saveUser(response);

			// TODO: send them to the right place
			$location.path('/dashboard');
		})
		.catch(function (err) {
			throw new Error(err);
		});

	};


});