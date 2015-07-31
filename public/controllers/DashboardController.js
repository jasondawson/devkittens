angular.module('devKittens')

.controller('DashboardController',
function ($scope, $location, cohortData, courseData, usersData, courseServices, cohortServices, emailsService, instructorServices, infoStorage, user) {

	$scope.user = user;

	// TODO: This controller is doing things a controller shouldn't do.
	// Simplify and consolidate functionality and move it away from here.

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


	//loading gif
	$scope.openLoader = function () {
		$scope.loading = true;
	}

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

	// Open/close mentor modal - invites mentors to join DevMtn
	$scope.openMentorModal = function() {
		$('body').css('overflow', 'hidden');
		$scope.mentorModal = true;
	}

	$scope.closeMentorModal = function() {
		$('body').css('overflow', 'inherit');
		$scope.mentorModal = false;
	}

//Kyle, this is what you are working on
	$scope.toggleTeacherModal = function(id) {
		if ($scope.toggleViewToTeacherProfile === false) {
			instructorServices.getInstructorInfo(id)
			.then(function(response) {
				$scope.instructorData = response;
				$scope.toggleViewToTeacherProfile = !$scope.toggleViewToTeacherProfile;
				$scope.backdropVisible = !$scope.backdropVisible;
			})
		} else {
			$scope.toggleViewToTeacherProfile = !$scope.toggleViewToTeacherProfile;
			$scope.backdropVisible = !$scope.backdropVisible;
		}
	}

	$scope.toggleSubscribeCohortModal = function() {
		$scope.toggleSubscribeCohort = !$scope.toggleSubscribeCohort;
		$scope.backdropVisible = !$scope.backdropVisible;
	}

	$scope.toggleMentorModal = function() {
		$scope.toggleViewToMentorProfile = !$scope.toggleViewToMentorProfile;
		$scope.backdropVisible = !$scope.backdropVisible;
	}
	

	// Sets currentMentor through an ng-click on dashboard-mentors.html
	$scope.setMentor = function(mentor) {
		$scope.currentMentor = mentor
	}

	$scope.setTeacher = function(teacher) {
		$scope.currentTeacher = teacher
	}

	$scope.setCourse = function(course) {
		$scope.currentCourse = course;
		infoStorage.setCurrentCourse($scope.currentCourse);
	}

	$scope.setCohort = function(cohort) {
		$scope.currentCohort = cohort;
		infoStorage.setCurrentCohort($scope.currentCohort);
	}

	// Send an email to new mentors inviting them to join DevMtn
	$scope.sendMentorInvite = function(mentorEmails) {
		$scope.loading = true;

		if(!mentorEmails) return console.warn('Please add emails');

		emailsService.sendMentorInvite(mentorEmails)
		.then(function(response) {
			console.log('response', response);
		}, function(err) {
			console.log('error ', err);
		})
	}




	// All that biz for creating a new Course, etc.

	$scope.createNewCourse = function(obj) {
		courseServices.createNewCourse(obj)
		.then(function(response) {
			$scope.courseInfo.title = '';
			$scope.courseInfo.courseLength = '';
			infoStorage.setCurrentCourse(response);
			$location.path('/course/' + response._id);
		})
	}

	// All that biz for creating a new cohort, etc. authored by Kyle, the handsomest hunk to ever use toilet paper.

	$scope.locationOptions = ['Provo', 'Salt Lake City', 'Dallas'];

	$scope.createNewCohort = function(obj) {
		cohortServices.createNewCohort(obj)
		.then(function(response) {
			infoStorage.setCurrentCohort(response);
			for (var key in $scope.cohortInfo) {
				$scope.cohortInfo[key] = "";
			};
			$scope.toggleAddCohort = false;
			$location.path('/cohort/' + response._id);
		})
	}


});























