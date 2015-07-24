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
				img: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRCek3VfQcLjUKOSbjWt8ZvKSiIiLns-j2DFqbhoOommPVxxAya',
				title: 'Lead Mentor',
				duties: 'Bacon ipsum dolor amet landjaeger flank ham doner turducken boudin frankfurter short loin beef salami pork chop tenderloin venison. Hamburger chicken beef ribs, short loin pork chop ham brisket.',
				mentos: [
					{
						name: 'Sherlynn',
						heartbeat: '90',
						email: 'sherlynn@gmail.com'
					},
					{
						name: 'Trae Durtschi',
						heartbeat: '90',
						email: 'trae@gmail.com'
					},
					{
						name: 'Jimmy Thanki',
						heartbeat: '70',
						email: 'jimmy@gmail.com'
					}
				],
				options: [ 'Schedule', 'Extra Duties', 'Mentos', 'Other']

			},
			{
				name: 'Brock Neilson',
				img: 'http://www.oroklinidesign.com/wp-content/uploads/2013/04/207755_393770354043790_796592459_n.jpg',
				title: 'Mentor',
				duties: 'Does your lorem ipsum text long for something a little meatier? Give our generator a try… it’s tasty!',
				mentos: [
					{
						name: 'Andrew Crane',
						heartbeat: '90',
						email: 'andrew@gmail.com'
					},
					{
						name: 'Kyle Zollinger',
						heartbeat: '95',
						email: 'kyle@gmail.com'
					},
					{
						name: 'Mark McIver',
						heartbeat: '96',
						email: 'mark@gmail.com'
					},
					{
						name: 'Daniel Falabella',
						heartbeat: '99',
						email: 'daniel@gmail.com'
					},
					{
						name: 'Joe Kobrosky',
						heartbeat: '20',
						email: 'joe@gmail.com'
					}
				],
				options: [ 'Schedule', 'Extra Duties', 'Mentos', 'Other']
			},
			{
				name: 'Page Garner',
				img: 'http://www.shinyshiny.tv/Susi%20avatar-thumb-176x176.jpg',
				title: 'Mentor',
				duties: 'Jowl leberkas biltong, drumstick pork ham hock pancetta andouille.',
				mentos: [
					{
						name: 'Alicia Chen',
						heartbeat: '90',
						email: 'alicia@gmail.com'
					},
					{
						name: 'Peter Greismer',
						heartbeat: '92',
						email: 'peter@gmail.com'
					},
					{
						name: 'Rob Hallowell',
						heartbeat: '80',
						email: 'Rob@gmail.com'
					}
				],
				options: [ 'Schedule', 'Extra Duties', 'Mentos', 'Other']
			},
			{
				name: 'Dylan Lott',
				img: 'http://2.bp.blogspot.com/-Stm39RLc1wU/UCEJ1NHaWeI/AAAAAAAACLk/2uYnJX2jUVE/s1600/20120807.png',
				title: 'Mentor',
				duties: 'Jerky filet mignon strip steak tail kielbasa, corned beef hamburger sirloin picanha flank ground round ribeye alcatra pancetta tri-tip.',
				mentos: [
					{
						name: 'Bob Carlson',
						heartbeat: '85',
						email: 'bob@gmail.com'
					},
					{
						name: 'Mikkel Davis',
						heartbeat: '92',
						email: 'mikkel@gmail.com'
					},
					{
						name: 'Derek Smith',
						heartbeat: '81',
						email: 'derek@gmail.com'
					}
				],
				options: [ 'Schedule', 'Extra Duties', 'Mentos', 'Other']
			}
		]

		var options = [ 'Schedule', 'Extra Duties', 'Mentos', 'Other']

		// Heavy lifting
		service.getCohortData = function() {
			return cohortArray;
		}

		service.getMentorData = function() {
			return mentors;
		}

		service.getOptions = function() {
			return options;
		}

		return service;
	});