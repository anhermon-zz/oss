(function(angular) {
	"use strict";
	/***************************************************************************
	 * Angular code
	 **************************************************************************/
	angular.module('ossApp', [
        'utilities',
	    'dataService',
	    'ngAnimate',
	    'ossControllers',
	    'fileread',
		'ui.router'])
	/***************************************************************************
	 * Routing
	 **************************************************************************/
	.config(stateConfig)
	.filter('isEmpty', function () {
        var bar;
        return function (obj) {
            for (bar in obj) {
                if (obj.hasOwnProperty(bar)) {
                    return false;
                }
            }
            return true;
        }});
	
        /////

        function stateConfig($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');
		
		$stateProvider
			.state('profile', {
				url         : 'profile',
				templateUrl : 'user/user-profile',
				controller  : 'ProfileCtrl as pc'
			})
			.state('registration', {
				url         : 'register',
				templateUrl : 'auth/register',
				controller  : 'RegistrationCtrl as rc'
			});
		};
		
})(angular); 
