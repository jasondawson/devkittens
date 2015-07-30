angular.module('devKittens')

.controller('CohortController', 
	function ($scope, user, $location, infoStorage, cohortServices, currentCohortData, dayOfWeek) {

	$scope.user = user;
	$scope.currentCohort = currentCohortData;
	$scope.dayOfWeek = dayOfWeek;

	$scope.viewDay = function(day) {
		// var currentCohort = infoStorage.getCurrentCohort()
		$location.path('/day/cohort/' + $scope.currentCohort._id + '/' + day._id);
	}

})