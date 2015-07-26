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

			$scope.toggleAddVocabulary = false;
			$scope.toggleAddSchedule = false;

			$scope.toggleViewToVocabulary = false;
			$scope.toggleViewToSchedule = false;
			$scope.toggleViewToCohort = false;

			$scope.activateVocabulary = function() {
				$scope.activeTab = 'Vocabulary';
				$scope.toggleViewToVocabulary = true;

				$scope.toggleViewToCohort = false;	
				$scope.toggleViewToSchedule = false;
			}

			$scope.activateSchedule = function() {
				// console.log('activateSchedule')
				$scope.activeTab = 'schedule';
				$scope.toggleViewToSchedule = true;

				$scope.toggleViewToCohort = false;
				$scope.toggleViewToVocabulary = false;
			}

			$scope.activateCohort = function() {
				// console.log('activateCohort')
				$scope.activeTab = 'cohort';
				$scope.toggleViewToCohort = true;

				$scope.toggleViewToVocabulary = false;
				$scope.toggleViewToSchedule = false;
			}

			$scope.addVocabularyView = function() {
				$scope.toggleAddVocabulary = !$scope.toggleAddVocabulary;
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