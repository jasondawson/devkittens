angular.module('devKittens')

.controller('DayController', function ($scope, dayId, typeRef, typeId, user, activeLesson, infoStorage, lessonService, courseServices, cohortServices) {
	$scope.user = user;
	$scope.lesson = activeLesson;

//TYPEREF REFERS TO COURSE OR COHORT

	$scope.cohortId = typeId;
	$scope.courseId = typeId;

	$scope.dayId = dayId;
	$scope.typeRef = typeRef;


	

	console.log(111111, $scope.lesson);



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
	}

	//the stuff about instructors teaching classes, etc.

	$scope.teachLesson = function(lesson) {
		console.log(user, lesson);
		lesson.instructor = [];
		lesson.instructor.push(user._id);
		cohortServices.addInstructor(user, typeId, lesson, dayId)
		.then(function(response) {
			console.log(response);
		})
	}
});