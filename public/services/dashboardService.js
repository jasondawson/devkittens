	angular.module('devKittens')

	.factory('dashboardService', function($q, $http) {

		var service = {};

		var options = [ 'Schedule', 'Extra Duties', 'Mentos', 'Other']

		// Heavy lifting
		service.getUsers = function() {
			return $http({
				method: 'GET',
				url: '/api/users'
			})
		}

		service.getOptions = function() {
			return options;
		}

		service.getInstructorInfo = function(user) {
			var dfrd = $q.defer();
			$http({
				method: 'GET',
				url: '/api/instructify/' + user._id
			})
			.then(function(response) {
				dfrd.resolve(response.data);
			})
			return dfrd.promise;
		}
		
		return service;
	
	});