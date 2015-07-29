angular.module('devKittens')

.config(function ($routeProvider) {

	$routeProvider
	.when('/', {
		templateUrl: '/public/templates/home.html',
		controller: 'HomeController'
	})

	.when('/calendar/:cohortId?', {
		templateUrl: '/public/templates/calendar.html',
		controller: 'CalendarController',
		resolve: {
			specificCohortData: function (cohortServices, $route) {
				return cohortServices.getCohort($route.current.params.cohortId);
			},
			user: getAuth
		}
	})

	.when('/dashboard', {
		templateUrl: '/public/templates/dashboard.html',
		controller: 'DashboardController',
		resolve: {
			cohortData: function (cohortServices) {
				return cohortServices.getAllCohorts();
			},
			courseData: function (courseServices) {
				return courseServices.getAllCourses();
			},
			usersData: function (dashboardService, $q) {
				var dfd = $q.defer();
				dashboardService.getUsers().then(function(response) {
					dfd.resolve(response.data);
				}, function(err) {
					console.log('Houston... ', err);
				})
				return dfd.promise;
			},
			user: getBlockedAuth
		}
	})

	.when('/curriculum/:courseId?', {
		templateUrl: '/public/templates/curriculum.html',
		controller: 'CurriculumController',
		resolve: {
			courseRef: function (courseServices, $route) {
				return courseServices.getCourse($route.current.params.courseId);
			},
			user: getBlockedAuth
		}
	})

	.when('/registration/:courseId', {
		templateUrl: '/public/templates/registration.html',
		controller: 'registrationController',
		resolve: {
			courseId: function ($route) {
				return $route.current.params.courseId;
			}
		}
	})

	.when('/user-settings', {
		templateUrl: '/public/templates/userSettings.html',
		controller: 'UserSettingsController',
		resolve: {
			user: getAuth
		}
	})

	.otherwise('/');
})


// Heavy lifting
function getAuth ($http, $location, $q, userService, infoStorage) {
	var dfd = $q.defer();

	$http.get('/api/auth')
	.success(function (response) {

		userService.getTypeData(response.userType, response._id)
		.then(function (result) {
			response.typeData = result[0];
			// store user client side
			infoStorage.saveUser(response);
			dfd.resolve(response);
		})
		.catch(function (err) {
			console.error(err);
			dfd.reject(err);
		})

	})
	.error(function (err) {
		$location.path('/login');
	});

	return dfd.promise;
}


function getBlockedAuth ($http, $location, $q, userService, infoStorage) {
	var dfd = $q.defer();

	$http.get('/api/auth')
	.success(function (response) {

		userService.getTypeData(response.userType, response._id)
		.then(function (result) {
			response.typeData = result[0];
			// store user client side
			infoStorage.saveUser(response);

			// Prevent student to login on protected page
			if (response.userType === 'student') return $location.path('/calendar/' + response.typeData.cohortId);

			dfd.resolve(response);
		})
		.catch(function (err) {
			console.error(err);
			dfd.reject(err);
		})

	})
	.error(function (err) {
		$location.path('/login');
	});

	return dfd.promise;
}




// DEPRECATED
// .when('/dashboard-mentors', {
// 	templateUrl: '/public/templates/dashboard-mentors.html',
// 	controller: 'MentorController',
// 	resolve: {
// 		mentorData: function (dashboardService) {
// 			return dashboardService.getMentorData();
// 			// console.log('mentorData ', mentorData);
			
// 		},
// 		optionsData: function (dashboardService) {
// 			return dashboardService.getOptions();
// 		},
// 		usersData: function (dashboardService, $q) {
// 			var dfd = $q.defer();
// 			dashboardService.getUsers().then(function(response) {
// 				dfd.resolve(response.data);
// 			}, function(err) {
// 				console.log('Houston... ', err);
// 			})
// 			return dfd.promise;
// 		},
// 		user: getAuth
// 	}
// })