angular.module('devKittens')

.directive('timeline', function () {
	return {
		restrict: 'E',
		scope: {
			events: '='
		},
		templateUrl: '/public/templates/timeline.html',
		controller: function($scope){
			// $scope.show = false;
			// $scope.showModal = function(event){
			// 	console.log(event._id)
			// 	$scope.show = !$scope.show;
			// }
		}
	}
})




.directive('lesson', function () {
	return {
		restrict: 'E',
		templateUrl: '/public/templates/lesson.html',
		controller: function($scope, lessonService, courseServices){
			$scope.show = false;
			$scope.showModal = function(event){
				$scope.currentEvent = event;
				console.log($scope.currentEvent)
				$scope.show = !$scope.show;
			}

			$scope.closeModal = function(){
				if($scope.topic || $scope.sections){
					confirm('Closing without saving your lesson will delete your data.  Are you sure you want to exit without saving?')
					$scope.show = !$scope.show;
				}
			}

			$scope.topic ='';
			$scope.item ='';
			
			$scope.setTopic = function(topic){
				console.log(topic)
				$scope.topic = topic
			}


			$scope.sections = [];
			$scope.addSection = function(title){
				console.log(1111, title)
				$scope.sections.push({
					title: title,
					content: []
				})
				$scope.title = '';
			}

			$scope.addContent = function(i, item){
				$scope.sections[i].content.push(item)
				$scope.item = '';
				item = ''

			}

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

		}
	}
})