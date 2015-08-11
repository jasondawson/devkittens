angular.module('devKittens')

.directive('cohortSettings', function (emailsService, instructorServices, instructorEmailsService, cohortServices) {
	return {
		restrict: 'E',
		templateUrl: '/public/templates/cohortSettings.html',
		controller: function ($scope) {
			
			$scope.currentTab = 'students';
			$scope.showStudents= function(){
				$scope.show = !$scope.show;
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

			$scope.assignInstructor = function(day, instructor, dayIndex) {
				// console.log('fired', day);
				instructorEmailsService.sendAcceptEmail(instructor, day)
				.then(function(response) {
				})
				.catch(function(err) {
					console.warn(err);
				})
				cohortServices.addInstructor(instructor, $scope.currentCohort._id, day, day._id, dayIndex)
				.then(function(response) {
					$scope.currentCohort.curriculum[0][dayIndex].instructor = instructor;
					$scope.currentCohort.curriculum[0][dayIndex].wantsToTeach.length = 0;
					$scope.messageText = "Success! On " + $scope.currentCohort.curriculum[0][dayIndex].day + ", " + instructor.name + " will teach your class about " + $scope.currentCohort.curriculum[0][dayIndex].topic + "."
					$scope.displaySuccess = true;
				})
				.catch(function(err) {
					console.warn(err);
				})
			}

			$scope.wantsToTeach = [];
			$scope.importantIndex;
			$scope.evilIndex = function() {
				for (var i = 0; i < $scope.currentCohort.curriculum[0].length; i++) {
					if ($scope.currentCohort.curriculum[0][i].wantsToTeach.length > 0) {
						return i;
					}
				}
			}

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