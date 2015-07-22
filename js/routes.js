angular.module('devKittens')

.config(function ($routeProvider) {

	$routeProvider
	.when('/home', {
		templateUrl: '/templates/home.html',
		controller: 'HomeController'
	})

	.when('/calendar', {
		templateUrl: '/templates/calendar.html',
		controller: 'CalendarController'
	})

	.otherwise('/');
})