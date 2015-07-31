angular.module('devKittens')

.service('instructorServices', function($q, $http) {

	this.getInstructorInfo = function(userId) {
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
})