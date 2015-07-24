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

					////objectives

			
			$scope.objectives = [];

			$scope.addObjective = function(){
				if ($scope.text) {
		          	$scope.objectives.push(this.text);
		          	$scope.text = '';
		        }
			}

			$scope.removeObjective = function(index){
				$scope.objectives.splice(index,1);
			}


			////pre-readings

			$scope.preReadings = [];

			$scope.addPreReading = function(title, url){
				console.log(11111)
				if(title && url){
					$scope.preReadings.push({
						title: title,
						url: url
					})
					$scope.title = '';
					$scope.url = '';
				}
			}

			$scope.removePreReading = function(index){
				$scope.preReadings.splice(index,1);
			}


			////additional readings


			$scope.readings = [];

			$scope.addReading = function(title, url){
				if(title && url){
					$scope.readings.push({
						title: title,
						url: url
					})
					$scope.readTitle = '';
					$scope.readUrl = '';
				}
			}

			$scope.removeReading = function(index){
				$scope.readings.splice(index,1);
			}

			//// mini projects


			$scope.miniProjects = [];

			$scope.addMiniProject = function(name, url){
				console.log(11111)
				if(name && url){
					$scope.miniProjects.push({
						name: name,
						url: url
					})
					$scope.miniProject = '';
					$scope.miniProjectUrl = '';
				}
			}

			$scope.removeMiniProject = function(index){
				$scope.miniProjects.splice(index,1);
			}


			//// projects


			$scope.projects = [];

			$scope.addProject = function(name, url){
				console.log(11111)
				if(name && url){
					$scope.projects.push({
						name: name,
						url: url
					})
					$scope.project = '';
					$scope.projectUrl = '';
				}
			}

			$scope.removeProject = function(index){
				$scope.projects.splice(index,1);
			}






			// $scope.events = lessonService.get();
			// console.log($scope.events);

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