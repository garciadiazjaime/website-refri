var mintApp = angular.module('mint.app', [
		'ui.router',
		'ui.bootstrap',
		'ui.select',
		'mint.app.Routes',
		'mint.app.Generic',
		'mint.app.Contact',
		'mint.app.Constants',
		'mint.app.AutoScroll'
	])
	.config(['$locationProvider', '$interpolateProvider',
		function($locationProvider, $interpolateProvider) {
			$locationProvider.html5Mode({
				enabled: true,
				requireBase: false
			});
			$interpolateProvider.startSymbol('[[').endSymbol(']]');
		}
	])
	.run(['$state',
		function($state) {
			$state.go('app.home');
		}
	]);