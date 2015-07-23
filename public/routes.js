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

	.when('/dashboard-mentors', {
		templateUrl: '/public/templates/dashboard-mentors.html',
		controller: 'MentorController',
		resolve: {
			mentorData: function(dashboardService) {
				var mentorData = dashboardService.getMentorData();
				console.log('mentorData ', mentorData);
				return mentorData;
			},
			cohortData: function () {
				return null;
			}
		}
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