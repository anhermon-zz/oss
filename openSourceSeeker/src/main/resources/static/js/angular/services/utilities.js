(function(angular) {

	'use strict';
	// /////////////// AngularJS ///////////////////
	angular.module('utilities',[])
	.factory('utilities', utilitiesService);
	
	utilitiesService.$inject = ['$http','$q'];
	

	// ////////////// JavaScript //////////////////
	function utilitiesService($http,$q) {
		var self = this;
		return {
		    testCondition   : testCondition,
			setSuccess      : setSuccess,
			setError        : setError,
			clone           : clone,
			contains        : contains,
			pushIfNotExists : pushIfNotExists,
			notNull         : notNull,
			isNull          : isNull,
			isNumber        : isNumber,
			fieldValidaiton : fieldValidaiton,
			equals			: equals,
			minLength		: minLength,
			maxLength		: maxLength
		};
			/**
			addUser : function(user) {
				console.log('adding user:');
				console.log(user);
				var req = $http({
					method: "post",
					url:    "api/users",
					data:   user
				});
				
				return(req.then(handleSuccess, handleError));
			},
			getProperties :function(){
				console.log('fetching properties');
				var req = $http({
					method: "get",
					url:    "api/public/properties"
				});
				return(req.then(handleSuccess, handleError));
			},
			queryProperties :function(query){
				console.log('fetching properties');
				var req = $http({
					method: "post",
					url:    "api/public/properties",
					data:   query
				});
				return(req.then(handleSuccess, handleError));
			},
			submitProperty : function(property) {
				console.log(property);	
				var req = $http({
					method: "post",
					url:    "api/private/properties",
					data:   property,
				});
				
				return(req.then(handleSuccess, handleError));
			},
		};
		function handleSuccess( response ) {
			return( response.data );
		};
		function handleError( response ) {
			if (
			    ! angular.isObject( response.data ) ||
			    ! response.data.message
			    ) {				
			    return( $q.reject( "An unknown error occurred." ) );
			
			}
			return( $q.reject( response.data.message ) );
		};
		*/
		///////////

		function testCondition(v,id,msg){
				if(v){
					this.setSuccess(id);
					return true;
				}else{
					this.setError(id,msg);
					return false;
				}
		};
		
		function setSuccess(id){
				jQuery('#' + id).parent().removeClass('has-error');
				jQuery('#' + id).parent().addClass('has-success');
		};
		
		function setError(id,msg){
			jQuery('#' + id).parent().removeClass('has-success');
			jQuery('#' + id).parent().addClass('has-error');
			alert(msg);
		};
		
		function clone(obj) {
		    if (null == obj || "object" != typeof obj) return obj;
		    var copy = obj.constructor();
		    for (var attr in obj) {
		        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
		    }
		    return copy;
		};
		
		function contains(a,element){
			if (a instanceof Array){
				for (var i = 0; i < a.length; i++) {
					if(a[i] == element)
						return true;
				}
				return false;
			}else if(a instanceof Object){
				return self.notNull(a[element]);
			}
			console.warn(a + 'is not an Array nor Object!, actual type:' + typeof(a));
		};
		
		function pushIfNotExists(a,element){
			if (a instanceof Array)
				if(!this.contains(a,element))
					a.push(element);
		};
		
		function notNull(element){
			if(element)
				return true;
			return false;
		};
		
		function isNull(element){
			if(element)
				return false;
			return true;
		};
		
		function isNumber(n) {
			  return !isNaN(parseFloat(n)) && isFinite(n);
		};
		
		function fieldValidaiton(field,message,conditions){
				for (var i = 0; i < conditions.length; i++) {
					if(!conditions[i](field)){
						alert(message);
						return false;
					}
				}
				return true;
		};
		
		function equals(a,b){
			if(this.isNull(a)) return false;
			if(this.isNull(b)) return false;
			return (new String(a).valueOf() == new String(b).valueOf());
		};
		
		function minLength(field,min){
			if(this.isNull(field)) return false;
			return new String(field).length >= min;
		};
		
		function maxLength(field,max){
			if(this.isNull(field)) return false;
			return new String(field).length <= max;
		};
		
		
		
	}

})(angular);
