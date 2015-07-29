angular.module('devKittens')

.service('lessonService', function ($http, $location, infoStorage, $q) {

	this.createLesson = function(data){
		return $http({
			method: 'POST',
			url: '/api/lessons',
			data: data
		})
	};

	this.getLesson = function (curriculumId, dayId) {
		var deferred = $q.defer();
		var uri = '/api/lesson/' + curriculumId + '/' + dayId;

		$http.get(uri)
		.success(function (response) {
			deferred.resolve(response);
		})
		.error(function (err) {
			deferred.reject(err);
			$location.path('/dashboard');
		});

		return deferred.promise;
	}

	this.updateLessonTopic = function(curriculumId, lessonId, topic){
		var dayId = infoStorage.serveLessonRef();
		var index = dayId.day - 1;

		var courseInfo = {
			courseId: curriculumId,
			index: index
		}

		return $http({
			method: 'PUT',
			url: '/api/lessons/?id=' + lessonId,
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