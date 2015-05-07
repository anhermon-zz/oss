(function(angular) {
	'use strict';
	// /////////////// AngularJS ///////////////////
	angular.module('dataService',[])
	.factory('dataService', dataService)
	.config(['$httpProvider', httpProviderConfig]);
	
	dataService.$inject = ['$httpProvider','$http','$q'];
	

	// ////////////// JavaScript //////////////////
	function dataService($http,$q) {
		
		var self = this;
		return {
		    register   : register,
		    getCrsf    : getCrsf,
		    test       : test
		};
		
		//////

		
		function register(user){
			var promise = $http({
				method: "post",
				url:    "auth/register",
				data:   user
			});
			return promise;
		};
		
		function getCrsf(){
			var token = $("meta[name='_csrf']").attr("content");
			var header = $("meta[name='_csrf_header']").attr("content");
			return {
				token,
				header			
			}
		};
		
		
		function test(){
			var promise = $http({
				method: "post",
				url:    "/",
			});
			return promise;
		};
	}
	//set CRSF headers
//	function httpProviderConfig($httpProvider){
//			var ds =  new dataService;
//			var crsf = ds.getCrsf();
//			$httpProvider.defaults.headers.post[crsf.header] = crsf.token;
//			$httpProvider.defaults.headers.put[crsf.header] = crsf.token;
//			$httpProvider.defaults.headers.common[crsf.header] = crsf.token;
//	};

})(angular);
