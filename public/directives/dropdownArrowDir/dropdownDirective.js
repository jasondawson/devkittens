angular.module('devKittens')

.directive('dropdownDirective', function() {
	return {
		restrict: 'EA',
		templateUrl: './public/directives/dropdownArrowDir/dropdown.html',
		// link: function(scope, elem, attrs) {
		// 	$('.dropdown-arrow').click(function() {
		// 		$(this).toggle('item');
		// 	})
		// }
	}
});