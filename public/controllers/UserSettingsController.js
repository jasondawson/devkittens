angular.module('devKittens')

.controller('UserSettingsController',
function ($scope, $timeout, user, userService, $location) {

	$scope.user = user;

	$scope.updateUser = function (user, newPassword) {
		var updatedInfo = {
			name: user.name,
			githubUrl: user.githubUrl,
			local: {
				email: user.local.email
			}
		}
		if (newPassword) updatedInfo.local.password = newPassword;

		userService.updateUser(updatedInfo, user._id)
		.then(function (response) {
			$scope.newPassword = '';
			$scope.user = response;
			
			$scope.displayMessage = true;
			$timeout(function () {
				$scope.displayMessage = false;
			}, 3000)

		})
		.catch(function (err) {
			throw new Error(err);
		});
	}

	// BACK TO CALENDAR
	$scope.toCalendar = function(){
		if (!user.userType.student) return;

		$location.path('/cohort/' + user.typeData.cohortId);
	}


});