angular.module('devKittens')

.directive('activateDay', function () {
	return {
		restrict: 'EA',
		scope: true,
		link: function (scope, elem, attrs) {
			var expandDay = function () {
				if (elem.hasClass('active-date')) return collapseDay();

				// remove all active classes
				$('.day').each(function (thing, other) {
					$(this).removeClass('active-date');
				})

				
				// scroll to active day
				var activeId = '#' + attrs.id;
				$('html, body').animate({scrollTop:$(activeId).position().top +120}, 350);

				//add active class
				if (elem.height < 60) {
					elem.addClass('active-date');	
				} else {
					elem.addClass('active-date', {duration: 100});	
				}
				
			}

			var collapseDay = function () {
				// remove all active classes
				$('.day').each(function (thing, other) {
					if ($(this).height() < 60) {
						$(this).removeClass('active-date');
					} else {
						$(this).removeClass('active-date', {duration: 100});
					}
				})
			}

			elem.bind('click', expandDay);
		}
	}
});