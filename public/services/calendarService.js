angular.module('devKittens')

.factory('calendarService', function () {
	var service = {};


	// Temp data
	var fakeCalendar = [
		{
			_id: 'asdaskdja21312',
			day: 1,
			topic: 'Orientation - Git',
			date: new Date(),
			lessonPlan: 'https://docs.google.com/a/devmounta.in/document/d/1d',
			projects:  'https://github.com/DevMountain/learn-git',
			instructor: 'Tyler McGinnis'
		},
		{
			_id: '12312qweq3',
			day: 2,
			date: new Date('2015-07-23')
		},
		{
			_id: 'asodias9d90',
			day: 3,
			topic: 'Orientation - Git',
			date: new Date('2015-07-24'),
			lessonPlan: 'https://docs.google.com/a/devmounta.in/document/d/1d',
			projects:  'https://github.com/DevMountain/learn-git',
			instructor: 'Tyler McGinnis'
		},
		{
			_id: '12312qweq3',
			day: 4,
			date: new Date('2015-07-25')
		},
		{
			_id: '12312qweq3',
			day: 4,
			date: new Date('2015-07-26')
		},
		{
			_id: '12312qweq3',
			day: 4,
			date: new Date('2015-07-27')
		}
	]
	////////////


	// Heavy lifting
	service.get = function () {
		return fakeCalendar;
	}


	return service;
});
