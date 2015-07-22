angular.module('devKittens')

.controller('DashboardController', function($scope, cohortData) {

	console.log('cohortData ctrl ', cohortData);
	$scope.toggleAddCohort = false;

	$scope.cohortArray = cohortData;

	// $scope.getData = function() {
	// 	 = dashboardService.getCohortData();
	// 	console.log('cohortArray ', $scope.cohortArray);
	// }

	$scope.addCohortView = function() {
		console.log('clicked calendarView btn ', $scope.toggleAddCohort);
		$scope.toggleAddCohort = !$scope.toggleAddCohort;
	}

});