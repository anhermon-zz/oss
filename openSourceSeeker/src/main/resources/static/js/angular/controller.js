(function(angular) {
	// //////////// AngularJS ////////////////////
	"use strict";
	angular.module('ossControllers',[])

	.controller('slideShowCtrl', slideShowCtrl)
	.controller('articleCtrl', articleCtrl)
	
	.controller('privatePropertyCtrl', privatePropertyCtrl)
	.controller('publicPropertyCtrl', publicPropertyCtrl)
	.controller('PropertyCtrl', PropertyCtrl)
	
	.controller('langCtrl', langCtrl)
	.controller('NavigationCtrl', NavigationCtrl)
	
	.controller('ProfileCtrl', ProfileCtrl)
	.controller('RegistrationCtrl', RegistrationCtrl);
	
	ProfileCtrl.$inject = ['$scope', '$controller', 'utilities'];
	RegistrationCtrl.$inject = ['$controller', 'dataService', 'utilities'];
	
	// ///////////// JavaScript ///////////////////
	function HeaderController($scope, $location) {
		$scope.isActive = function(viewLocation) {
			return viewLocation === $location.path();
		};
	};
/***************************************************************************
* Slide show controller
**************************************************************************/
	function NavigationCtrl($scope, $http, utilities) {
		var self = this;
		this.options = [
		                {id:'home',ref:'home'},
		                {id:'articles',ref:'articles'},
		                {id:'properties',ref:'properties'},
		                {id:'moving',ref:'moving'},
		                {id:'aboutUs',ref:'aboutUs'},
		];
	}
	

/***************************************************************************
* Slide show controller
**************************************************************************/
	// slide show controller
	function slideShowCtrl($scope, $http, utilities) {
		var self = this;
		this.slides = [ {
			image : "img/a.jpg",
			description : 'a'
		}, {
			image : "img/b.jpg",
			description : 'b'
		}, {
			image : "img/c.jpg",
			description : 'c'
		}, {
			image : "img/d.jpg",
			description : 'd'
		} ];
		$scope.currentIndex = 0;

		this.setCurrentSlideIndex = function(index) {
			$scope.currentIndex = index;
		};

		this.isCurrentSlideIndex = function(index) {
			return $scope.currentIndex === index;
		};
	}
	;
	/***************************************************************************
	 * Article controller
	 **************************************************************************/
	function articleCtrl($scope, utilities) {
		var self = this;
		this.articles = [
				{
					title : "Lorem ipsum dolor sit amet",
					body : "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
					link : "#"
				},
				{
					title : "Lorem ipsum dolor sit amet",
					body : "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
					link : "#"
				},
				{
					title : "Lorem ipsum dolor sit amet",
					body : "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
					link : "#"
				} ];
		this.getArticles = function() {
			// self.articles = utilities.getArticles();
		};
	};
/*******************************************************************************
 * language controller
 ******************************************************************************/
			
	function langCtrl($scope, utilities) {
		var self = this;
		this.langs = [
		              {id:'EN',language:'English'},
		              {id:'HE',language:'עברית'},
		              {id:'RU',language:'русский'},
		              {id:'FR',language:'français'}
		              ];
		// Fetch mapping from API
		this.mapping = {
		                home      :{EN:'Home',HE:'בית'},
						articles  :{EN:'Articles',HE:'מאמרים'},
						properties:{EN:'Properties',HE:'דירות'},
						moving    :{EN:'Moving',HE:'מעבר דירה'},
						aboutUs   :{EN:'About us',HE:'עלינו'},
						admin     :{EN:'Admin',HE:'אדמין'},
						userSection:{EN:'User Section',HE:'משתמשים רשומים'}
		};
		this.convert = function(input){
		 var word = self.mapping[input];
		 var lang = self.language;		 
		 if(utilities.isNull(word) || !utilities.contains(word,lang)){
			 console.warn('Missing mapping for: ' + input + ' to: ' + lang + '!');
			 return input;
		 }else{
			 return self.mapping[input][lang];
		 }	 
		};
		
	}
		
/***************************************************************************
* Private Property Controller - Enables adding new properties
**************************************************************************/
	function privatePropertyCtrl($scope, $stateParams, $controller,  utilities) {
		angular.extend(this, $controller('publicPropertyCtrl', {$scope: $scope, $stateParams:$stateParams}))
		var self = this;
		this.newProperty = {};
		$scope.filesChanged = function(elm){
			self.newProperty.images=elm.files;
			$scope.$apply();
		}
		this.submitProperty = function(){
			self.newProperty.user = self.user;
			utilities.submitProperty(self.newProperty);
		}
		this.getUserProperties = function(){
			var out =  self.getProperties({user:$stateParams.user});
			return out.then(function(result) {
				self.properties = result;
			});
		}
		
	}
/***************************************************************************************
* Public Property Controller - read only (doesn't have property modification methods)
****************************************************************************************/
	function publicPropertyCtrl ($scope, utilities) {

	var self = this;
	this.getProperties = function(query){
		return utilities.queryProperties(query);
	 };
	}
/***************************************************************************
* Property Controller - Enables editing properties
**************************************************************************/	

	function PropertyCtrl ($scope, $controller, $stateParams, utilities) {
		angular.extend(this, $controller('publicPropertyCtrl', {$scope: $scope, $stateParams:$stateParams}))
		var self = this;
		this.getProperty = function(){
			var out =  self.getProperties({id:$stateParams.id});
			return out.then(function(result) {
				self.property = result[0];
			});
		}
		
	}
/***************************************************************************
* Profile Controller
**************************************************************************/	

	function ProfileCtrl ($scope, $controller, $stateParams, utilities) {
		var self = this;		
	}
/***************************************************************************
* Registration Controller
**************************************************************************/	

	function RegistrationCtrl ($controller, dataService, utilities) {
		var self = this;
		
		self.submit = submit;
		self.test = test;
		self.example = [
		                {
		                	user:"abc",
		                	password:"123",
		                },
		                {
		                	user:"ddd",
		                	password:"333",
		                },
		                {
		                	user:"ccc",
		                	password:"111",
		                }
		                ];
		///

		function submit(){
			if (!validate(self.user)) return;			
		};
		function validate(user){
			if(utilities.isNull(user)) return false;
			if(!utilities.fieldValidaiton(self.user.username,"username must not be null",[utilities.notNull])) return false;
			if(!utilities.fieldValidaiton(self.user.email,"email must not be null",[utilities.notNull])) return false;
			if(!utilities.fieldValidaiton(self.user.password,"password must not be null",[utilities.notNull])) return false;
			if(!utilities.fieldValidaiton(self.user.passwordRe,"please Re-enter password",[utilities.notNull])) return false;
			if(!utilities.testCondition(utilities.equals(self.user.password,self.user.passwordRe),"password","password does not match")) return false;
			if(!utilities.testCondition(utilities.minLength(self.user.password,10),"password","password must be at least 10 characters long")) return false;
			return true;
		};
		
		
		function test(){
//			console.log(dataService.getCrsf());
			self.t = dataService.getCrsf();
			console.log(self.t);
		};
		
		
		
	}	
	
})(angular);