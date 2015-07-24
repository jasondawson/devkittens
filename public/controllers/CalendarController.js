angular.module('devKittens')

.controller('CalendarController', function ($scope, calendarService, specificCohortData) {
	console.log(specificCohortData);
	$scope.events = specificCohortData.curriculum;


	// TODO: make this a directive
	document.body.scrollTop = document.documentElement.scrollTop = 0;

	// get active course info
	$scope.course = {
		name: specificCohortData.name
	}

	// $scope.events = calendarService.get();
	// console.log($scope.events);


	// bringing actual cohort data into the scope


});