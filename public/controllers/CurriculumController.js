angular.module('devKittens')

.controller('CurriculumController', function ($scope, lessonService, courseRef, $sce, user) {
	// TODO: make this a directive
	document.body.scrollTop = document.documentElement.scrollTop = 0;
	$scope.user = user;
	$scope.events = courseRef.curriculum;
});