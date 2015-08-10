angular.module('devKittens')

.controller('DashboardController',
function ($scope, $location, cohortData, courseData, usersData, courseServices, dashboardService, cohortServices, emailsService, instructorServices, infoStorage, user) {

	$scope.user = user;
	$scope.currentTab = 'cohorts';
	$scope.locationOptions = ['Provo', 'Salt Lake City', 'Dallas'];

	//////////////////////////////////////////////////
	////////////// DASHBOARD REDESIGN ////////////////
	//////////////////////////////////////////////////

	$scope.activateMenu = function (tabName) {
		switch(tabName) {
		    case 'cohorts':
		        $scope.currentTab = 'cohorts';
		        break;
		    case 'courses':
		    	$scope.currentTab = 'courses';
		        break;
        	case 'mentors':
		        $scope.currentTab = 'mentors';
		        break;
        	case 'instructors':
		        $scope.currentTab = 'instructors';
		        break;
        	case 'schedule':
		        $scope.currentTab = 'schedule';
		        break;
		    case 'admin':
		        $scope.currentTab = 'admin';
		        break;
		    case 'students':
		        $scope.currentTab = 'students';
		        break;
		}
	}




	$scope.createNewCohort = function(obj) {
		if (!obj || !obj.name || !obj.courseType || !obj.startDate || !obj.location) {
			$scope.messageText = "Missing information to create cohort.";
			return $scope.displayAlert = true;
		}

		cohortServices.createNewCohort(obj)
		.then(function(response) {
			infoStorage.setCurrentCohort(response);
			for (var key in $scope.cohortInfo) {
				$scope.cohortInfo[key] = "";
			};
			$scope.toggleAddCohort = false;
			$location.path('/cohort/' + response._id);
		})
		.catch(function (err) {
			console.error(err);
		})
	}



	$scope.createNewCourse = function(obj) {
		if (!obj || !obj.title || !obj.courseLength || obj.courseLength < 1) {
			$scope.messageText = "Missing information to create course.";
			return $scope.displayAlert = true;
		}
		
		courseServices.createNewCourse(obj)
		.then(function(response) {
			infoStorage.setCurrentCourse(response);
			$location.path('/course/' + response._id);
		})
		.catch(function (err) {
			console.error(err);
		})
	}


	// Send an email to new mentors inviting them to join DevMtn
	$scope.sendGeneralMentorInvite = function(mentorEmails) {
		if(!mentorEmails) {
			$scope.messageText = "Please add at least one email.";
			return $scope.displayAlert = true;
		}
		
		$scope.loading = true;

		emailsService.sendGeneralMentorInvite(mentorEmails)
		.then(function(response) {
			$scope.loading = false;
			$scope.newMentors = '';
		})
		.catch(function(err) {
			$scope.loading = false;
			console.error(err);
		})
	}




	//////////////////////////////////////////////////
	//////////////////////////////////////////////////
	//////////////////////////////////////////////////


	
	
	// TODO: This controller is doing things a controller shouldn't do.
	// Simplify and consolidate functionality and move it away from here.

	// Init
	$scope.toggleAddCohort = false;
	$scope.toggleAddCourse = false;
	$scope.toggleSchedule = false;
	$scope.toggleViewToCohorts = false;
	$scope.toggleViewToCourses = true;
	$scope.toggleViewToMentors = false;
	$scope.toggleViewToTeachers = false;
	$scope.toggleViewToSchedule = false;
	$scope.toggleViewToMentorProfile = false;
	$scope.toggleViewToTeacherProfile = false;
	$scope.toggleSubscribeCohort = false;
	$scope.instructorTab = 'instructorSchedule'
	$scope.activeTab = 'courses';
	$scope.cohortArray = cohortData;
	$scope.courseArray = courseData;
	$scope.usersArray = usersData;
	$scope.backdropVisible = false;

	//loading gif
	$scope.openLoader = function () {
		$scope.loading = true;
	}

	$scope.addMentorView = function() {
		$scope.toggleAddMentor = !$scope.toggleAddMentor;
		$scope.backdropVisible = !$scope.backdropVisible;
	}

	$scope.addTeacherView = function() {
		$scope.toggleAddTeacher = !$scope.toggleAddTeacher;
		// $scope.backdropVisible = !$scope.backdropVisible;
	}

	// Toggling between dashboard views
	$scope.activateCourses = function() {
		$scope.activeTab = 'courses';
		$scope.toggleViewToCourses = true;

		$scope.toggleViewToCohorts = false;
		$scope.toggleViewToMentors = false;
		$scope.toggleViewToTeachers = false;
		$scope.toggleViewToSchedule = false;
	}

	$scope.activateCohorts = function() {
		$scope.activeTab = 'cohorts';
		$scope.toggleViewToCohorts = true;

		$scope.instructorTab = 'cohorts';
		$scope.toggleViewToCourses = false;
		$scope.toggleViewToMentors = false;
		$scope.toggleViewToTeachers = false;
		$scope.toggleViewToSchedule = false;

	}

	$scope.activateMentors = function() {
		$scope.activeTab = 'mentors';
		$scope.toggleViewToMentors = true;

		$scope.toggleViewToCohorts = false;
		$scope.toggleViewToCourses = false;
		$scope.toggleViewToTeachers = false;
		$scope.toggleViewToSchedule = false;
	}

	$scope.activateTeachers = function() {
		$scope.activeTab = 'teachers';
		$scope.toggleViewToTeachers = true;

		$scope.toggleViewToCohorts = false;
		$scope.toggleViewToCourses = false;
		$scope.toggleViewToMentors = false;
		$scope.toggleViewToSchedule = false;
	}

	$scope.activateInstructorSchedule = function() {
		$scope.instructorTab = 'instructorSchedule';
		$scope.activeTab = 'schedule';
		$scope.toggleViewToSchedule = true;

		$scope.toggleViewToTeachers = false;
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
		// $scope.backdropVisible = !$scope.backdropVisible;
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


	$scope.getInstructorInfo = function() {
		dashboardService.getInstructorInfo($scope.user).then(function(response) {
			var instructorInfo = response;
			$scope.instructorCohorts = response.data.cohorts;
			$scope.instructorSchedule = response.data.schedule;
			$scope.instructorSkills = response.data.skills;
			// console.log('instructor info DashboardController ', instructorInfo);
		}, function(err) {
			console.log('Houston... ', err)
		})
	}

	//schedule section
	$scope.userInstructor = null;
	$scope.getUserInstructor = function() {
		if ($scope.userInstructor) {
			return;
		} else {
			dashboardService.getInstructorInfo($scope.user)
			.then(function(response) {
				// console.log(response);
				return $scope.userInstructor = response;
			})
		}
	}

	$scope.logger = function(arr) {
		for (var i = 0; i < arr.length; i++) {
			console.log(arr[i]);
		}
	}

});























