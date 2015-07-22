angular.module('devKittens')

.controller('CalendarController', function ($scope, calendarService) {
	// TODO: make this a directive
	document.body.scrollTop = document.documentElement.scrollTop = 0;


	// get active course info
	$scope.course = {
		name: 'Full Time Web, Summer 2014'
	}

	$scope.events = calendarService.get();
	// console.log($scope.events);

});