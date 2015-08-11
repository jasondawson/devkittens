angular.module('devKittens')

.directive('highlight', function() {
	return {
		restrict: 'EA',
		scope: {
			day: '='
		},
		link: function(scope, elem, attrs) {
			var today = new Date();
			today = today.setHours(0, 0, 0, 0);
			
			if(today === Date.parse(scope.day.day)) {
				elem.addClass('current-day');
			}

		}
	}
})