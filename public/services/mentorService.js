angular.module('devKittens')

.service('mentorService', function($http) {
	
	this.getMentors = function(){
		return $http({
			method: 'GET',
			url: '/api/mentors'
		})
	}

	this.assignCohort = function(mentor, cohortId) {
		return $http({
			method: 'PUT',
			url: '/api/mentors/' + cohortId,
			data: mentor
		})
	}

	this.assignStudents = function(mentor, student, cohortId) {
		return $http({
			method: 'PUT',
			url: '/api/mentors/students'
		})
	}

});