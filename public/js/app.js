var myApp=angular.module('sampleApp', ['ui.router','MainController','MainService','youtube-embed','ngMessages','ngCookies']);
 


myApp.config(function($stateProvider, $urlRouterProvider){
$stateProvider
		.state('main', {
            url: '/main',
            templateUrl: 'views/main.html',
            controller: "MainController"
        })
        
    $urlRouterProvider.otherwise('/main');
});

