angular.module('mint.app.GenericController', [])
	.controller('GenericController', ['$scope', '$log', function($scope, $log) {

		var init = function() {
			$log.info('GenericController');
		};

		init();
	}]);