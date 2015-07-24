angular.module('devKittens')

.controller('DashboardController', function($scope, $location, cohortData, courseData, courseServices) {

	// Init
	$scope.toggleAddCohort = false;
	$scope.toggleViewToCohorts = false;
	$scope.toggleViewToCourses = true;
	$scope.cohortArray = cohortData;



	$scope.addCohortView = function() {
		$scope.toggleAddCohort = !$scope.toggleAddCohort;
		$scope.backdropVisible = !$scope.backdropVisible
	}

	$scope.toggleAddCourse = false;

	$scope.courseArray = courseData;

	$scope.addCourseView = function() {
		$scope.toggleAddCourse = !$scope.toggleAddCourse;
	}



	// Toggling between dashboard views
	$scope.cohortsToggle = function() {
		if ($scope.toggleViewToCohorts === true) return;

		$scope.toggleViewToCourses = false;
		$scope.toggleViewToCohorts = !$scope.toggleViewToCohorts;
	}

	$scope.coursesToggle = function() {
		if ($scope.toggleViewToCourses === true) return;

		$scope.toggleViewToCohorts = false;
		$scope.toggleViewToCourses = !$scope.toggleViewToCourses;
	}




	// All that biz for creating a new Course, etc.

	$scope.createNewCourse = function(obj) {
		courseServices.createNewCourse(obj)
		.then(function(response) {
			$scope.courseInfo.title = '';
			$scope.courseInfo.courseLength = '';
			$location.path('/curriculum/' + response._id);
		})
	}

});