angular.module('devKittens')

.filter('unsafe', function($sce) { 
	return $sce.trustAsHtml; 
});