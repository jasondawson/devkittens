angular.module('devKittens')

.directive('cohortSettings', function (emailsService, instructorServices) {
	return {
		restrict: 'E',
		templateUrl: '/public/templates/cohortSettings.html',
		controller: function ($scope) {
			
			$scope.currentTab = 'students';

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

			$scope.sentInstructorInvite = function (instructorEmails) {
				$scope.loading = true;

				if (!instructorEmails) return console.warn('Plase add emails');
				var cohortInfo = {
					name: $scope.currentCohort.name,
					id: $scope.currentCohort._id
				}

				emailsService.sendInstuctorInvite(instructorEmails, cohortInfo)
				.then(function (response) {
					$scope.loading = false;
					$scope.newInstructors = '';
				})
				.catch(function (err) {
					$scope.loading = false;
				});
			}

			$scope.assignExistingInstructors = function (instructors) {
				var invitedIds = [];
				instructors.forEach(function (instructor) {
					if (instructor.selected) invitedIds.push(instructor._id);
				})

				instructorServices.assignToCohort(invitedIds, $scope.currentCohort._id)
				.then(function (response) {
					// Cleaning front end
					$scope.getAllInstructors();
				})
				.catch(function (err) {
					console.error(err);
				})

				
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