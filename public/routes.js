angular.module('devKittens')

.config(function ($routeProvider) {

	$routeProvider
	.when('/', {
		templateUrl: '/public/templates/home.html',
		controller: 'HomeController'
	})

	.when('/course/:courseId?', {
		templateUrl: '/public/templates/calendar.html',
		controller: 'CalendarController',
		resolve: {
			currentCourseData: function($route, $q, $location, infoStorage, courseServices, cohortServices) {
				var tempCourseData = infoStorage.getCurrentCourse();
				if (tempCourseData) return tempCourseData;
				else {
					var deferred = $q.defer();

					courseServices.getCourse($route.current.params.courseId)
					.then(function (response) {
						infoStorage.setCurrentCourse(response);
						var data = infoStorage.getCurrentCourse();
						deferred.resolve(data);
					})
					.catch(function (err) {
						console.error(err);
						$location.path('/dashboard');
						deferred.reject(err);
					});
					return deferred.promise;
				}
			},
			dayOfWeek: function(infoStorage) {
				return infoStorage.getDayOfWeek();
			},
			user: getAuth
		}
	})


	.when('/day/:curriculumId/:dayId', {
		templateUrl: '/public/templates/day.html',
		controller: 'DayController',
		resolve: {
			user: getBlockedAuth,
			curriculumId: function($route){
				return $route.current.params.curriculumId;
			},
			activeLesson: function (lessonService, $route) {
				return lessonService.getLesson($route.current.params.curriculumId, $route.current.params.dayId)
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

	.when('/registration/:userType', {
		templateUrl: '/public/templates/registration.html',
		controller: 'registrationController',
		resolve: {
			userType: function ($route) {
				return $route.current.params.userType;
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

	// .otherwise('/');
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
		$location.path('/');
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
			if (response.userType === 'student')
				return $location.path('/calendar/' + response.typeData.cohortId);

			dfd.resolve(response);
		})
		.catch(function (err) {
			console.error(err);
			dfd.reject(err);
		})

	})
	.error(function (err) {
		$location.path('/');
	});

	return dfd.promise;
};
