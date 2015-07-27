angular.module('devKittens')

.controller('UserSettingsController',
function ($scope, user, userService) {

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
			$scope.password = '';
			$scope.user = response;
		})
		.catch(function (err) {
			throw new Error(err);
		});

	}


});