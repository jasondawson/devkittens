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

	this.getCourseByCurriculumId = function(curriculumId){
		return $http({
			method: 'GET',
			url: '/api/course',
			data: {
				'curriculum._id': curriculumId
			}
		})
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


	//MIGHT BE BROKEN
	// this.updateCourseCurriculum = function(event, lessonId, topic) {

	this.updateCourseCurriculum = function(curriculumId, lessonId, topic) {
		return $http({
			method: 'PUT',
			url: "/api/course/" + curriculumId,
			data: {
				lesson: lessonId,
				topic: topic
				// index: event.day
			}
		})
	}

})















