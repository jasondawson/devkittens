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

	.when('/dashboard', {
		templateUrl: '/public/templates/dashboard.html',
		controller: 'DashboardController',
		resolve: {
			cohortData: function(dashboardService) {
				var cohortData = dashboardService.getCohortData();
				console.log('resolve ', cohortData);
				return cohortData;
			}
		}
	})
	.when('/curriculum', {
		templateUrl: '/public/templates/curriculum.html',
		controller: 'CurriculumController'
	})

	.otherwise('/');
})