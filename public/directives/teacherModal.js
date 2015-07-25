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
			$scope.studentSection = false;

			$scope.showStudents = function() {
				$scope.studentSection = !$scope.studentSection;
			};

		}
	}

})