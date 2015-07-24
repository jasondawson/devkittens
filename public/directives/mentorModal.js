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
			options: '='
		},
		controller: function($scope) {
			$scope.studentSection = false;

			$scope.showStudents = function() {
				$scope.studentSection = !$scope.studentSection;
			};

		}
	}

})