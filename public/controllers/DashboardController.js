angular.module('devKittens')

.controller('DashboardController',
function ($scope, $location, cohortData, courseData, usersData, courseServices, cohortServices, user) {

	$scope.user = user;

	// Init
	$scope.toggleAddCohort = false;
	$scope.toggleAddCourse = false;
	$scope.toggleViewToCohorts = false;
	$scope.toggleViewToCourses = true;
	$scope.toggleViewToMentors = false;
	$scope.toggleViewToTeachers = false;
	$scope.toggleViewToMentorProfile = false;
	$scope.toggleViewToTeacherProfile = false;
	$scope.toggleSubscribeCohort = false;
	$scope.activeTab = 'courses';
	$scope.cohortArray = cohortData;
	$scope.courseArray = courseData;
	$scope.usersArray = usersData;
	$scope.backdropVisible = false;


	$scope.addCohortView = function() {
		$scope.toggleAddCohort = !$scope.toggleAddCohort;
		$scope.backdropVisible = !$scope.backdropVisible;
	}


	$scope.addCourseView = function() {
		$scope.toggleAddCourse = !$scope.toggleAddCourse;
		$scope.backdropVisible = !$scope.backdropVisible;
	}

	$scope.addMentorView = function() {
		$scope.toggleAddMentor = !$scope.toggleAddMentor;
		$scope.backdropVisible = !$scope.backdropVisible;
	}

	$scope.addTeacherView = function() {
		$scope.toggleAddTeacher = !$scope.toggleAddTeacher;
		$scope.backdropVisible = !$scope.backdropVisible;
	}

	// Toggling between dashboard views
	$scope.activateCourses = function() {
		$scope.activeTab = 'courses';
		$scope.toggleViewToCourses = true;

		$scope.toggleViewToCohorts = false;
		$scope.toggleViewToMentors = false;
		$scope.toggleViewToTeachers = false;
	}

	$scope.activateCohorts = function() {
		$scope.activeTab = 'cohorts';
		$scope.toggleViewToCourses = false;
		$scope.toggleViewToMentors = false;
		$scope.toggleViewToTeachers = false;

		$scope.toggleViewToCohorts = true;
	}

	$scope.activateMentors = function() {
		$scope.activeTab = 'mentors';
		$scope.toggleViewToMentors = true;

		$scope.toggleViewToCohorts = false;
		$scope.toggleViewToCourses = false;
		$scope.toggleViewToTeachers = false;
	}

	$scope.activateTeachers = function() {
		$scope.activeTab = 'teachers';
		$scope.toggleViewToTeachers = true;

		$scope.toggleViewToCohorts = false;
		$scope.toggleViewToCourses = false;
		$scope.toggleViewToMentors = false;
	}

	$scope.toggleMentorModal = function() {
		$scope.toggleViewToMentorProfile = !$scope.toggleViewToMentorProfile;
		$scope.backdropVisible = !$scope.backdropVisible;
	}

	$scope.toggleTeacherModal = function() {
		$scope.toggleViewToTeacherProfile = !$scope.toggleViewToTeacherProfile;
		$scope.backdropVisible = !$scope.backdropVisible;
	}

	$scope.toggleSubscribeCohortModal = function() {
		$scope.toggleSubscribeCohort = !$scope.toggleSubscribeCohort;
		$scope.backdropVisible = !$scope.backdropVisible;
	}

	

	// Sets currentMentor through an ng-click on dashboard-mentors.html
	$scope.setMentor = function(mentor) {
		$scope.currentMentor = mentor
		console.log('currentMentor ', $scope.currentMentor);
	}

	$scope.setTeacher = function(teacher) {
		$scope.currentTeacher = teacher
		console.log('currentTeacher ', $scope.currentTeacher);
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
		cohortServices.createNewCohort(obj)
		.then(function(response) {
			for (var key in $scope.cohortInfo) {
				$scope.cohortInfo[key] = "";
			};
			$scope.toggleAddCohort = false;
			$location.path('/calendar/' + response._id);
		})
	}

});