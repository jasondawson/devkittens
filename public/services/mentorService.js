angular.module('devKittens')

.service('mentorService', function($http) {
	
	this.getMentors = function(){
		return $http({
			method: 'GET',
			url: '/api/mentors'
		})
	}

	this.assignMentors = function(mentor, cohortId) {
		console.log('assignMentors at mentorService ', mentor);
		return $http({
			method: 'PUT',
			url: '/api/mentors/' + cohortId,
			data: mentor
		})
	}

});