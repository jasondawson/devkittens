angular.module('devKittens')

.service('lessonService', function ($http, infoStorage) {

	this.createLesson = function(data){
		return $http({
			method: 'POST',
			url: '/api/lessons',
			data: data
		})
	};

	this.updateLessonTopic = function(id, topic, index){
		var index = index - 1;
		courseId = infoStorage.serveCalendarId();
		
		var courseInfo = {
			index: index,
			courseId: courseId
		}

		if (!courseInfo.courseId)
			return console.warn('Insufficient info needed to store.');

		return $http({
			method: 'PUT',
			url: '/api/lessons/?id=' + id,
			data: {
				topic: topic,
				courseInfo: courseInfo
			}
		})
	};

	this.updateLessonSection = function(id, data){
		return $http({
			method: 'PUT',
			url: '/api/lessons/' + id,
			data: data
		})
	};

	this.removeLessonSection = function(id){
		return $http({
			method: 'PUT',
			url: '/api/lessons/remove/' + id
		})
	};

	this.addLessonSection = function(id, section){
		return $http({
			method: 'POST',
			url: '/api/lesson/sections/' + id,
			data: section
		})
	}


})