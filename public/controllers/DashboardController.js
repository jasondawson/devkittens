angular.module('devKittens')

.controller('DashboardController', function($scope, $location, cohortData, courseData, courseServices) {

	console.log('cohortData ctrl ', cohortData);
	$scope.toggleAddCohort = false;

	$scope.cohortArray = cohortData;

	$scope.addCohortView = function() {
		console.log('clicked calendarView btn ', $scope.toggleAddCohort);
		$scope.toggleAddCohort = !$scope.toggleAddCohort;
		$scope.backdropVisible = !$scope.backdropVisible
	}

	$scope.toggleAddCourse = false;

	$scope.courseArray = courseData;
	console.log(courseData);

	$scope.addCourseView = function() {
		console.log($scope.toggleAddCourse);
		$scope.toggleAddCourse = !$scope.toggleAddCourse;
	}



	//toggling between dashboard views

	$scope.toggleViewToCohorts = false;
	$scope.toggleViewToCourses = false;

	$scope.cohortsToggle = function() {
		$scope.toggleViewToCohorts = !$scope.toggleViewToCohorts;
		$scope.toggleViewToCourses = false;
	}

	$scope.coursesToggle = function() {
		$scope.toggleViewToCohorts = false;
		$scope.toggleViewToCourses = !$scope.toggleViewToCourses;
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