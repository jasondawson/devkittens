angular.module('devKittens')

.directive('teacherModal', function() {

	return {
		restrict: 'EA',
		templateUrl: './public/templates/teacherModal.html',
		scope: {
			setTeacher: '&',
			toggleTeacherModal: '&',
			teacher: '=',
			currentTeacher: '='
		},
		controller: function($scope) {
			// $scope.studentSection = false;

			// $scope.showStudents = function() {
			// 	$scope.studentSection = !$scope.studentSection;
			// };

			$scope.toggleAddMentos = false;
			$scope.toggleAddSchedule = false;

			$scope.toggleViewToMentos = false;
			$scope.toggleViewToSchedule = false;
			$scope.toggleViewToCohort = false;

			$scope.activateMentos = function() {
				console.log('activateMentos')
				$scope.activeTab = 'mentos';
				$scope.toggleViewToMentos = true;

				$scope.toggleViewToCohort = false;	
				$scope.toggleViewToSchedule = false;
			}

			$scope.activateSchedule = function() {
				console.log('activateSchedule')
				$scope.activeTab = 'schedule';
				$scope.toggleViewToSchedule = true;

				$scope.toggleViewToCohort = false;
				$scope.toggleViewToMentos = false;
			}

			$scope.activateCohort = function() {
				console.log('activateCohort')
				$scope.activeTab = 'cohort';
				$scope.toggleViewToCohort = true;

				$scope.toggleViewToMentos = false;
				$scope.toggleViewToSchedule = false;
			}

			$scope.addMentosView = function() {
				$scope.toggleAddMentos = !$scope.toggleAddMentos;
			}

			$scope.addScheduleView = function() {
				$scope.toggleAddSchedule = !$scope.toggleAddSchedule;
			}

			$scope.addCohortView = function() {
				$scope.toggleAddCohort = !$scope.toggleAddCohort;
			}

		}
	}

})