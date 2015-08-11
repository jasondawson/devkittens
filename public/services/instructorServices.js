angular.module('devKittens')

.factory('instructorServices', function ($http, $q) {
	var service = {};


	service.getInstructorInfo = function(userId) {
		var dfrd = $q.defer();

		$http({
			method: "GET",
			url: "/api/instructify/" + userId
		})
		.then(function(response) {
			dfrd.resolve(response.data);
		})
		return dfrd.promise;
	}


	service.getAll = function (cohortId) {
		var one = $q.defer();
		var two = $q.defer();
		var all = $q.all([one.promise, two.promise]);


		// Get all instructors
		$http.get('/api/instructors')
		.success(function (response) {
			one.resolve(response);
		})
		.error(function (err) {
			one.reject(err);
		})


		// Get instructors for cohort
		var uri = '/api/instructors/' + cohortId;
		$http.get(uri)
		.success(function (response) {
			two.resolve(response);
		})
		.error(function (err) {
			two.reject(err);
		})

		return all;
	}


	// TODO: this is assuming there is only one instructor to assign
	service.assignToCohort = function(userIds, cohortId) {
		var deferred = $q.defer();

		var data = {
			userIds: userIds,
			cohortId: cohortId
		}

		$http.put('/api/instructor', data)
		.success(function (response) {
			deferred.resolve(response);
		})
		.error(function (err) {
			deferred.reject(err);
		})


		return deferred.promise;
	}


	service.cleanInstructors = function (allInst, cohortInst) {
		var badList = [];
		allInst.forEach(function (instructor, index) {
			cohortInst.forEach(function (assignedInst) {
				if (instructor._id === assignedInst._id)
					badList.push(index); 
			})
		})

		for (var i = allInst.length - 1; i >= 0; i--) {
			if (badList.indexOf(i) > -1)
				allInst.splice(i, 1);
		}

		return allInst;
	}

	service.updateSchedule = function(topic, sections, instructor, dayId) {
		var dfrd = $q.defer();
		$http({
			method: "PUT",
			url: "/api/instructor/schedule/" + instructor + "/" + dayId,
			data: {
				topic: topic,
				sections: sections
			}
		})
		.then(function(response) {
			console.log(response)
			dfrd.resolve(response.data);
		})
		return dfrd.promise;
	}


	return service;
});