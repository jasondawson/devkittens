	angular.module('devKittens')

	.factory('dashboardService', function() {

		var service = {};

		// Temp data - for testing
		var cohortArray = [
			{
				name: 'Full Immersive Web Dev - DM4',
				sched: 'May 18 - Aug 14, 2015',
				location: 'Provo, UT'
			},
			{
				name: 'Full Immersive Web Dev - DM5',
				sched: 'July 14 - Oct 15, 2015',
				location: 'Provo, UT'
			},
			{
				name: 'After Hours Web Dev',
				sched: 'June 15 - Sept 15 2015',
				location: 'Provo, UT'
			},
			{
				name: 'UI/UX Design',
				sched: 'July 1 - Oct 1 2015',
				location: 'Provo, UT'
			},
			{
				name: 'UI/UX Design',
				sched: 'Aug 1 - Dec 1 2015',
				location: 'Provo, UT'
			}			
		]

		// Heavy lifting
		service.getCohortData = function() {
			return cohortArray;
		}


		return service;
	});