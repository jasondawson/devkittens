angular.module('devKittens')

.service('courseServices', function ($http, $q, infoStorage) {

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


	this.removeCourse = function(course) {
		var deferred = $q.defer();

		$http({
			method: 'PUT',
			url: '/api/course/remove/' + course._id
		}).then(function(response) {
			deferred.resolve(response.data);
		})
		.catch(function(err) {
			deferred.reject(err);
		})

		return deferred.promise;
	}

	this.getCourse = function(courseId) {
		var dfrd = $q.defer();
		var uri = '/api/course/' + courseId;

		$http.get(uri)
		.success(function (response) {
			dfrd.resolve(response);
		})
		.error(function (err) {
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















