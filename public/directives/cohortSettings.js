angular.module('devKittens')

.directive('cohortSettings', function (emailsService) {
	return {
		restrict: 'E',
		templateUrl: '/public/templates/cohortSettings.html',
		controller: function ($scope) {
				$scope.sendStudentInvite = function (studentEmails) {
				$scope.loading = true;

				if (!studentEmails) return console.warn('Plase add emails');
				var cohortInfo = {
					name: $scope.currentCohort.name,
					id: $scope.currentCohort._id
				}
				emailsService.sendStudentInvite(studentEmails, cohortInfo)
				.then(function (response) {
					$scope.loading = false;
					$scope.newStudents = '';
				})
				.catch(function (err) {
					$scope.loading = false;
				});
			}
		}
	}
})


.directive('activeMenu', function ($timeout) {
	return {
		restrict: 'A',
		link: function(scope, elem, attrs) {
			elem.bind('click', function () {
				removeClass();
				elem.addClass('active-dsh');
			});


			// $timeout(function () {
			// 	switch(scope.activeMenu) {
			// 	    case 'students':
			// 	    	removeClass();
			// 	        elem.addClass('active-dsh');
			// 	        break;
			// 	    case 'mentors':
			// 	        removeClass();
			// 	        elem.addClass('active-dsh');
			// 	        break;
		 //        	case 'instructors':
			// 	        removeClass();
			// 	        elem.addClass('active-dsh');
			// 	        break;
			// 	}
			// })

			function removeClass () {
				$('.dsh-menu').find('.dsh-item').removeClass('active-dsh');
			}
		}
	}
})