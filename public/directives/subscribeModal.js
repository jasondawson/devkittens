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

			$scope.mentors = [];
			for(var i =0; i < $scope.usersArray.length; i++) {
				if ($scope.usersArray[i].userType === 'mentor') {
					$scope.mentors.push($scope.usersArray[i]);
				}
			}

			$scope.getStudentsForCohort = function(selectedCohort) {
				findStudentsForCohort = selectedCohort._id
				return findStudentsForCohort;
			}

			$scope.students = [];
			for(var i = 0; i < $scope.usersArray.length; i++) {
				if ($scope.usersArray[i].userType === 'student') {
					$scope.students.push($scope.usersArray[i]);
				}
			}

			// $scope.mentor.mentos = [];

			$scope.saveSelectedStudents = function(selectedStudents) {
				console.log('selectedStudents ', $scope.selectedStudents);
			}
		}
	}

});

