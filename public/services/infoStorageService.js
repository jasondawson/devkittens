angular.module('devKittens')

.factory('infoStorage', function () {
	var service = {};
	
	var user;
	var cohortId;

	service.saveUser = function (passedUser) {
		user = passedUser;
	}

	service.serveUser = function () {
		if (user) return user;
		return null;
	}


	service.saveCohortId = function (id) {
		cohortId = id;
	}

	service.serveCohortId = function () {
		return cohortId;
	}

	return service;
})