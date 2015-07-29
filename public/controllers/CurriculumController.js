angular.module('devKittens')


.controller('CurriculumController', function ($scope, lessonService, courseServices, infoStorage, user, curriculumId, courseRef) {

	// TODO: make this a directive
	document.body.scrollTop = document.documentElement.scrollTop = 0;
	$scope.user = user;
	
	$scope.curriculumId = curriculumId;
	

	$scope.courseRef = courseRef;
	console.log($scope.courseRef)

	for(var i = 0; i < $scope.courseRef.curriculum.length; i++) {
		if ($scope.courseRef.curriculum[i]._id === $scope.curriculumId && $scope.courseRef.curriculum[i].lesson){
			$scope.lesson = $scope.courseRef.curriculum[i].lesson
		} else {
			$scope.lesson = null;
		}
		console.log(222222, $scope.lesson)
	}

	
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
		.then(function(response){


		courseServices.updateCourseCurriculum($scope.curriculumId, response.data._id, topic)
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

	$scope.updateLessonTopic = function(event){
		var id = event.lesson._id;
		var topic = event.lesson.topic;
		lessonService.updateLessonTopic(id, topic, event.day)
		.then(function(response){
			event.lesson.editTopic = !event.lesson.editTopic;
		})
	}

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
			console.log('response', response.data.sections[response.data.sections.length -1])
			lesson.sections.push(response.data.sections[response.data.sections.length - 1]);
			console.log(lesson.sections)
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