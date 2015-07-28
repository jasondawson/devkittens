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

					courseServices.updateCourseCurriculum($scope.currentEvent, response.data._id)
					.then(function(response){
						$scope.events = response.data.curriculum;
						console.log(response)
					})


					// Clear values
					$scope.closeModal('skip');

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

			$scope.updateLessonTopic = function(lesson){
				var id = lesson._id;
				var topic = lesson.topic
				lessonService.updateLessonTopic(id, topic).then(function(response){
					lesson.editTopic = !lesson.editTopic
				})
			}

			// $scope.updateLessonSection = function(id, title, content){
			$scope.updateLessonSection = function(section){
				var id = section._id
				var data = {
					'sections.$.title' : section.title,
					'sections.$.content': section.content
				}
				lessonService.updateLessonSection(id, data).then(function(response){
					section.editSection = !section.editSection;
				})
			}

			$scope.addLessonSection = function(lesson, section){
				var id = lesson._id;
				section.show = !section.show
				lessonService.addLessonSection(id, section).then(function(response){
					console.log('response', response.data.sections[response.data.sections.length -1])
					lesson.sections.push(response.data.sections[response.data.sections.length - 1]);
					console.log(lesson.sections)
				})
			}

			$scope.removeLessonSection = function(index, sections, section){
				$scope.sections = sections;
				var id = section._id;
				lessonService.removeLessonSection(id).then(function(response){
					$scope.sections = sections
					$scope.sections.splice(index, 1);
				})
			}

		},
		link: function (scope, elem, attrs) {
			//MODAL UX/UI --> move to directive?
			scope.showModal = function (event) {
				// $('body').css('overflow', 'hidden');

				scope.currentEvent = event;
				console.log(4444, scope.currentEvent)
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