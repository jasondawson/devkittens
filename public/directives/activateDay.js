angular.module('devKittens')

.directive('activateDay', function () {
	return {
		restrict: 'EA',
		scope: true,
		link: function (scope, elem, attrs) {
			var expandDay = function () {
				if (elem.hasClass('active-date')) return;

				// remove all active classes
				$('.day').each(function (thing, other) {
					$(this).removeClass('active-date');
				})

				//add active class
				elem.addClass('active-date', {duration: 100});
			}

			elem.bind('click', expandDay);
		}
	}
});