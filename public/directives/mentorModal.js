angular.module('devKittens')

.directive('mentorModal', function() {

	return {
		restrict: 'EA',
		templateUrl: './public/templates/mentorModal.html',
		scope: {
			setMentor: '&',
			toggleMentorModal: '&',
			mentor: '=',
			currentMentor: '=',
			options: '=',
			cohorts: '=',
			user: '='
		},
		controller: function($scope, userService, mentorService) {
			$scope.addCohort = function(cohort){
				mentorService.assignCohort($scope.currentMentor, cohort._id)
				.success(function(response) {
					console.log(response)
					$scope.messageText = response;
					return $scope.displaySuccess = true;
				})
				.error(function(err) {
					console.error(err);
					$scope.messageText = "There was an error with your request.";
					return $scope.displayAlert = true;
				})
			}

			$scope.studentSection = false;

			$scope.showStudents = function() {
				$scope.studentSection = !$scope.studentSection;
			};

			$scope.toggleAddMentos = false;
			$scope.toggleAddSchedule = false;

			$scope.toggleViewToMentos = false;
			$scope.toggleViewToSchedule = false;
			$scope.toggleViewToTasks = false;
			$scope.toggleViewToNotes = false;
			$scope.toggleViewToPermissions = false;

			$scope.activateMentos = function() {
				$scope.activeTab = 'mentos';
				$scope.toggleViewToMentos = true;

				$scope.toggleViewToSchedule = false;
				$scope.toggleViewToTasks = false;	
				$scope.toggleViewToNotes = false;
				$scope.toggleViewToPermissions = false;
			}

			$scope.activateTasks = function() {
				$scope.activeTab = 'tasks';
				$scope.toggleViewToTasks = true;

				$scope.toggleViewToNotes = false;
				$scope.toggleViewToMentos = false;
				$scope.toggleViewToSchedule = false;
				$scope.toggleViewToPermissions = false;
			}

			$scope.addMentosView = function() {
				$scope.toggleAddMentos = !$scope.toggleAddMentos;
			}

			$scope.addTasksView = function() {
				$scope.toggleAddTasks = !$scope.toggleAddTasks;
			}

			$scope.editPermissions = function(obj) {
				userService.mentorPermissions(obj, $scope.currentMentor)
				.then(function(response) {
					$scope.messageText = "User permissions have been successfully updated.";
					return $scope.displaySuccess = true;
				})
			}

		}
	}

})