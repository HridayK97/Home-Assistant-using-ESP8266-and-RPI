angular.module('MainService', ['ngCookies']).factory('MainService', ['$http','$cookies', function($http,$cookies) {


	var switchled = function(){
		

		console.log("HIII");

		return $http({
		      method: 'GET',
		      url: '/api/switchled/'
		   }).then(function (response){
		   		var res = response;
		   		console.log(res);
				return response;

		   },function (error){
		   	console.log('can not get data.');
		   		return;

		   });
	}


	var gettemp = function(){
		

		console.log("HIII");

		return $http({
		      method: 'GET',
		      url: '/api/gettemp/'
		   }).then(function (response){
		   		var res = response;
		   		console.log(res);
				return response;

		   },function (error){
		   	console.log('can not get data.');
		   		return;

		   });
	}



	return {
    switchled:switchled,
    gettemp:gettemp
    };


}]);