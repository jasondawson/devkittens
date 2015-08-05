angular.module('devKittens')

.factory('userService', function ($http, $q) {
	var service = {};

	service.updateUser = function (userData, id) {
		var deferred = $q.defer();
		var uri = '/api/user/' + id;

		$http.put(uri, userData)
		.success(function (response) {
			deferred.resolve(response);
		})
		.error(function (err) {
			deferred.reject(err);
		});

		return deferred.promise;
	}


	service.getTypeData = function (type, id) {
		var deferred = $q.defer();

		var data = {
			userType: type,
			_id: id
		}

		// Post acting as a get
		$http.post('/api/data-type', data)
		.success(function (response) {
			deferred.resolve(response);
		})
		.error(function (err) {
			deferred.reject(err);
		});

		return deferred.promise;
	}

	service.instructorPermissions = function(obj, user) {
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

	service.mentorPermissions = function(obj, user) {
		var dfrd = $q.defer();
		$http({
			method: "PUT",
			url: "/api/permissions/mentor/" + user._id,
			data: obj
		})
		.then(function(response) {
			dfrd.resolve(response);
		})
		return dfrd.promise;
	}


	return service;
})