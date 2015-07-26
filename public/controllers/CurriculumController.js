angular.module('devKittens')

.controller('CurriculumController', function ($scope, lessonService, courseRef, $sce, user) {
	// TODO: make this a directive
	document.body.scrollTop = document.documentElement.scrollTop = 0;
	$scope.user = user;
	$scope.events = courseRef.curriculum;
	
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
		$scope.events[i].week = ( i + 7 ) / 7;
		// if (i === 0) {
		// 	$scope.events[0].dayName = 'Monday'
		// }
		// else if ($scope.events[i-1].dayName === 'Monday'){
		// 	$scope.events[i].dayName === 'Tuesday'
		// } else if ($scope.events[i-1].dayName === 'Tuesday'){
		// 	$scope.events[i].dayName === 'Wednesday'
		// } else if ($scope.events[i-1].dayName === 'Wednesday'){
		// 	$scope.events[i].dayName === 'Thursday'
		// } else if ($scope.events[i-1].dayName === 'Thursday'){
		// 	$scope.events[i].dayName === 'Friday'
		// } else if ($scope.events[i-1].dayName === 'Friday'){
		// 	$scope.events[i].dayName === 'Saturday'
		// } else if ($scope.events[i-1].dayName === 'Saturday'){
		// 	$scope.events[i].dayName === 'Sunday'
		// } else if ($scope.events[i-1].dayName === 'Sunday'){
		// 	$scope.events[i].dayName === 'Monday'
		// }
	}
});