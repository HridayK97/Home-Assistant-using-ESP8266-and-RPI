angular.module('MainController', ['MainService']).controller('MainController', function($scope,$state,MainService) {



$scope.ledon=true;


$scope.switch = function(){
	MainService.switchled();
	$scope.ledon=!$scope.ledon;
}


$scope.tempdata={};

$scope.gettemp = function(){
	var promise= MainService.gettemp();

	promise.then(
      function(payload) {
        if(payload.data==null)
        {
        }
        else
        {
        	console.log(payload.data);
        	$scope.tempdata.t=payload.data.t;
        	$scope.tempdata.h=payload.data.h;
        	console.log($scope.tempdata);
        }


    },
      function(error){
        console.log("error");
    });
	console.log($scope.tempdata);
}

$scope.gettemp();


});