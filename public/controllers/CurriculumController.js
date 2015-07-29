angular.module('devKittens')

.controller('CurriculumController',
function ($scope, lessonService, courseServices, infoStorage, user, curriculumId, courseRef) {
	$scope.user = user;
	
	$scope.curriculumId = curriculumId;
	$scope.courseRef = courseRef;

	// TODO: WTF IS THIS DOING??
	var randomFun = function () {
		for(var i = 0; i < $scope.courseRef.curriculum.length; i++) {
			if ($scope.courseRef.curriculum[i]._id === $scope.curriculumId && $scope.courseRef.curriculum[i].lesson){
				$scope.lesson = $scope.courseRef.curriculum[i].lesson
			} else {
				$scope.lesson = null;
			}
		}
	}
	if (courseRef) randomFun();

});