angular.module('devKittens')

.directive('assignMentorModal', function() {

	return {
		restrict: 'EA',
		templateUrl: './public/templates/assignMentorModal.html',
		scope: {
			toggleAssignMentorModal: '&',
			toggleAssignMentorCohort: '=',
			cohortArray: '=',
			usersArray: '='
		},
		controller: function($scope) {

			$scope.studentArray = $scope.usersArray;
			$scope.selectedStudents = [];
			$scope.selectedStudents.push($scope.selectedStudents[1]);

			$scope.saveSelectedStudents = function(selectedStudents) {
				console.log('selectedStudents ', $scope.selectedStudents);
			}
		}
	}

});