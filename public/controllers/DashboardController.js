angular.module('devKittens')

.controller('DashboardController', function($scope, $location, cohortData, courseData, usersData, courseServices) {

	// Init
	$scope.toggleAddCohort = false;
	$scope.toggleViewToCohorts = false;
	$scope.toggleViewToCourses = true;
	$scope.toggleViewToMentors = false;
	$scope.activeTab = 'courses';
	$scope.cohortArray = cohortData;
	

	$scope.addCohortView = function() {
		$scope.toggleAddCohort = !$scope.toggleAddCohort;
		$scope.backdropVisible = !$scope.backdropVisible
	}

	$scope.toggleAddCourse = false;

	$scope.courseArray = courseData;
	$scope.usersArray = usersData;

	$scope.addCourseView = function() {
		$scope.toggleAddCourse = !$scope.toggleAddCourse;
	}

	$scope.addMentorView = function() {
		$scope.toggleAddMentor = !$scope.toggleAddMentor;
	}



	// Toggling between dashboard views
	$scope.activateCourses = function() {
		$scope.activeTab = 'courses';
		$scope.toggleViewToCourses = true;

		$scope.toggleViewToCohorts = false;
		$scope.toggleViewToMentors = false;
	}

	$scope.activateCohorts = function() {
		$scope.activeTab = 'cohorts';
		$scope.toggleViewToCourses = false;
		$scope.toggleViewToMentors = false;

		$scope.toggleViewToCohorts = true;
	}

	$scope.activateMentors = function() {
		$scope.activeTab = 'mentors';
		$scope.toggleViewToMentors = true;

		$scope.toggleViewToCohorts = false;
		$scope.toggleViewToCourses = false;
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