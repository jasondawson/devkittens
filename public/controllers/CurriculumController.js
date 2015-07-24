angular.module('devKittens')

.controller('CurriculumController', function ($scope, lessonService, courseRef) {
	// TODO: make this a directive
	document.body.scrollTop = document.documentElement.scrollTop = 0;

	console.log(courseRef);


	$scope.events = courseRef.curriculum;

	

});