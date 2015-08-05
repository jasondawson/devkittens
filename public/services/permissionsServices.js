angular.module('devKittens')

.service('permissionsServices', function($q, $scope) {

	this.instructorPermissions = function(obj, user) {
		var dfrd = $q.defer();
		$http({
			method: "PUT",
			url: "/api/permissions/instructor/" + user._id,
			data: obj
		})
		.then(function(response) {
			dfrd.resolve(response);
		})
		return dfrd.promise;
	}
})