angular.module('devKittens')

.config(function ($routeProvider) {

	$routeProvider
	.when('/home', {
		templateUrl: '/public/templates/home.html',
		controller: 'HomeController'
	})

	.when('/calendar', {
		templateUrl: '/public/templates/calendar.html',
		controller: 'CalendarController'
	})

	.otherwise('/');
})