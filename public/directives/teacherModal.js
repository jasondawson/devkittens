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
			instructorData: '='
		},
		controller: function($scope) {
			// $scope.studentSection = false;

			// $scope.showStudents = function() {
			// 	$scope.studentSection = !$scope.studentSection;
			// };

			$scope.toggleAddComments = false;
			$scope.toggleAddSchedule = false;
			$scope.toggleAddSkills = false;

			$scope.toggleViewToComments = false;
			$scope.toggleViewToSchedule = false;
			$scope.toggleViewToSkills = false;

			$scope.activateComments = function() {
				$scope.activeTab = 'Comments';
				$scope.toggleViewToComments = true;

				$scope.toggleViewToSkills = false;	
				$scope.toggleViewToSchedule = false;
			}

			$scope.activateSchedule = function() {
				// console.log('activateSchedule')
				$scope.activeTab = 'schedule';
				$scope.toggleViewToSchedule = true;

				$scope.toggleViewToSkills = false;
				$scope.toggleViewToComments = false;
			}

			$scope.activateSkills = function() {
				$scope.activeTab = 'Skills';
				$scope.toggleViewToSkills = true;

				$scope.toggleViewToComments = false;
				$scope.toggleViewToSchedule = false;
			}

			$scope.addCommentsView = function() {
				$scope.toggleAddComments = !$scope.toggleAddComments;
			}

			$scope.addScheduleView = function() {
				$scope.toggleAddSchedule = !$scope.toggleAddSchedule;
			}

			$scope.addSkillsView = function() {
				$scope.toggleAddSkills = !$scope.toggleAddSkills;
			}

		}
	}

})