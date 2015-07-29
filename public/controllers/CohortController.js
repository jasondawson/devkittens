angular.module('devKittens')

.controller('CohortController', 
	function ($scope, infoStorage, cohortServices, dayOfWeekCohort) {

	$scope.currentCohort = currentCohortData;
	$scope.dayOfWeekCohort = dayOfWeek;

	console.log('currentCohort ', currentCohort);

})