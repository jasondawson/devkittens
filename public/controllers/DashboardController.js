angular.module('devKittens')

.controller('DashboardController', function($scope, $location, cohortData, courseData, courseServices) {

	// Init
	$scope.toggleAddCohort = false;
	$scope.toggleViewToCohorts = false;
	$scope.toggleViewToCourses = true;
	$scope.activeTab = 'courses';
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
	$scope.activateCourses = function() {
		$scope.activeTab = 'courses';
		$scope.toggleViewToCourses = true;

		$scope.toggleViewToCohorts = false;
	}

	$scope.activateCohorts = function() {
		$scope.activeTab = 'cohorts';
		$scope.toggleViewToCourses = false;

		$scope.toggleViewToCohorts = true;
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