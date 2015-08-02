	angular.module('devKittens')

	.factory('dashboardService', function($http) {

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
			return $http({
				method: 'GET',
				url: '/api/instructify/' + user._id
			})
		}
		
		return service;
	
	});