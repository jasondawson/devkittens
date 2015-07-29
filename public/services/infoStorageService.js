angular.module('devKittens')

.factory('infoStorage', function () {
	var service = {};
	
	var user;
	var calendarId;
	var currentCourseData;
	// ^^^ calendar can be a cohort or curriculum

	service.saveUser = function (passedUser) {
		user = passedUser;
	}

	service.serveUser = function () {
		if (user) return user;
		return null;
	}

	service.saveCalendarId = function (id) {
		calendarId = id;
	}

	service.serveCalendarId = function () {
		return calendarId;
	}

	service.setCurrentCourse = function(currentCourse) {
		currentCourseData = currentCourse;
	}

	service.getCurrentCourse = function() {
		return currentCourseData;
	}

	return service;
})