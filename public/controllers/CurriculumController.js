angular.module('devKittens')

.controller('CurriculumController', function ($scope, lessonService, courseRef, $sce, user) {
	// TODO: make this a directive
	document.body.scrollTop = document.documentElement.scrollTop = 0;
	$scope.user = user;
	$scope.events = courseRef.curriculum;
	$scope.courseTitle = courseRef.title
	
	for(i = 0; i < $scope.events.length; i++){
		switch ((i + 7) % 7){
			case 0 :
				$scope.events[i].dayName = 'Monday';
				break;
			case 1 :
				$scope.events[i].dayName = 'Tuesday';
				break;
			case 2 :
				$scope.events[i].dayName = 'Wednesday';
				break;
			case 3 :
				$scope.events[i].dayName = 'Thursday';
				break;
			case 4 :
				$scope.events[i].dayName = 'Friday';
				break;
			case 5 :
				$scope.events[i].dayName = 'Saturday';
				break;
			case 6 :
				$scope.events[i].dayName = 'Sunday';
				break;
			default:
				break;			
		}
	}
});