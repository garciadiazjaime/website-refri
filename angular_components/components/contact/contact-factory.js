angular.module('mint.app.ContactFactory', [])
	.factory('ContactValidate', ['$log', function($log) {
		return function() {
			return {
				'name': {
					'min': 3,
					'required': true,
					'max': 120
				},
				'email': {
					'min': 3,
					'required': true,
					'max': 120,
					'pattern': '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$'
				},
				'tel': {
					'min': 7,
					'required': true,
					'max': 20
				},
				'message': {
					'min': 5,
					'required': true,
					'max': 500
				}
			};
		};
	}]);