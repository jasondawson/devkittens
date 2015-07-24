angular.module('devKittens')

.directive('lesson', function () {
	return {
		restrict: 'E',
		templateUrl: '/public/templates/lesson.html',
		controller: function($scope, lessonService, courseServices){
			$scope.show = false;

			$scope.topic ='';
			$scope.item ='';
			

			// ADD TITLE/TOPIC
			$scope.setTopic = function(topic){
				$scope.topic = topic;
			}


			// SECTION SPECIFIC
			$scope.sections = [];
			$scope.addSection = function(section){
				$scope.sections.push(section)
				$scope.section = {};
			}

			$scope.addContent = function(i, item){
				$scope.sections[i].content.push(item)
				$scope.item = '';
				item = ''
			}


			// STORE LESSON
			$scope.createLesson = function(topic){
				data = {
					topic: topic, 
					preReading: $scope.preReadings,
					objectives: $scope.objectives,
					miniProject: $scope.miniProjects,
					project: $scope.projects,
					additionReading: $scope.readings
				}

				lessonService.createLesson(data).then(function(response){
					console.log('lesson', response)
					courseServices.updateCourseCurriculum($scope.currentEvent._id, response.data._id).then(function(response){
						console.log(response)
					})
					$scope.topic ='';
					$scope.preReadings = [];
					$scope.objectives = [];
					$scope.miniProjects = [];
					$scope.projects = [];
					$scope.readings = [];
				})
			}

		},
		link: function (scope, elem, attrs) {
			//MODAL UX/UI --> move to directive?
			scope.showModal = function(event){
				$('body').css('overflow', 'hidden');

				scope.currentEvent = event;
				scope.show = !scope.show;
			}

			scope.closeModal = function(){
				$('body').css('overflow', 'auto');

				if(scope.topic || scope.sections){
					confirm('Closing without saving your lesson will delete your data.  Are you sure you want to exit without saving?')
					scope.show = !scope.show;
				}
			}
		}
	}
});