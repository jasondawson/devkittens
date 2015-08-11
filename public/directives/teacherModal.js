angular.module('devKittens')

.directive('teacherModal', function() {

	return {
		restrict: 'EA',
		templateUrl: './public/templates/teacherModal.html',
		scope: {
			setTeacher: '&',
			toggleTeacherModal: '&',
			teacher: '=',
			currentTeacher: '=',
			instructorData: '=',
			user: '='
		},
		controller: function($scope, userService) {

			$scope.toggleAddSchedule = false;
			$scope.toggleAddPermissions = false;
			$scope.activeTab = 'schedule';

			$scope.toggleViewToSchedule = true;
			$scope.toggleViewToPermissions = false;

			$scope.activateSchedule = function() {
				$scope.activeTab = 'schedule';
				$scope.toggleViewToSchedule = true;
				$scope.toggleViewToPermissions = false;
			}

			$scope.activatePermissions = function() {
				$scope.activeTab = 'Permissions';
				$scope.toggleViewToPermissions = true;
				$scope.toggleViewToSchedule = false;
			}

			$scope.addScheduleView = function() {
				$scope.toggleAddSchedule = !$scope.toggleAddSchedule;
			}

			$scope.addPermissionsView = function() {
				$scope.toggleAddSkills = !$scope.toggleAddSkills;
			}

			$scope.editPermissions = function(obj) {
				userService.instructorPermissions(obj, $scope.currentTeacher)
				.then(function(response) {
					$scope.messageText = "Success! " + $scope.currentTeacher.name + "'s permissions have been updated."
					$scope.displaySuccess = true;
				})
			}

		}
	}

})