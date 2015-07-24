angular.module('devKittens')

.config(function ($routeProvider) {

	$routeProvider
	.when('/', {
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
			optionsData: function (dashboardService) {
				var options = dashboardService.getOptions();
				return options
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
			},
			courseData: function(courseServices) {
				return courseServices.getAllCourses();
			}
		}
	})


	.when('/curriculum/:courseId?', {
		templateUrl: '/public/templates/curriculum.html',
		controller: 'CurriculumController',
		resolve: {
			courseRef: function(courseServices, $route) {
				console.log($route.current.params.courseId)
				return courseServices.getCourse($route.current.params.courseId);
			}
		}
	})

	.otherwise('/');
})