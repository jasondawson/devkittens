angular.module('devKittens')

.controller('CohortController', 
	function ($scope, user, $location, infoStorage, cohortServices, currentCohortData, dayOfWeek) {

	$scope.user = user;
	$scope.currentCohort = currentCohortData;
	$scope.dayOfWeek = dayOfWeek;
	$scope.arrayLength = $scope.currentCohort.curriculum[$scope.currentCohort.curriculum.length - 1]

	$scope.segmentLength = $scope.currentCohort.curriculum.length;
	$scope.currentSegment = 0;
	$scope.activeMonth = $scope.currentCohort.curriculum[0];
	

	$scope.viewDay = function(day) {
		// var currentCohort = infoStorage.getCurrentCohort()
		$location.path('/day/cohort/' + $scope.currentCohort._id + '/' + day._id);
	}

	$scope.previousMonth = function() {
		$scope.currentSegment--;
		$scope.activeMonth = $scope.currentCohort.curriculum[$scope.currentSegment];
	}

	$scope.nextMonth = function() {
		$scope.currentSegment++;
		$scope.activeMonth = $scope.currentCohort.curriculum[$scope.currentSegment];

	}

})