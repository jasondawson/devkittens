angular.module('devKittens')

.directive('sortable', function (cohortServices, infoStorage, $location) {
	return {
		restrict: 'E',
		link: function (scope, elem, attrs) {

		    $( ".column" ).sortable({
		      connectWith: ".column",
		      handle: ".portlet-header",
		      placeholder: "portlet-placeholder ui-corner-all",
		      activate: function (event, ui) {
		      	$(ui.item).addClass('active-dragging');
		      },
		      deactivate: function (event, ui) {
		      	$(ui.item).removeClass('active-dragging');
		      },
		      update: function (event, ui) {

		      	var days = $('.column').find('.calendar-container');
		      	days = Array.prototype.slice.call(days);

		      	var udpatedPositions = days.map(function (day) {
		      		return day.id.substring(3);
		      	})

		      	var location = $location.$$url.split('/')[1];

		      	var calendarGroups = [];
		      	scope.currentCourse.curriculum.forEach(function (group) {
		      		var tempArray = [];
		      		group.forEach(function (day) {
		      			tempArray.push(day._id);
		      		})
		      		calendarGroups.push(tempArray)
		      	})

		      	calendarGroups[scope.currentSegment] = udpatedPositions;
		      	calendarGroups = calendarGroups.toString().split(",");

		      	cohortServices.updateCoursesOrder(calendarGroups, infoStorage.serveCalendarId(), location)
		      	.then(function (response) {
		      		// console.info(response);
		      	})
		      	.catch(function (err) {
		      		console.error(err);
		      	});
		      }
		    });

		}
	}
})