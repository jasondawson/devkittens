angular.module('devKittens')

.factory('infoStorage', function () {
	var service = {};

	var daysOfWeek = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
	
	var user;
	var lessonRef;
	var calendarId;
	var currentCourseData;
	// ^^^ calendar can be a cohort or curriculum


	// USER
	service.saveUser = function (passedUser) {
		user = passedUser;
	}

	service.serveUser = function () {
		if (user) return user;
		return null;
	}


	// CALENDAR
	service.saveCalendarId = function (id) {
		calendarId = id;
	}

	service.serveCalendarId = function () {
		return calendarId;
	}


	// LESSON
	service.saveLessonRef = function (info) {
		// Lesson info saved on curriculum schema (not lesson)
		lessonRef = info;
	}

	service.serveLessonRef = function () {
		return lessonRef;
	}


	// COURSE
	service.setCurrentCourse = function(currentCourse) {
		currentCourseData = currentCourse;
	}

	service.getCurrentCourse = function() {
		var currentCourseArray = [];
		for(var i = 0; i < currentCourseData.curriculum.length; i += 30) {
			currentCourseArray.push(currentCourseData.curriculum.slice(i, i + 30))
			console.log('currentCourseArray ', currentCourseArray);
		}

		currentCourseData.curriculum = currentCourseArray;

		return currentCourseData;
	}


	// WEEK DAY
	service.getDayOfWeek = function() {
		return daysOfWeek;
	}

	return service;
})