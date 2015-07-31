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

		      	cohortServices.updateCoursesOrder(udpatedPositions, infoStorage.serveCalendarId(), location)
		      	.then(function (response) {
		      		console.info(response);
		      	})
		      	.catch(function (err) {
		      		console.error(err);
		      	});
		      }
		    });

		}
	}
})