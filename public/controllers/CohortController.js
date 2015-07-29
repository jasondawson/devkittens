angular.module('devKittens')

.controller('CohortController', 
	function ($scope, user, infoStorage, cohortServices, currentCohortData, dayOfWeek) {

	$scope.user = user;
	$scope.currentCohort = currentCohortData;
	$scope.dayOfWeek = dayOfWeek;

	// console.log('currentCohort ', $scope.currentCohort);

})