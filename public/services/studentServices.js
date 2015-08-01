angular.module('devKittens')

.service('studentServices', function($q, $http, $location) {

	this.markAsCompleted = function(userId, dayIndex, sectionIndex, dayId) {
		var dfrd = $q.defer();
		$http({
			method: "POST",
			url: '/api/completed',
			data: {
				userId: userId,
				dayIndex: dayIndex,
				sectionIndex: sectionIndex,
				dayId: dayId
			}
		})
		.then(function(response) {
			dfrd.resolve(response.data);
			$location.path('/dashboard');
		})
		return dfrd.promise;
	}

	this.markAsIncomplete = function(userId, dayIndex, sectionIndex, dayId) {
		var dfrd = $q.defer();
		$http({
			method: "PUT",
			url: '/api/completed',
			data: {
				userId: userId,
				dayIndex: dayIndex,
				sectionIndex: sectionIndex,
				dayId: dayId
			}
		})
		.then(function(response) {
			dfrd.resolve(response.data);
			$location.path('/dashboard');

		})
		return dfrd.promise;
	}
})