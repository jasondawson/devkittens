angular.module('devKittens')

.controller('CohortController', 
function ($scope, user, $location, infoStorage, cohortServices, currentCohortData, emailsService, mentorService, dayOfWeek, instructorServices) {
	console.log(currentCohortData)
	// Init
	$scope.user = user;
	$scope.currentCohort = currentCohortData;
	$scope.dayOfWeek = dayOfWeek;
	$scope.arrayLength = $scope.currentCohort.curriculum[$scope.currentCohort.curriculum.length - 1]

	$scope.segmentLength = $scope.currentCohort.curriculum.length;
	$scope.currentSegment = 0;
	$scope.activeMonth = $scope.currentCohort.curriculum[0];
	$scope.studentDisplay = false;
	$scope.mentorDisplay = false;
	$scope.isCohort = true;

	$scope.viewDay = function(day, index) {
		// var currentCohort = infoStorage.getCurrentCohort()
		infoStorage.storeDayIndex(index);
		$location.path('/day/cohort/' + $scope.currentCohort._id + '/' + day._id);
	}

	$scope.previousMonth = function() {
		if($scope.currentSegment === 0) {
			$('.fa-chevron-left').css('color', '#DFDFDF')
			return;
		}

		$scope.currentSegment--;

		$('.fa-chevron-left').css('color', '#000');
		$('.fa-chevron-right').css('color', '#000');

		$scope.activeMonth = $scope.currentCohort.curriculum[$scope.currentSegment];
	}

	$scope.nextMonth = function() {
		if($scope.currentSegment === $scope.segmentLength - 1){
			return;
		}

		$scope.currentSegment++;

		$('.fa-chevron-right').css('color', '#000');
		$('.fa-chevron-left').css('color', '#000');

		$scope.activeMonth = $scope.currentCohort.curriculum[$scope.currentSegment];

		if($scope.currentSegment === $scope.segmentLength - 1){
			$('.fa-chevron-right').css('color', '#DFDFDF')
			return;
		}

	}

	// Modal related || TODO: refactor for make all modals consistent
	$scope.openModal = function () {
		$('body').css('overflow', 'hidden');
		$scope.studentModal = true;
	}

	$scope.closeModal = function () {
		$('body').css('overflow', 'inherit');
		$scope.studentModal = false;
	}

	$scope.openMentorModal = function () {
		$('body').css('overflow', 'hidden');
		$scope.mentorModal = true;
	}

	$scope.closeMentorModal = function () {
		$('body').css('overflow', 'inherit');
		$scope.mentorModal = false;
	}

	$scope.getMentors = function() {
		mentorService.getMentors().then(function(response){
		$scope.mentors = response.data;
		}), function (error){
			console.log(error);
		}
	}

	$scope.assignMentors = function(mentor, cohortId) {
		mentorService.assignMentors(mentor, cohortId).then(function(response){
			console.log(response);
		}), function (error){
			console.log(error);
		}
	}

	$scope.toggleStudentView = function () {
		$scope.settingsView = false;
		$scope.studentDisplay = !$scope.studentDisplay;
	}

	$scope.getAllInstructors = function () {
		// Getting instructor data
		instructorServices.getAll(currentCohortData._id)
		.then(function (response) {
			$scope.instructors = instructorServices.cleanInstructors(response[0], response[1].instructors);
			$scope.cohortInstructors = response[1].instructors;
		})
		.catch(function (err) {
			console.error(err);
		})
	}

		// Send mentor invite
	$scope.sendMentorInvite = function (mentorEmails) {
		$scope.loading = true;

		if (!mentorEmails) return console.warn('Please add emails');
		var cohortInfo = {
			name: currentCohortData.name,
			id: currentCohortData._id
		}
		emailsService.sendMentorInvite(mentorEmails, cohortInfo)
		.then(function (response) {
			$scope.loading = false;
			$scope.mentors = '';
			$scope.closeModal();
		})
		.catch(function (err) {
			$scope.loading = false;
			$scope.closeModal();
		});
	}

	$scope.toggleSettingsView = function () {
		$scope.settingsView = !$scope.settingsView;
		
		if ($scope.settingsView === false) {
			$('body').css('overflow', 'auto');
		} else {
			$('body').css('overflow', 'hidden');
			$scope.getAllInstructors();
			$scope.getMentors();
		}

		$scope.studentDisplay = false;
	}


	// Send student invite
	$scope.sendStudentInvite = function (studentEmails) {
		$scope.loading = true;

		if (!studentEmails) return console.warn('Please add emails');
		var cohortInfo = {
			name: currentCohortData.name,
			id: currentCohortData._id
		}
		emailsService.sendStudentInvite(studentEmails, cohortInfo)
		.then(function (response) {
			$scope.loading = false;
			$scope.students = '';
			$scope.closeModal();
		})
		.catch(function (err) {
			$scope.loading = false;
			$scope.closeModal();
		});
	}

	$scope.findMyId = function(arr, user) {
  		if(arr){
			for (var i = 0; i < arr.length; i++) {
				if (typeof arr[i] == 'object') {
					if (arr[i]._id == user._id) {
						return true;
					}
				} else if (typeof arr[i] == 'string') {
					if (arr[i] == user._id) {
						return true;
					}
				}
			}
			return false;
  		}
	}

	// ASSIGN STUDENTS TO MENTORS
	$scope.toggleStudentSelection = function (mentor, student) {
		if(!mentor.students){
			mentor.students = [];
		}
		if (mentor.students.indexOf(student._id) > -1) {
			return mentor.students.splice(mentor.students.indexOf(student._id), 1);
		}

		mentor.students.push(student._id)
	}

	$scope.addStudents = function (mentor) {
		cohortServices.assignStudents(mentor, $scope.currentCohort._id).then(function(response){
			console.log(response);
		})
	}

})