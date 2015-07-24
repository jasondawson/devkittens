angular.module('devKittens')


.controller('DashboardController',
function($scope, $location, cohortData, courseData, usersData, courseServices, cohortServices) {

	// Init
	$scope.toggleAddCohort = false;
	$scope.toggleAddCourse = false;
	$scope.toggleViewToCohorts = false;
	$scope.toggleViewToCourses = true;
	$scope.toggleViewToMentors = false;
	$scope.toggleViewToMentorProfile = false;
	$scope.activeTab = 'courses';
	$scope.cohortArray = cohortData;
	$scope.courseArray = courseData;
	$scope.usersArray = usersData;

	console.log(cohortData);


	$scope.addCohortView = function() {
		$scope.toggleAddCohort = !$scope.toggleAddCohort;
		$scope.backdropVisible = !$scope.backdropVisible
	}


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

	$scope.toggleMentorModal = function() {
		console.log('$scope.toggleViewToMentorProfile ', $scope.toggleViewToMentorProfile)
		$scope.toggleViewToMentorProfile = !$scope.toggleViewToMentorProfile;
	}

	// Sets currentMentor through an ng-click on dashboard-mentors.html
	$scope.setMentor = function(mentor) {
		$scope.currentMentor = mentor
		console.log('currentMentor ', $scope.currentMentor);
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

	// All that biz for creating a new cohort, etc. authored by Kyle, the handsomest hunk to ever use toilet paper.

	$scope.locationOptions = ['Provo', 'Salt Lake City'];

	$scope.createNewCohort = function(obj) {
		console.log(obj);
		cohortServices.createNewCohort(obj)
		.then(function(response) {
			console.log(response);
			for (var key in $scope.cohortInfo) {
				$scope.cohortInfo[key] = "";
			};
			$scope.toggleAddCohort = false;
			$location.path('/calendar/' + response._id);
		})
	}

});