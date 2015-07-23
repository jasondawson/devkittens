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
			miniProject: $scope.miniProject,
			project: $scope.project,
			additionReading: $scope.readings
		}

		lessonService.createLesson(data).then(function(response){
			console.log(response)
		})
	}

});