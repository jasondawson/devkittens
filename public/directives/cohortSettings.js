angular.module('devKittens')

.directive('cohortSettings', function (emailsService, instructorServices, cohortServices) {
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
			        case 'requests':
				        $scope.currentTab = 'requests';
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
				var invitedEmails = [];
				var invitedIds = [];

				instructors.forEach(function (instructor) {
					if (instructor.selected) {
						invitedEmails.push(instructor.userId.local.email);
						invitedIds.push(instructor._id);
					}
				})

				instructorServices.assignToCohort(invitedIds, $scope.currentCohort._id)
				.then(function (response) {
					// Send instructors an email notification
					emailsService.notifyInstructor(invitedEmails, $scope.currentCohort.name);

					// Cleaning front end
					$scope.getAllInstructors();
				})
				.catch(function (err) {
					console.error(err);
				})

			}


			$scope.logger = function(x) {console.log(x)};
			
			$scope.messageText;
			$scope.displayAlert = false;

			$scope.assignInstructor = function(day, instructor, dayIndex) {
				console.log(dayIndex);
				cohortServices.addInstructor(instructor, $scope.currentCohort._id, day.lesson, day._id, dayIndex)
				.then(function(response) {
					// console.log(response, dayIndex);
					$scope.currentCohort.curriculum[0][dayIndex].instructor = instructor;
					$scope.currentCohort.curriculum[0][dayIndex].wantsToTeach.length = 0;
					$scope.messageText = "Success! On " + $scope.currentCohort.curriculum[0][dayIndex].day + ", " + instructor.name + " will teach your class about " + $scope.currentCohort.curriculum[0][dayIndex].topic + "."
					$scope.displayAlert = true;

				})
			}

			$scope.wantsToTeach = [];
			$scope.importantIndex;
			$scope.selectDay = function(index) {
				$scope.wantsToTeach = $scope.currentCohort.curriculum[0][index].wantsToTeach;
				$scope.importantIndex = index;
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