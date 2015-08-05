angular.module('devKittens')

.factory('emailsService', function ($http, $q) {
	var service = {};


	function cleanList (list) {
		list = list.replace(/ /g,'');

		var encoded = escape(list);

		if (encoded.indexOf('%0A') > 0) {
			// sanitizing csv copy paste
			list = encoded.split('%0A');
		} else if (list.indexOf(',') > 0) {
			// sanitizing comma-separated emails
			list = list.split(',');
		}

		if (!list[list.length - 1]) list.pop();
		
		if (typeof list === 'string') list = [list];

		return parseList(list);
	}


	function parseList (list) {
		var emailArray = list.map(function (email) {
			return {
				email: email,
				type: 'to'
			}
		})

		return emailArray;
	}


	////////////////////////////////////////
	////////////////////////////////////////


	service.sendStudentInvite = function (emailString, cohort) {
		if (!emailString || !cohort.id || !cohort.name) return console.warn('Missing critical information to send email invite');
		
		var deferred = $q.defer();

		var emailList = cleanList(emailString);
		var html = '<p>You\'ve been invited to DevMoutain\'s ' + cohort.name + ' calendar!</p>'
				  + '<p><a href="http://localhost:3000/#/registration/' + cohort.id + '" target="_blank">'
				  + 'http://localhost:3000/#/registration/' + cohort.id
				  + '</a></p>';

		var email = {
			  html: html
			, subject: 'DevMoutain\'s Invitation to ' + cohort.name + ' | Course Management Software'
			, to: emailList
		}


		$http.post('/api/email', email)
		.success(function (response) {
			deferred.resolve(response);
		})
		.error(function (err) {
			deferred.reject(err);
		});


		return deferred.promise;
	}


	service.sendMentorInvite = function(emailString) {
		if(!emailString) return console.log('Missing critical information to send email invite.');

		var deferred = $q.defer();

		var emailList = cleanList(emailString);
		var html = '<p>You\'ve been invited to DevMountain\'s Mentor group!</p>'
						+ '<p><a href="http://localhost:3000/#/registration/mentor" target="_blank">'
						+ 'http://localhost:3000/#/registration/mentor'
						+ '</a></p>';

		var email = {
				html: html
			, subject: 'DevMountain\'s Invitation to Join the Mentors Group | Course Management Software'
			, to: emailList
		}

		$http.post('/api/email', email)
		.success(function(response) {
			deferred.resolve(response);
		})
		.error(function(err) {
			deferred.reject(err);
		});

		return deferred.promise;
	}


	service.sendInstuctorInvite = function (emailString, cohort) {
		if (!emailString || !cohort.id || !cohort.name) return console.warn('Missing critical information to send email invite');
		
		var deferred = $q.defer();

		var emailList = cleanList(emailString);
		var html = '<p>You\'ve been invited to be teach at DevMoutain\'s ' + cohort.name + ' cohort!</p>'
				  + '<p>Click on the following link to schedule your teaching:</p>'
				  + '<p><a href="http://localhost:3000/#/registration/instructor/"' + cohort.id + ' target="_blank">'
				  + 'http://localhost:3000/#/registration/instructor/' + cohort.id
				  + '</a></p>';

		var email = {
			  html: html
			, subject: 'DevMoutain\'s Invitation to ' + cohort.name + ' | Course Management Software'
			, to: emailList
		}


		$http.post('/api/email', email)
		.success(function (response) {
			deferred.resolve(response);
		})
		.error(function (err) {
			deferred.reject(err);
		});


		return deferred.promise;
	}


	return service;
})













