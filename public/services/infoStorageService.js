angular.module('devKittens')

.factory('infoStorage', function () {
	var service = {};
	var user;

	service.saveUser = function (passedUser) {
		user = passedUser;
	}

	service.serveUser = function () {
		if (user) return user;
		return null;
	}


	return service;
})