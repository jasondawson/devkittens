angular.module('devKittens')

.directive('subscribeModal', function( dashboardService ) {

	return {
		restrict: 'EA',
		templateUrl: './public/templates/subscribeModal.html',
		scope: {
			toggleAssignMentorsView: '&',
			toggleSubscribeCohortModal: '&',
			toggleSubscribeCohort: '=',
			cohortArray: '=',
			usersArray: '=',
			mentorArray: '='
		},
		controller: function($scope) {

			$scope.studentArray = $scope.usersArray;
			$scope.selectedStudents = [];
			$scope.selectedMentors = [];
			$scope.selectedStudents.push($scope.selectedStudents[1]);
			$scope.selectedMentors.push($scope.selectedMentors[1]);
			$scope.AssignMentorsView = false;

			$scope.toggleAssignMentorsView = function() {
				$scope.AssignMentorsView = !$scope.AssignMentorsView;
			};

			$scope.mentors = [];
			for(var i =0; i < $scope.usersArray.length; i++) {
				if ($scope.usersArray[i].userType === 'mentor') {
					$scope.mentors.push($scope.usersArray[i]);
				}
			}

			$scope.getPeopleForCohort = function(selectedCohort) {
				cohortId = selectedCohort._id;
				console.log(cohortId);
				dashboardService.findPeopleForCohort(cohortId)
				.then(function(repsonse){
					console.log(response);
				}, function(error){
					console.log(error);
				});
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

