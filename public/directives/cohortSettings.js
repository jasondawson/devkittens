angular.module('devKittens')

.directive('cohortSettings', function (emailsService) {
	return {
		restrict: 'E',
		templateUrl: '/public/templates/cohortSettings.html',
		controller: function ($scope) {
			
			$scope.currentTab = 'students';

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

			$scope.activateMenu = function (tabName) {
				switch(tabName) {
				    case 'students':
				    	$scope.currentTab = 'students';
				        break;
				    case 'mentors':
				        $scope.currentTab = 'mentors';
				        break;
		        	case 'instructors':
				        $scope.currentTab = 'instructors';
				        break;
				}
			}
		}
	}
})


.directive('activeMenu', function () {
	return {
		restrict: 'A',
		link: function(scope, elem, attrs) {
			elem.bind('click', function () {
				removeClass();
				elem.addClass('active-dsh');
			});

			function removeClass () {
				$('.dsh-menu').find('.dsh-item').removeClass('active-dsh');
			}
		}
	}
})