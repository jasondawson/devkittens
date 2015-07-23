angular.module('devKittens')

.controller('CurriculumController', function ($scope, lessonService) {
	// TODO: make this a directive
	document.body.scrollTop = document.documentElement.scrollTop = 0;


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

	// $scope.events = lessonService.get();
	// console.log($scope.events);

	$scope.createLesson = function(topic, objectives, preReading, miniProject, project, additionalReadings, teacher){
		data = {
			topic: topic, 
			preReading: preReading,
			objectives: objectives,
			miniProject: miniProject,
			project: project,
			additionReading: additionalReadings,
			teacher: teacher,
		}

		lessonService.createLesson(data).then(function(response){
			console.log(response)
		})
	}

});