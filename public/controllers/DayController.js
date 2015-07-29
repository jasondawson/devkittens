angular.module('devKittens')

.controller('DayController', function ($scope, curriculumId, activeLesson, infoStorage, lessonService, courseServices) {
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

	$scope.updateLessonTopic = function(){
		var lessonId = $scope.lesson._id;
		var topic = $scope.lesson.topic;
		lessonService.updateLessonTopic(curriculumId, lessonId, topic)
		.then(function(response){
			console.log(response);
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
	$scope.updateLessonSection = function(event, section){
		var event = event;
		var id = section._id
		var data = {
			'sections.$.title' : section.title,
			'sections.$.content': section.content
		}
		lessonService.updateLessonSection(id, data).then(function(response){
			section.editSection = !section.editSection;
		})
	}

	$scope.addLessonSection = function(event, section){
		var lesson = event.lesson;
		var id = lesson._id;
		section.show = !section.show
		lessonService.addLessonSection(id, section).then(function(response){
			lesson.sections.push(response.data.sections[response.data.sections.length - 1]);
		})
	}

	$scope.removeLessonSection = function(index, event, section){
		$scope.sections = event.lesson.sections;
		var id = section._id;
		lessonService.removeLessonSection(id).then(function(response){
			// $scope.sections = event.lesson.sections
			$scope.sections.splice(index, 1);
		})
	}
});