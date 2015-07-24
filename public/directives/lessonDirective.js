angular.module('devKittens')

.directive('lesson', function () {
	return {
		restrict: 'E',
		templateUrl: '/public/templates/lesson.html',
		controller: function($scope, lessonService, courseServices){
			$scope.show = false;

			$scope.topic ='';
			$scope.item ='';
			$scope.activeDay;
			

			// ADD TITLE/TOPIC
			$scope.setTopic = function(topic){
				$scope.topic = topic;
			}


			// SECTION SPECIFIC
			$scope.sections = [];
			$scope.addSection = function(section){
				$scope.sections.push(section)
				$scope.newSection = {};
			}

			$scope.addContent = function(i, item){
				$scope.sections[i].content.push(item)
				$scope.item = '';
				item = ''
			}


			// STORE LESSON
			$scope.createLesson = function(topic) {
				data = {
					topic: topic,
					sections: $scope.sections
				}

				lessonService.createLesson(data)
				.then(function(response){

					courseServices.updateCourseCurriculum($scope.currentEvent, response.data._id)
					.then(function(response){
						$scope.events = response.data.curriculum;
					})


					// Clear values
					$scope.closeModal('skip');

					$scope.preReadings = [];
					$scope.objectives = [];
					$scope.miniProjects = [];
					$scope.projects = [];
					$scope.readings = [];
				})
				.catch(function (err) {
					throw new Error(err);
				});
			}

		},
		link: function (scope, elem, attrs) {
			//MODAL UX/UI --> move to directive?
			scope.showModal = function(event){
				$('body').css('overflow', 'hidden');

				scope.currentEvent = event;
				scope.show = !scope.show;
			}

			scope.closeModal = function (skip){
				if (skip) return close();

				if(scope.topic || scope.sections.length){
					confirm('Closing without saving your lesson will delete your data.  Are you sure you want to exit without saving?')
					close();
				} else {
					close();
				}

				function close () {
					$('body').css('overflow', 'auto');
					scope.show = !scope.show;

					// Clear the data
					scope.sections = [];
					scope.newSection = {};
					scope.topic = '';
				}
			}
		}
	}
});