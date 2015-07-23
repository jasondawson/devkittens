angular.module('devKittens')

.directive('timeline', function () {
	return {
		restrict: 'E',
		scope: {
			events: '='
		},
		templateUrl: '/public/templates/timeline.html',
		link: function (scope, elem, attrs) {
			console.log(scope.events);
		}
	}
})