angular.module('devKittens')

.service('lessonService', function($http){

	this.createLesson = function(data){
		return $http({
			method: 'POST',
			url: '/api/lessons',
			data: data
		})
	};

	this.updateLesson = function(data){
		return $http({
			method: 'PUT',
			url: '/api/lessons',
			data: data
		})
	};

})