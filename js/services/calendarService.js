angular.module('devKittens')

.factory('calendarService', function () {
	var service = {};


	// Temp data
	var fakeCalendar = [
		{
			topic: 'Orientation - Git',
			date: new Date(),
			lessonPlan: 'https://docs.google.com/a/devmounta.in/document/d/1d',
			projects:  'https://github.com/DevMountain/learn-git',
			instructor: 'Tyler McGinnis'

		}
	]
	////////////


	// Heavy lifting
	service.get = function () {
		return fakeCalendar;
	}


	return service;
});
