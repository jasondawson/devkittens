angular.module('devKittens')

.factory('instructorEmailsService', function($q, $http) {
	var service = {};

	service.sendCancelEmail = function(user, day) {
		var dfrd = $q.defer()
		$http({
			method: "POST",
			url: "api/email",
			data: {
				html: '<p>Warning: ' + user.name + ' has canceled his/her teaching appointment on ' + day.day + '.</p>'
					+ '<p>Please find a new instructor.',
				subject: "Lesson Cancellation",
				to: [{
					email: "jeremy-email@gmail.com",
					type: "to"
				}]
			}
		})
		.then(function(response) {
			dfrd.resolve(response.data);
		})
		return dfrd.promise;
	}

	service.sendAcceptEmail = function(instructor, day) {
		var dfrd = $q.defer();
		$http({
			method: "POST",
			url: "api/email",
			data: {
				html: '<p>Your request to teach on ' + day.day + ' has been accepted!' + 
					'<p>Please review the lesson plan at <a href="http://localhost:3000">http://localhost:3000</a>.' + 
					'<p>Thanks!</p>' + 
					'<p>The DevSyrup team</p>',
				subject: 'Lesson on ' + day.day,
				to: [{
					email: instructor.local.email,
					type: 'to'
				}]
			}
		})
		.then(function(response) {
			dfrd.resolve(response.data);
		})
		return dfrd.promise;
	}

	return service;
})