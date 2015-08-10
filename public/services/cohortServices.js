angular.module("devKittens")

.service('cohortServices', function($http, $q) {

	this.createNewCohort = function(obj) {
		var dfrd = $q.defer();
		$http({
			method: "POST",
			url: "/api/cohort",
			data: obj
		}).then(function(response) {
			dfrd.resolve(response.data);
		})
		return dfrd.promise;
	}

	this.updateCoursesOrder = function (newOrderById, cohortId, location) {
		if (!cohortId) return console.error('Missing cohort id');

		var deferred = $q.defer();

		if (location === 'course') {
			var uri = '/api/update-course/' + cohortId;
		} else if ('calendar') {
			var uri = '/api/cohort/' + cohortId;
		} else {
			return console.info('Unidentified timeline page location.');
		}


		$http.put(uri, newOrderById)
		.success(function (response) {
			deferred.resolve(response.data);
		})
		.error(function (err) {
			deferred.resolve(err);
		});

		return deferred.promise;
	}

	this.getCohort = function(cohortId) {
		var dfrd = $q.defer();
		$http({
			url: "/api/cohort/" + cohortId,
			method: "GET"
		})
		.then(function(response) {
			dfrd.resolve(response.data);
		})
		.catch(function (err) {
			dfrd.reject(err);
		});
		return dfrd.promise;
	}

	this.getAllCohorts = function() {
		var dfrd = $q.defer();

		$http({
			method: "GET",
			url: '/api/all-cohorts'
		})
		.then(function (response) {
			dfrd.resolve(response.data);
		})
		.catch(function (err) {
			dfrd.reject(err);
		});

		return dfrd.promise;
	}

	this.getCohortLesson = function(cohortId, dayId) {
		var dfrd = $q.defer();

		$http({
			method: "GET",
			url: '/api/cohort-day/' + cohortId + '/' + dayId
		}).then(function (response) {
			dfrd.resolve(response.data);
		})
		.catch(function (err) {
			dfrd.reject(err);
		})
		return dfrd.promise;
	}

	// CREATE MENTRO GROUPS

	this.assignStudents = function(mentor, students, cohortId) {
		return $http({
			method: 'PUT',
			url: '/api/cohort/mentor-groups/' + cohortId,
			data: {
				mentor: mentor,
				students: students
			}
		})
	}

	// ADDING INSTRUCTOR TO THE DAY

	this.teachRequest = function(user, cohortId, dayIndex) {
		var dfrd = $q.defer();
		$http({
			method: "POST",
			url: "/api/requestify/" + cohortId + '/' + dayIndex,
			data: user
		})
		.then(function(response) {
			dfrd.resolve(response.data);
		})
		return dfrd.promise;
	}

	this.cancelRequest = function(user, cohortId, dayIndex) {
		var dfrd = $q.defer();
		$http({
			method: "PUT",
			url: "/api/requestify/" + cohortId + "/" + dayIndex,
			data: user
		})
		.then(function(response) {
			dfrd.resolve(response.data);
		})
		return dfrd.promise;
	}

	this.addInstructor = function(user, cohortId, lesson, dayId, dayIndex) {
		var dfrd = $q.defer();
		var req1 = $http({
			method: "PUT",
			url: '/api/instructify/' + user._id,
			data: lesson
		})

		var req2 = $http({
			method: "POST",
			url: '/api/instructify/' + cohortId + "/" + dayId,
			data: user
		})

		var req3 = $http({
			method: "POST",
			url: '/api/reserved/' + user._id + '/' + dayId
		})

		var req4 = $http({
			method: "DELETE",
			url: '/api/requestify/' + cohortId + '/' + dayIndex
		})

		$q.all([req1, req2, req3, req4])
		.then(function(response) {
			dfrd.resolve(response);
		})
		return dfrd.promise;
	}

	this.removeInstructor = function(user, lesson, dayId) {
		var dfrd = $q.defer();
		var req1 = $http({
			method: "PUT",
			url: '/api/destructify/' + user._id + "/" + dayId
		})

		var req2 = $http({
			method: "POST",
			url: '/api/destructify/' + dayId,
		})

		var req3 = $http({
			method: "PUT",
			url: '/api/reserved/' + user._id + '/' + dayId
		})

		$q.all([req1, req2, req3])
		.then(function(response) {
			dfrd.resolve(response);
		})
		return dfrd.promise;
	}


	//-------------------- UPDATING LESSON ----------------

	// this.updateLessonTopic = function(id, topic){
	// 	console.log(11111,id, topic)
	// 	return $http({
	// 		method: 'PUT',
	// 		url: '/api/cohort/lessons/' + id,
	// 		data: {
	// 			topic: topic
	// 		 }
	// 	})
	// };

	this.updateLesson = function(cohortId, dayId, topic, sections){
		return $http({
			method: 'PUT',
			url: '/api/cohort/lessons/' + cohortId,
			data: {
				topic: topic,
				sections: sections,
				dayId: dayId
			}
		})
	};

	this.removeLessonSection = function(cohortId, dayId, sectionId){
		return $http({
			method: 'PUT',
			url: '/api/cohort/section/remove',
			data: {
				cohortId: cohortId,
				dayId: dayId,
				sectionId: sectionId
			}
		})
	};


	this.addLessonSection = function(cohortId, dayId, section){
		return $http({
			method: 'POST',
			url: '/api/cohort/lesson/sections/' + cohortId + '/' + dayId,
			data: section
		})
	}
})


