angular.module('devKittens')

.service('lessonService', function($http){

	this.createLesson = function(data){
		return $http({
			method: 'POST',
			url: '/api/lessons',
			data: data
		})
	};

	this.updateLessonTopic = function(id, topic){
		console.log(11111,id, topic)
		return $http({
			method: 'PUT',
			url: '/api/lessons/?id=' + id,
			data: {
				topic: topic
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

})