angular.module('devKittens')

.controller('CalendarController',
function ($scope, user, calendarService, specificCohortData, infoStorage, emailsService, cohortServices) {

	$scope.user = user;	
	$scope.students = specificCohortData.students;
	$scope.events = specificCohortData.curriculum;
	infoStorage.saveCalendarId(specificCohortData._id);


	$scope.toggleSubscribeCohort = false;
	$scope.backdropVisible = false;


	// get active course info
	$scope.course = {
		name: specificCohortData.name
	}

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


	// Modal related || TODO: refactor for make all modals consistent
	$scope.openModal = function () {
		$('body').css('overflow', 'hidden');
		$scope.studentModal = true;
	}

	$scope.closeModal = function () {
		$('body').css('overflow', 'inherit');
		$scope.studentModal = false;
	}

	$scope.toggleSubscribeCohortModal = function() {
		$scope.toggleSubscribeCohort = !$scope.toggleSubscribeCohort;
		$scope.backdropVisible = !$scope.backdropVisible;
	}


	// --------------- UPDATING LESSON ------------

	$scope.updateLessonTopic = function(lesson){
		var id = lesson._id;
		var topic = lesson.topic
		cohortServices.updateLessonTopic(id, topic).then(function(response){
			lesson.editTopic = !lesson.editTopic
		})
	}

	// $scope.updateLessonSection = function(id, title, content){
	$scope.updateLessonSection = function(section){
		var id = section._id
		var data = {
			'sections.$.title' : section.title,
			'sections.$.content': section.content
		}
		cohortServices.updateLessonSection(id, data).then(function(response){
			section.editSection = !section.editSection;
		})
	}

	$scope.addLessonSection = function(lesson, section){
		var id = lesson._id;
		section.show = !section.show
		cohortServices.addLessonSection(id, section).then(function(response){
			console.log('response', response.data.sections[response.data.sections.length -1])
			lesson.sections.push(response.data.sections[response.data.sections.length - 1]);
			console.log(lesson.sections)
		})
	}

	$scope.removeLessonSection = function(index, sections, section){
		$scope.sections = sections;
		var id = section._id;
		cohortServices.removeLessonSection(id).then(function(response){
			$scope.sections = sections
			$scope.sections.splice(index, 1);
		})
	}


});