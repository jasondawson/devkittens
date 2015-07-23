	angular.module('devKittens')

	.factory('dashboardService', function($http) {

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

		var mentors = [
			{
				name: 'Jason Turner',
				img: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRCek3VfQcLjUKOSbjWt8ZvKSiIiLns-j2DFqbhoOommPVxxAya'
			},
			{
				name: 'Brock Neilson',
				img: 'http://www.oroklinidesign.com/wp-content/uploads/2013/04/207755_393770354043790_796592459_n.jpg'
			},
			{
				name: 'Page Garner',
				img: 'http://www.shinyshiny.tv/Susi%20avatar-thumb-176x176.jpg'
			},
			{
				name: 'Dylan Lott',
				img: 'http://2.bp.blogspot.com/-Stm39RLc1wU/UCEJ1NHaWeI/AAAAAAAACLk/2uYnJX2jUVE/s1600/20120807.png'
			}
		]

		// Heavy lifting
		service.getCohortData = function() {
			return cohortArray;
		}

		service.getMentorData = function() {
			return mentors;
		}

		return service;
	});