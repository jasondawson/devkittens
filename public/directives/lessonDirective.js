angular.module('devKittens')

.directive('lesson', function () {
	return {
		restrict: 'E',
		templateUrl: '/public/templates/lesson.html',
		controller: function($scope, lessonService, courseServices, $route){
			$scope.show = false;
			$scope.topic ='';
			$scope.item ='';
			$scope.activeDay;
		},
		link: function (scope, elem, attrs) {
			//MODAL UX/UI --> move to directive?
			scope.showModal = function (event) {
				// $('body').css('overflow', 'hidden');

				scope.currentEvent = event;
				scope.show = !scope.show;
			}

			scope.closeModal = function (skip) {
				if (skip) return close();

				if(scope.topic || scope.sections.length){
					confirm('Closing without saving your lesson will delete your data.  Are you sure you want to exit without saving?')
					close();
				} else {
					close();
				}

				function close () {
					$('body').css('overflow', 'auto');
					scope.show = !scope.show;

					// Clear the data
					scope.sections = [];
					scope.newSection = {};
					scope.topic = '';
				}
			}
		}
	}
});