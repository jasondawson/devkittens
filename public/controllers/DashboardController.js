angular.module('devKittens')

.controller('DashboardController', function($scope, dashboardService) {

	$scope.toggleAddCohort = false;

	$scope.getData = function() {
		$scope.cohortArray = dashboardService.getCohortData();
		console.log('cohortArray ', $scope.cohortArray);
	}

	$scope.addCohortView = function() {
		console.log('clicked calendarView btn ', $scope.toggleAddCohort);
		$scope.toggleAddCohort = !$scope.toggleAddCohort;
	}

});