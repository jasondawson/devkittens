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
		      	// console.warn('update ui ', ui);
		      	// var days = elem.find('.day');
		      	// var days = Array.prototype.slice.call(days);

		      	// var udpatedPositions = days.map(function (day) {
		      	// 	return day.id.substring(3);
		      	// })

		      	// var location = $location.$$url.split('/')[1];

		      	// cohortServices.updateCoursesOrder(udpatedPositions, infoStorage.serveCalendarId(), location)
		      	// .then(function (response) {
		      	// 	// console.info(response);
		      	// })
		      	// .catch(function (err) {
		      	// 	console.error(err);
		      	// });
		      }
		    });
		 
		    $( ".portlet" )
			  .addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" )
			  .find( ".portlet-header" )
			  .addClass( "ui-widget-header ui-corner-all" )
			  .prepend( "<span class='ui-icon ui-icon-minusthick portlet-toggle'></span>");
		 
		    $( ".portlet-toggle" ).click(function() {
		      var icon = $( this );
		      icon.toggleClass( "ui-icon-minusthick ui-icon-plusthick" );
		      icon.closest( ".portlet" ).find( ".portlet-content" ).toggle();
		    });


		}
	}
})