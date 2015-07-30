angular.module('devKittens')

.controller('DayController', function ($scope, dayId, typeRef, typeId, user, activeLesson, infoStorage, lessonService, courseServices, cohortServices) {
	$scope.user = user;
	
	if (typeRef == 'cohort') {
		$scope.lesson = activeLesson.lesson;
		$scope.day = activeLesson;
	} else if (typeRef == 'course') {
		$scope.lesson = activeLesson;
		$scope.day = null;
	}

//TYPEREF REFERS TO COURSE OR COHORT

	$scope.cohortId = typeId;
	$scope.courseId = typeId;

	$scope.dayId = dayId;
	$scope.typeRef = typeRef;



	// ------------ CREATING NEW LESSON -------------------------
	// ADD TITLE/TOPIC
	$scope.setTopic = function(topic){
		$scope.topic = topic;
	}


	// SECTION SPECIFIC
	$scope.sections = [];
	$scope.addSection = function(section){
		$scope.sections.push(section)
		$scope.newSection = {};
	}


	$scope.addContent = function(i, item){
		$scope.sections[i].content.push(item)
		$scope.item = '';
		item = ''
	}


	// STORE LESSON
	$scope.createLesson = function(topic) {
		data = {
			topic: topic,
			sections: $scope.sections
		}

		lessonService.createLesson(data)
		.then(function (response){

			var curriculumRef = infoStorage.serveLessonRef()._id;
			courseServices.updateCourseCurriculum(curriculumRef, response.data._id, topic)
			.then(function(response){
				console.log(response)
			})
			.catch(function (err) {
				console.error(err);
			});

			// Clear values
			// $scope.closeModal('skip');

			$scope.preReadings = [];
			$scope.objectives = [];
			$scope.miniProjects = [];
			$scope.projects = [];
			$scope.readings = [];
		})
		.catch(function (err) {
			throw new Error(err);
		});
	}

	// --------------- UPDATING LESSON ------------
	if ($scope.typeRef == 'course') {

		$scope.updateLesson = function(){
			var lessonId = $scope.lesson._id;
			var topic = $scope.lesson.topic;
			var sections = $scope.lesson.sections
			lessonService.updateLesson($scope.dayId, $scope.courseId, lessonId, topic, sections)
			.then(function(response){
				$scope.lesson.edit = !$scope.lesson.edit;
			})
		}

		//////////////////////////////////////////////////
		//////////////////////////////////////////////////
		//////////////////////////////////////////////////
		// MAJOR TODO: REPLACE EVENT FOR THE RIGHT THING//
		//////////////////////////////////////////////////
		//////////////////////////////////////////////////
		//////////////////////////////////////////////////


		// $scope.updateLessonSection = function(id, title, content){
		// $scope.updateLessonSection = function(section){
		// 	console.log(section);
		// 	var id = section._id
		// 	var data = {
		// 		'sections.$.title' : section.title,
		// 		'sections.$.content': section.content
		// 	}
		// 	lessonService.updateLessonSection(id, data).then(function(response){
		// 		section.editSection = !section.editSection;
		// 	})
		// }

		$scope.addLessonSection = function(section){
			var id = $scope.lesson._id;
			section.show = !section.show
			lessonService.addLessonSection(id, section).then(function(response){
				$scope.lesson.sections.push(response.data.sections[response.data.sections.length - 1]);
				section.title = '';
				section.content = '';
			})
		}

		$scope.removeLessonSection = function(index, section){
			$scope.sections = $scope.lesson.sections;
			var id = section._id;
			lessonService.removeLessonSection(id).then(function(response){
				$scope.sections.splice(index, 1);
			})
		}
	} else if ($scope.typeRef === 'cohort') {
		// CRUDY COHORT
		$scope.updateLesson = function(){
			// var lessonId = $scope.lesson._id;
			var topic = $scope.lesson.topic;
			var sections = $scope.lesson.sections
			cohortServices.updateLesson($scope.cohortId, $scope.dayId, topic, sections)
			.then(function(response){
				$scope.lesson.edit = !$scope.lesson.edit;
				console.log('im a cohort');
			})
		}


		$scope.addLessonSection = function(section){
			section.show = !section.show
			cohortServices.addLessonSection($scope.cohortId, $scope.dayId, section).then(function(response){
				// $scope.lesson.sections.push(response.data.sections[response.data.sections.length - 1]);
				console.log('look at me', response.data.lesson)
				$scope.lesson.sections.push(response.data.lesson.sections[response.data.lesson.sections.length - 1]);
				
				section.title = '';
				section.content = '';
			})
		}

		$scope.removeLessonSection = function(index, section){
			$scope.sections = $scope.lesson.sections;
			var sectionId = section._id;
			cohortServices.removeLessonSection($scope.cohortId, $scope.dayId, sectionId).then(function(response){
				$scope.sections.splice(index, 1);
			})
		}
	}

	//the stuff about instructors teaching classes, etc.

	$scope.teachLesson = function(lesson) {
		cohortServices.addInstructor(user, typeId, lesson, dayId)
		.then(function(response) {
			$scope.day.instructor = true;
		})
	}

	$scope.removeLesson = function(lesson) {
		cohortServices.removeInstructor(user, lesson, dayId)
		.then(function(response) {
			$scope.day.instructor = false;
		})
	}
});