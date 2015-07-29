angular.module('devKittens')

.service('lessonService', function ($http, $location, infoStorage, $q) {

	this.createLesson = function(data){
		return $http({
			method: 'POST',
			url: '/api/lessons',
			data: data
		})
	};

	this.getLesson = function (course, dayId) {
		var deferred = $q.defer();
		var uri = '/api/lesson/' + course + '/' + dayId;

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

	this.updateLesson = function(dayId, courseId, lessonId, topic, sections){
		var index = dayId.day - 1;
		console.log("dayId", dayId)

		var info = {
			courseId: courseId,
			dayId: dayId,
			index: index
		}

		return $http({
			method: 'PUT',
			url: '/api/lessons/?id=' + lessonId,
			data: {
				topic: topic,
				sections : sections,
				info: info
			}
		})
	};

	// this.updateLessonSection = function(id, data){
	// 	return $http({
	// 		method: 'PUT',
	// 		url: '/api/lessons/' + id,
	// 		data: data
	// 	})
	// };

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