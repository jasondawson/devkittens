angular.module('devKittens')

.controller('MentorController', function ($scope, mentorData, optionsData, usersData, user) {

	alert('MENTOR CONTROLLER!!!');
	
	$scope.user = user;
	$scope.mentorModalVisible = false;

	console.log('optionsData ctrl ', optionsData);
	console.log('mentorData ctrl ', mentorData);
	console.log('usersData ctrl ', usersData);

	// Data passed in from resolve to have all the mentors loaded before the page displays.
	$scope.mentors = mentorData;
	$scope.users = usersData;
	$scope.options = optionsData;
	// console.log('options ', $scope.options);

	$scope.toggleMentorModal = function() {
		// console.log('toggleMentorModal ', $scope.mentorModalVisible)
		$scope.mentorModalVisible = !$scope.mentorModalVisible;
	}

	// Sets currentMentor through an ng-click on dashboard-mentors.html
	$scope.setMentor = function(mentor) {
		$scope.currentMentor = mentor
		console.log('currentMentor ', $scope.currentMentor);
	}

});