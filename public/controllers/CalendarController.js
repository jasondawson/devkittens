angular.module('devKittens')

.controller('CalendarController',
function ($scope, calendarService, specificCohortData, emailsService, user) {

	$scope.user = user;	
	$scope.events = specificCohortData.curriculum;

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
			$scope.students = '';
		})
		.catch(function (err) {
			console.error(err);
			$scope.loading = false;
		});
	}


});