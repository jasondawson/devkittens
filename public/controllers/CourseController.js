angular.module('devKittens')

.controller('CourseController',
function ($scope, calendarService, user, infoStorage, emailsService, cohortServices, currentCourseData, dayOfWeek, $location) {
	
	$scope.user = user;
	$scope.currentCourse = currentCourseData;
	$scope.dayOfWeek = dayOfWeek;

	$scope.previousBtn = true;
	$scope.nextBtn = true;

	$scope.segmentLength = $scope.currentCourse.curriculum.length;
	$scope.currentSegment = 0;
	$scope.activeMonth = $scope.currentCourse.curriculum[0];

	if($scope.segmentLength === 1) {
		$('.fa-chevron-right').css('color', '#DFDFDF');
		$('.fa-chevron-right').css('cursor', 'not-allowed');
	};

	$scope.viewDay = function (day) {
		infoStorage.saveLessonRef(day);
		$location.path('/day/course/' + currentCourseData._id + '/' + day._id);
	}

	$scope.sendMentorInvite = function(mentorEmails) {
		$scope.loading = true;
		if(!mentorEmails) return console.warn('Please add emails');

		emailsService.sendMentorInvite(mentorEmails)
		.then(function(response) {
			$scope.loading = false;
			$scope.newMentors = '';
			$scope.closeMentorModal();
		})
		.catch(function(err) {
			console.error(err);
			$scope.closeMentorModal();
		})
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


	// Modal related || TODO: refactor for make all modals consistent
	$scope.openModal = function () {
		$('body').css('overflow', 'hidden');
		$scope.studentModal = true;
	}

	$scope.closeModal = function () {
		$('body').css('overflow', 'inherit');
		$scope.studentModal = false;
	}


	// --------------- Navigating Calendar --------


	$scope.previousMonth = function() {
		if($scope.currentSegment === 0) {
			$('.fa-chevron-left').css('color', '#DFDFDF')
			return;
		}

		$scope.currentSegment--;

		$('.fa-chevron-left').css('color', '#000');
		$('.fa-chevron-right').css('color', '#000');

		$scope.activeMonth = $scope.currentCourse.curriculum[$scope.currentSegment];
	}

	$scope.nextMonth = function() {

		if($scope.currentSegment === $scope.segmentLength - 1){
			return;
		}

		$scope.currentSegment++;

		$('.fa-chevron-right').css('color', '#000');
		$('.fa-chevron-left').css('color', '#000');
		
		$scope.activeMonth = $scope.currentCourse.curriculum[$scope.currentSegment];

		if($scope.currentSegment === $scope.segmentLength - 1) {
			$('.fa-chevron-right').css('color', '#DFDFDF');
			return;
		}
	}

});