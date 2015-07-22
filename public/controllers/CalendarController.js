angular.module('devKittens')

.controller('CalendarController', function ($scope, calendarService) {
	
	// get active course info
	$scope.course = {
		name: 'Full Time Web, Summer 2014'
	}

	$scope.events = calendarService.get();
	console.log($scope.events);

});