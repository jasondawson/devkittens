angular.module('devKittens')

.directive('subscribeModal', function() {

	return {
		restrict: 'EA',
		templateUrl: './public/templates/subscribeModal.html',
		scope: {
			toggleSubscribeCohortModal: '&',
			toggleSubscribeCohort: '=',
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