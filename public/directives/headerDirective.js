angular.module('devKittens')

.directive('headerDirective', function () {
	return {
		restrict: 'E',
		scope: true,
		templateUrl: '/public/templates/header.html'
	}
})