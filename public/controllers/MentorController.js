angular.module('devKittens')

.controller('MentorController', function($scope, mentorData) {

	console.log('cohortData ctrl ', mentorData);

	// Data passed in from resolve to have all the mentors loaded before the page displays.
	$scope.mentors = mentorData;

	// Sets currentMentor through an ng-click on dashboard-mentors.html
	$scope.setMentor = function(mentor) {
		$scope.currentMentor = mentor.name
		console.log('currentMentor ', $scope.currentMentor);
	}

});