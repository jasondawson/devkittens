angular.module('devKittens', ['textAngular', 'ngRoute'])



////////////////////////////////////
///////////// WYSIWYG //////////////
////////////////////////////////////

.config(['$provide', function($provide){
	// this demonstrates how to register a new tool and add it to the default toolbar
	$provide.decorator('taOptions', ['taRegisterTool', '$delegate', '$rootScope', function (taRegisterTool, taOptions, $rootScope) {
	    // $delegate is the taOptions we are decorating
	    // here we override the default toolbars and classes specified in taOptions.
	    taOptions.toolbar = [
	        ['h3', 'p', 'pre', 'insertLink'],
	        ['bold', 'italics', 'underline', 'ul', 'ol', 'clear']
	    ];

	    taOptions.classes = {
	        focussed: 'focussed',
	        toolbar: 'btn-toolbar',
	        toolbarGroup: 'btn-group',
	        toolbarButton: 'btn btn-default',
	        toolbarButtonActive: 'active',
	        disabled: 'disabled',
	        textEditor: 'form-control',
	        htmlEditor: 'form-control'
	    };

	    return taOptions; // whatever you return will be the taOptions
	}]);
}]);