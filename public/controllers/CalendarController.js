angular.module('devKittens')

.controller('CalendarController',
function ($scope, user, calendarService, specificCohortData, infoStorage, emailsService, cohortServices, currentCourseData) {



	$scope.user = user;	
	// $scope.students = specificCohortData.students;
	// $scope.events = specificCohortData.curriculum;
	$scope.currentCourse = currentCourseData;
	// infoStorage.saveCalendarId(specificCohortData._id);

	console.log('currentCourseData ', currentCourseData);

	

	// get active course info
	// $scope.course = {
	// 	name: specificCohortData.name
	// }

	$scope.sendStudentInvite = function (studentEmails) {
		$scope.loading = true;

		if (!studentEmails) return console.warn('Plase add emails');
		var cohortInfo = {
			name: specificCohortData.name,
			id: specificCohortData._id
		}
		emailsService.sendStudentInvite(studentEmails, cohortInfo)
		.then(function (response) {
			console.log(response);
			$scope.loading = false;
			$scope.newStudents = '';
			$scope.closeModal();
		})
		.catch(function (err) {
			console.error(err);
			$scope.loading = false;
		});
	}

	$scope.sendMentorInvite = function(mentorEmails) {
		$scope.loading = true;
		if(!mentorEmails) return console.warn('Please add emails');

		emailsService.sendMentorInvite(mentorEmails)
		.then(function(response) {
			console.log(response);
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


	// --------------- UPDATING LESSON ------------

	$scope.updateLessonTopic = function(event){
		var id = event._id;
		var lesson = {
			topic: event.lesson.topic,
			sections: event.lesson.sections
		};
		var data = lesson
		cohortServices.updateLesson(id, lesson).then(function(response){
			console.log(response)
			event.lesson.editTopic = !event.lesson.editTopic
		})
	}

	// $scope.updateLessonSection = function(id, title, content){
	$scope.updateLessonSection = function(event, section){
		var event = event;
		var id = event._id
		// var data = {
		// 	'sections.$.title' : section.title,
		// 	'sections.$.content': section.content
		// }
		var lesson = {
			topic: event.lesson.topic,
			sections: event.lesson.sections
		};
		cohortServices.updateLesson(id, lesson).then(function(response){
			section.editSection = !section.editSection;
		})
	}

	$scope.addLessonSection = function(event, section){
		var lesson = event.lesson;
		var id = event._id;
		section.show = !section.show
		cohortServices.addLessonSection(id, section).then(function(response){
			console.log(response)
			// console.log('response', response.data.sections[response.data.sections.length -1])
			// lesson.sections.push(response.data.sections[response.data.sections.length - 1]);
			// console.log(lesson.sections)
		})
	}

	$scope.removeLessonSection = function(index, event, section){
		$scope.sections = event.lesson.sections;
		var id = section._id;
		cohortServices.removeLessonSection(id).then(function(response){
			// $scope.sections = event.lesson.sections
			$scope.sections.splice(index, 1);
		})
	}


});