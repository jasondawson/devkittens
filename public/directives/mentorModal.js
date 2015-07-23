angular.module('devKittens')

.directive('mentorModal', function() {

	return {
		restrict: 'EA',
		templateUrl: '../templates/mentorModal.html',
		scope: {
			setMentor: '&',
			currentMentor: '='
		},
		controller: function($scope) {

			
		}
	}

})