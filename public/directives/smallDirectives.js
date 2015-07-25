angular.module('devKittens')

.directive('focusHere', function () {
	return {
		restrict: 'A',
		link: function (scope, elem, attrs) {
			elem.focus();
		}
	}
})

.directive('loadingGif', function () {
	return {
		restrict: 'E',
		templateUrl: '/public/templates/loadingGif.html'
	}
})


.directive('timeline', function () {
	return {
		restrict: 'E',
		scope: {
			events: '='
		},
		templateUrl: '/public/templates/timeline.html',
		controller: function($scope, $sce){
			
		}
	}
})


.directive('makeActive', function () {
	return {
		restrict: 'A',
		link: function(scope, elem, attrs) {

			var expandSection = function() {
				// if(elem.hasClass('active-mentor')) return;

				$('.mini-modal-day').each(function(thing, other) {
					$(this).removeClass('active-mentor');
				})

				if(elem.height() < 60) {				
					elem.addClass('active-mentor');
				} else {
					elem.addClass('active-mentor', {duration: 100});
				}
			}

			elem.bind('click', expandSection);

		}
	}
});

