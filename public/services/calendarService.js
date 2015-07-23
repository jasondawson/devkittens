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
			objectives: 'Bacon ipsum dolor amet prosciutto strip steak cupim ham. Capicola turducken shank pork belly. Ball tip cow jerky, sirloin turkey pork belly frankfurter doner pork loin. Porchetta pancetta picanha fatback beef ribs salami andouille bacon tongue biltong cupim jerky meatball pork. Venison turkey shankle beef sausage tenderloin ball tip swine.',
			projects:  ['https://github.com/DevMountain/learn-git', 'https://github.com/DevMountain/The-Pomodoro'],
			preReading: ['https://medium.com/javascript-jquery-angular-firebase-and-mongodb/angular-s-q-defer-and-q-all-are-cool-i-promise-992bfd401f11'],
			instructorName: 'Tyler McGinnis',
			instructorImg: 'https://avatars0.githubusercontent.com/u/2933430?v=3&s=460'
		},
		{
			_id: '12312qweq3',
			day: 2,
			date: new Date('2015-07-24')
		},
		{
			_id: 'asodias9d90',
			day: 3,
			topic: 'HTML & CSS Positioning',
			date: new Date('2015-07-25'),
			lessonPlan: 'https://docs.google.com/a/devmounta.in/document/d/1d',
			objectives: 'Bacon ipsum dolor amet prosciutto strip steak cupim ham. Capicola turducken shank pork belly. Ball tip cow jerky, sirloin turkey pork belly frankfurter doner pork loin.',
			projects:  ['https://github.com/DevMountain/learn-git'],
			instructorName: 'Tyler McGinnis',
			instructorImg: 'https://avatars0.githubusercontent.com/u/2933430?v=3&s=460'
		},
		{
			_id: '12312qweq3',
			day: 4,
			date: new Date('2015-07-26')
		},
		{
			_id: '12312qweq3',
			day: 5,
			date: new Date('2015-07-27')
		},
		{
			_id: '12312qweq3',
			day: 6,
			date: new Date('2015-07-28')
		}
	]
	////////////


	// Heavy lifting
	service.get = function () {
		return fakeCalendar;
	}


	return service;
});
