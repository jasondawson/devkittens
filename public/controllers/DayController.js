angular.module('devKittens')

.controller('DayController', function ($scope, curriculumId, user, activeLesson, infoStorage, lessonService, courseServices) {
	$scope.user = user;
	$scope.lesson = activeLesson;
	$scope.curriculumId = curriculumId;



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
				// $scope.events = response.data.curriculum;
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

	$scope.updateLesson = function(){
		var lessonId = $scope.lesson._id;
		var topic = $scope.lesson.topic;
		var sections = $scope.lesson.sections
		lessonService.updateLesson(curriculumId, lessonId, topic, sections)
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
	$scope.updateLessonSection = function(section){
		console.log(section);
		var id = section._id
		var data = {
			'sections.$.title' : section.title,
			'sections.$.content': section.content
		}
		lessonService.updateLessonSection(id, data).then(function(response){
			section.editSection = !section.editSection;
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
});