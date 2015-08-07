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
		// scope: {
		// 	events: '='
		// },
		templateUrl: '/public/templates/timeline.html',
		controller: function($scope, $sce){
			
		}
	}
})


.directive('hideMessage', function ($timeout) {
	return {
		restrict: 'A',
		link: function(scope, elem, attrs){
			scope.informSuccess = function () {
				scope.displayMessage = true;
				$timeout(function () {
					scope.displayMessage = false;
				}, 5000)
			}
		}
	}
})


.directive('tioTooltip', function ($timeout) {
	return {
		restrict:'A',
		link: function (scope, element, attrs) {
			$timeout(function(){

				var toolTp = element.find('.tooltip-wrapper');
				var givenTitle = attrs.titletext;

				element.find('.tooltip').text(givenTitle);
				
				element.on('mouseenter', function() {
			    	// element.addClass(scope.hoverClass);
			    	toolTp.css('visibility', 'visible');
				});
				element.on('mouseleave', function() {
				    // element.removeClass(scope.hoverClass);
				    toolTp.css('visibility', 'hidden');
				});
			}, 0);
		}
	};
})


.directive('displayMessage', function ($timeout) {
	return {
		restrict: 'E',
		transclude: false,
		templateUrl: '/public/templates/messages.html',
		controller: function ($scope) {
			
			$scope.closeAlertDisplay = function () {
				$scope.displayAlert = false;
				$scope.displaySuccess = false;
			}

		},
		link: function (scope, elem, attrs) {
			scope.$watch('displayAlert', function (newVal, oldVal) {
				if (newVal === true) {
					$timeout(function () {
						scope.displayAlert = false;
						scope.messageText = '';
					}, 3500);
				}
			})

			scope.$watch('displaySuccess', function (newVal, oldVal) {
				if (newVal === true) {
					$timeout(function () {
						scope.displaySuccess = false;
						scope.messageText = '';
					}, 3500);
				}
			})
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

