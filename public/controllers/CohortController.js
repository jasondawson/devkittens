angular.module('devKittens')

.controller('CohortController', 
	function ($scope, user, $location, infoStorage, cohortServices, currentCohortData, emailsService, dayOfWeek) {

	// Init
	$scope.user = user;
	$scope.currentCohort = currentCohortData;
	$scope.dayOfWeek = dayOfWeek;
	$scope.arrayLength = $scope.currentCohort.curriculum[$scope.currentCohort.curriculum.length - 1]

	$scope.segmentLength = $scope.currentCohort.curriculum.length;
	$scope.currentSegment = 0;
	$scope.activeMonth = $scope.currentCohort.curriculum[0];
	$scope.studentDisplay = false;
	$scope.isCohort = true;
	

	$scope.viewDay = function(day, index) {
		// var currentCohort = infoStorage.getCurrentCohort()
		infoStorage.storeDayIndex(index);
		$location.path('/day/cohort/' + $scope.currentCohort._id + '/' + day._id);
	}

	$scope.previousMonth = function() {
		if($scope.currentSegment === 0) {
			$('.fa-chevron-left').css('color', '#DFDFDF')
			return;
		}

		$scope.currentSegment--;

		$('.fa-chevron-left').css('color', '#000');
		$('.fa-chevron-right').css('color', '#000');

		$scope.activeMonth = $scope.currentCohort.curriculum[$scope.currentSegment];
	}

	$scope.nextMonth = function() {
		if($scope.currentSegment === $scope.segmentLength - 1){
			return;
		}

		$scope.currentSegment++;

		$('.fa-chevron-right').css('color', '#000');
		$('.fa-chevron-left').css('color', '#000');

		$scope.activeMonth = $scope.currentCohort.curriculum[$scope.currentSegment];

		if($scope.currentSegment === $scope.segmentLength - 1){
			$('.fa-chevron-right').css('color', '#DFDFDF')
			return;
		}

	}


	$scope.toggleStudentView = function () {
		$scope.settingsView = false;
		$scope.studentDisplay = !$scope.studentDisplay;
	}

	$scope.toggleSettingsView = function () {
		$scope.settingsView = !$scope.settingsView;
		
		if ($scope.settingsView === false) {
			$('body').css('overflow', 'auto');
		} else {
			$('body').css('overflow', 'hidden');
		}

		$scope.studentDisplay = false;
	}



})