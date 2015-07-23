angular.module('devKittens')

.controller('CurriculumController', function ($scope, lessonService) {
	// TODO: make this a directive
	document.body.scrollTop = document.documentElement.scrollTop = 0;

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