angular.module('devKittens')

.controller('DashboardController', function($scope, $location, cohortData, courseServices) {

	console.log('cohortData ctrl ', cohortData);
	$scope.toggleAddCohort = false;

	$scope.cohortArray = cohortData;

	$scope.addCohortView = function() {
		console.log('clicked calendarView btn ', $scope.toggleAddCohort);
		$scope.toggleAddCohort = !$scope.toggleAddCohort;
	}














	// all that biz for creating a new Course, etc.

	$scope.createNewCourse = function(obj) {
		courseServices.createNewCourse(obj)
		.then(function(response) {
			$scope.courseInfo.title = '';
			$scope.courseInfo.courseLength = '';
			$location.path('/curriculum/' + response._id);
		})
	}

});