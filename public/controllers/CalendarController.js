angular.module('devKittens')

.controller('CalendarController',
function ($scope, calendarService, user, specificCohortData, infoStorage, emailsService) {

	$scope.user = user;	
	$scope.students = specificCohortData.students;
	$scope.events = specificCohortData.curriculum;
	infoStorage.saveCohortId(specificCohortData._id);


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


});