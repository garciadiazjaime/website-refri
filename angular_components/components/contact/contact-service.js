angular.module('mint.app.ContactService', [])
	.service('MessageService', ['$log', '$http', '$q', 'emailConfig', function($log, $http, $q, emailConfig) {
		return ({
			sendMessage: sendMessage
		});

		/**
		 * Helper function to call API
		 * @param {object} contact
		 * @return {promise} defer.promise
		 */
		function sendMessage(contact) {
			var defer = $q.defer(),
				url = emailConfig.messageAPI,
				email_to = emailConfig.defaultEmail,
				data = {
					'data': {
						'contact': contact,
						'website': {
							'id': emailConfig.website.id,
							'name': emailConfig.website.name,
						},
						'email_to': email_to,
						'email_from': contact.email || email_to
					}
				};
			$http({
				method: 'POST',
				url: url + 'message',
				data: data
			}).then(function(data, status, headers, config) {
				defer.resolve();
			}, function(data, status, headers, config) {
				defer.reject();
			});
			return defer.promise;
		}
	}]);