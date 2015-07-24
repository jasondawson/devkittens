angular.module('devKittens')

.service('courseServices', function($http, $q) {

	this.createNewCourse = function(obj) {
		var dfrd = $q.defer();
		
		$http({
			method: "POST",
			url: "/api/course",
			data: obj
		})
		.then(function (response) {
			dfrd.resolve(response.data);
		})
		.catch(function (err) {
			dfrd.reject(err);
		});

		return dfrd.promise;
	};

	this.getCourse = function(courseId) {
		var dfrd = $q.defer();

		$http({
			method: "GET",
			url: "/api/course/" + courseId
		})
		.then(function (response) {
			dfrd.resolve(response.data);
		})
		.catch(function (err) {
			dfrd.reject(err);
		});

		return dfrd.promise;
	},

	this.getAllCourses = function() {
		var dfrd = $q.defer();

		$http({
			method: "GET",
			url: '/api/all-courses'
		})
		.then(function (response) {
			dfrd.resolve(response.data);
		})
		.catch(function (err) {
			dfrd.reject(err);
		});

		return dfrd.promise;
	}


	this.updateCourseCurriculum = function(event, lessonId) {
		return $http({
			method: 'PUT',
			url: "/api/course/" + event._id,
			data: {
				lesson: lessonId,
				index: event.day
			}
		})
	}
})