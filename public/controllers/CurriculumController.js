angular.module('devKittens')

.controller('CurriculumController', function ($scope, lessonService, courseRef, $sce) {
	// TODO: make this a directive
	document.body.scrollTop = document.documentElement.scrollTop = 0;

	$scope.events = courseRef.curriculum;
	console.log($scope.events);
});