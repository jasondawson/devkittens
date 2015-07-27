angular.module('devKittens')

.directive('subscribeModal', function() {

	return {
		restrict: 'EA',
		templateUrl: './public/templates/subscribeModal.html',
		scope: {
			toggleSubscribeCohortModal: '&',
			toggleSubscribeCohort: '='
		}
	}

});