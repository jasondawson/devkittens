angular.module('devKittens')

.controller('CalendarController', function ($scope, calendarService) {
	
	$scope.events = calendarService.get();

});