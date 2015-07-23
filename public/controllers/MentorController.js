angular.module('devKittens')

.controller('MentorController', function($scope, mentorData) {

	console.log('cohortData ctrl ', mentorData);

	$scope.mentors = mentorData;

});
