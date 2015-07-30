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

		if (location === 'curriculum') {
			var uri = '/api/update-course/' + cohortId;
		} else if ('calendar') {
			var uri = '/api/cohort/' + cohortId;
		} else {
			return console.info('Unidentified timeline page location.');
		}


		$http.put(uri, newOrderById)
		.success(function (response) {
			deferred.resolve(response);
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
			console.warn(response.data);
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

	// this.removeLessonSection = function(id){
	// 	return $http({
	// 		method: 'PUT',
	// 		url: '/api/cohort/lessons/remove/' + id
	// 	})
	// };


	// this.addLessonSection = function(id, section){
	// 	return $http({
	// 		method: 'POST',
	// 		url: '/api/cohort/lesson/sections/' + id,
	// 		data: section
	// 	})
	// }
})


