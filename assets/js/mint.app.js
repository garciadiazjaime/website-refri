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
angular.module('mint.app.Constants', [])
	.constant('emailConfig', {
		// 'messageAPI': 'http://127.0.0.1:5000/',
		'messageAPI': 'http://api.mintitmedia.com/',
		'defaultEmail': 'info@refritectijuana.com',
		'website': {
			'id': 3,
			'name': 'refritec'
		}
	});
angular.module('mint.app.Routes', [])
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        function($stateProvider,
            $urlRouterProvider) {

            $stateProvider
                .state('app', {
                    url: '/',
                    abstract: true,
                    views: {
                        'header-view': {
                            templateUrl: '/partial/layout/header'
                        },
                        'main-view': {
                            templateUrl: '/partial/layout/main'
                        },
                        'footer-view': {
                            templateUrl: '/partial/layout/footer'
                        }
                    }
                })
                .state('app.home', {
                    url: '',
                    views: {
                        'content-view@app': {
                            controller: 'ContactController',
                            templateUrl: '/partial/section/single_page'
                        }
                    }
                })
                .state('app.solutions', {
                    url: 'soluciones',
                    views: {
                        'content-view@app': {
                            controller: 'ContactController',
                            templateUrl: '/partial/section/single_page'
                        }
                    }
                })
                .state('app.solutions.industry', {
                    url: '/industrial',
                    views: {
                        'content-view@app': {
                            controller: 'ContactController',
                            templateUrl: '/partial/section/single_page'
                        }
                    }
                })
                .state('app.solutions.installation', {
                    url: '/instalacion',
                    views: {
                        'content-view@app': {
                            controller: 'ContactController',
                            templateUrl: '/partial/section/single_page'
                        }
                    }
                })
                .state('app.solutions.maintenance', {
                    url: '/mantenimiento',
                    views: {
                        'content-view@app': {
                            controller: 'ContactController',
                            templateUrl: '/partial/section/single_page'
                        }
                    }
                })
                .state('app.products', {
                    url: 'productos',
                    views: {
                        'content-view@app': {
                            controller: 'ContactController',
                            templateUrl: '/partial/section/single_page'
                        }
                    }
                })
                .state('app.distibution', {
                    url: 'distribucion',
                    views: {
                        'content-view@app': {
                            controller: 'ContactController',
                            templateUrl: '/partial/section/single_page'
                        }
                    }
                })
                .state('app.aboutus', {
                    url: 'nosotros',
                    views: {
                        'content-view@app': {
                            controller: 'ContactController',
                            templateUrl: '/partial/section/single_page'
                        }
                    }
                })
                .state('app.contact', {
                    url: 'contacto',
                    views: {
                        'content-view@app': {
                            controller: 'ContactController',
                            templateUrl: '/partial/section/single_page'
                        }
                    }
                });

            $urlRouterProvider.when('', '/');
            $urlRouterProvider.otherwise('/');
        }
    ]);

angular.module('mint.app.AutoScrollService', [])
    .service('anchorSmoothScroll', ['$log', function($log) {
        this.scrollTo = function(eID, offset) {

            // This scrolling function 
            // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript
            var i;
            var startY = currentYPosition();
            var stopY = elmYPosition(eID, offset || 0);
            var distance = stopY > startY ? stopY - startY : startY - stopY;
            if (distance < 100) {
                scrollTo(0, stopY);
                return;
            }
            var speed = Math.round(distance / 100);
            if (speed >= 20) speed = 20;
            var step = Math.round(distance / 25);
            var leapY = stopY > startY ? startY + step : startY - step;
            var timer = 0;
            if (stopY > startY) {
                for (i = startY; i < stopY; i += step) {
                    setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
                    leapY += step;
                    if (leapY > stopY) leapY = stopY;
                    timer++;
                }
                return;
            }
            for (i = startY; i > stopY; i -= step) {
                setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
                leapY -= step;
                if (leapY < stopY) leapY = stopY;
                timer++;
            }

            function currentYPosition() {
                // Firefox, Chrome, Opera, Safari
                if (self.pageYOffset) return self.pageYOffset;
                // Internet Explorer 6 - standards mode
                if (document.documentElement && document.documentElement.scrollTop)
                    return document.documentElement.scrollTop;
                // Internet Explorer 6, 7 and 8
                if (document.body.scrollTop) return document.body.scrollTop;
                return 0;
            }

            function elmYPosition(eID) {
                var elm = document.getElementById(eID);
                var y = elm.offsetTop + offset;
                var node = elm;
                while (node.offsetParent && node.offsetParent != document.body) {
                    node = node.offsetParent;
                    y += node.offsetTop;
                }
                return y;
            }
        };

    }]);

angular.module("mint.app.AutoScroll", [
	'mint.app.AutoScrollService'
	]);
angular.module('mint.app.ContactController', [])
    .controller('ContactController', ['$log', '$scope', 'ContactValidate', 'MessageService', 'anchorSmoothScroll', function($log, $scope, ContactValidate, MessageService, anchorSmoothScroll) {
        $log.info('ContactController');

        var autoScrollRel = {
            'soluciones': {
                'element_id': 'soluciones',
                'offset': -100
            },
            'soluciones/industrial': {
                'element_id': 'tipo-clientes',
                'offset': -100
            },
            'soluciones/instalacion': {
                'element_id': 'instalacion',
                'offset': -100
            },
            'soluciones/mantenimiento': {
                'element_id': 'mantenimiento',
                'offset': -100
            },
            'productos': {
                'element_id': 'catalogo',
                'offset': -280
            },
            'distribucion': {
                'element_id': 'productos',
                'offset': -100
            },
            'nosotros': {
                'element_id': 'nosotros',
                'offset': -100
            },
            'contacto': {
                'element_id': 'contacto',
                'offset': -100
            },
            'default': {
                'element_id': 'header',
                'offset': 0
            }
        };

        $scope.$on('$viewContentLoaded', function() {
            if (document.readyState == "complete") {
                setTimeout(function() {
                    var path = window.location.pathname != '/' ? window.location.pathname.toString().replace(/^\//, '') : 'default';
                    anchorSmoothScroll.scrollTo(autoScrollRel[path].element_id, autoScrollRel[path].offset);
                }, 100);
            }
        });

        var init = function() {

            $scope.validate = ContactValidate();
            $scope.messageState = {
                'state': 0,
                'msg': ''
            };

            /**
             * Scope function that check if form is validate, if it is then send data to Contact Provider
             * @param {object} validation (form)
             * @param {object} contact (data)
             */
            $scope.sendEmail = function(validation, contact) {
                $scope.isSending = false;
                if (validation.$valid) {
                    $scope.messageState = {
                        'state': 1,
                        'msg': 'Enviando ...'
                    };
                    MessageService.sendMessage(contact).then(function() {
                        $scope.messageState = {
                            'state': 2,
                            'msg': 'Tu mensaje ha sido enviado, gracias.'
                        };
                        $scope.contact = {};
                        validation.$setPristine();
                    }, function() {
                        $scope.messageState = {
                            'state': 3,
                            'msg': 'Lo sentimos, no se pudo enviar mensaje, intentar m\xE1s tarde.'
                        };
                    });
                } else {
                    $scope.messageState.msg = "Por favor llene los campos faltantes.";
                }
            };
        };

        init();
    }]);

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
angular.module("mint.app.Contact", [
	'mint.app.ContactController',
	'mint.app.ContactFactory',
	'mint.app.ContactService'
	]);
angular.module('mint.app.GenericController', [])
	.controller('GenericController', ['$scope', '$log', function($scope, $log) {

		var init = function() {
			$log.info('GenericController');
		};

		init();
	}]);
angular.module('mint.app.Generic', [
	'mint.app.GenericController'
	]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbnN0YW50cy5qcyIsInJvdXRlcy5qcyIsImNvbXBvbmVudHMvYXV0b3Njcm9sbC9hdXRvc2Nyb2xsLXNlcnZpY2UuanMiLCJjb21wb25lbnRzL2F1dG9zY3JvbGwvYXV0b3Njcm9sbC5qcyIsImNvbXBvbmVudHMvY29udGFjdC9jb250YWN0LWNvbnRyb2xsZXIuanMiLCJjb21wb25lbnRzL2NvbnRhY3QvY29udGFjdC1mYWN0b3J5LmpzIiwiY29tcG9uZW50cy9jb250YWN0L2NvbnRhY3Qtc2VydmljZS5qcyIsImNvbXBvbmVudHMvY29udGFjdC9jb250YWN0LmpzIiwiY29tcG9uZW50cy9nZW5lcmljL2dlbmVyaWMtY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvZ2VuZXJpYy9nZW5lcmljLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0RBO0FBQ0E7QUFDQTtBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1JBO0FBQ0E7QUFDQSIsImZpbGUiOiJtaW50LmFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBtaW50QXBwID0gYW5ndWxhci5tb2R1bGUoJ21pbnQuYXBwJywgW1xuXHRcdCd1aS5yb3V0ZXInLFxuXHRcdCd1aS5ib290c3RyYXAnLFxuXHRcdCd1aS5zZWxlY3QnLFxuXHRcdCdtaW50LmFwcC5Sb3V0ZXMnLFxuXHRcdCdtaW50LmFwcC5HZW5lcmljJyxcblx0XHQnbWludC5hcHAuQ29udGFjdCcsXG5cdFx0J21pbnQuYXBwLkNvbnN0YW50cycsXG5cdFx0J21pbnQuYXBwLkF1dG9TY3JvbGwnXG5cdF0pXG5cdC5jb25maWcoWyckbG9jYXRpb25Qcm92aWRlcicsICckaW50ZXJwb2xhdGVQcm92aWRlcicsXG5cdFx0ZnVuY3Rpb24oJGxvY2F0aW9uUHJvdmlkZXIsICRpbnRlcnBvbGF0ZVByb3ZpZGVyKSB7XG5cdFx0XHQkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUoe1xuXHRcdFx0XHRlbmFibGVkOiB0cnVlLFxuXHRcdFx0XHRyZXF1aXJlQmFzZTogZmFsc2Vcblx0XHRcdH0pO1xuXHRcdFx0JGludGVycG9sYXRlUHJvdmlkZXIuc3RhcnRTeW1ib2woJ1tbJykuZW5kU3ltYm9sKCddXScpO1xuXHRcdH1cblx0XSlcblx0LnJ1bihbJyRzdGF0ZScsXG5cdFx0ZnVuY3Rpb24oJHN0YXRlKSB7XG5cdFx0XHQkc3RhdGUuZ28oJ2FwcC5ob21lJyk7XG5cdFx0fVxuXHRdKTsiLCJhbmd1bGFyLm1vZHVsZSgnbWludC5hcHAuQ29uc3RhbnRzJywgW10pXG5cdC5jb25zdGFudCgnZW1haWxDb25maWcnLCB7XG5cdFx0Ly8gJ21lc3NhZ2VBUEknOiAnaHR0cDovLzEyNy4wLjAuMTo1MDAwLycsXG5cdFx0J21lc3NhZ2VBUEknOiAnaHR0cDovL2FwaS5taW50aXRtZWRpYS5jb20vJyxcblx0XHQnZGVmYXVsdEVtYWlsJzogJ2luZm9AcmVmcml0ZWN0aWp1YW5hLmNvbScsXG5cdFx0J3dlYnNpdGUnOiB7XG5cdFx0XHQnaWQnOiAzLFxuXHRcdFx0J25hbWUnOiAncmVmcml0ZWMnXG5cdFx0fVxuXHR9KTsiLCJhbmd1bGFyLm1vZHVsZSgnbWludC5hcHAuUm91dGVzJywgW10pXG4gICAgLmNvbmZpZyhbXG4gICAgICAgICckc3RhdGVQcm92aWRlcicsXG4gICAgICAgICckdXJsUm91dGVyUHJvdmlkZXInLFxuICAgICAgICBmdW5jdGlvbigkc3RhdGVQcm92aWRlcixcbiAgICAgICAgICAgICR1cmxSb3V0ZXJQcm92aWRlcikge1xuXG4gICAgICAgICAgICAkc3RhdGVQcm92aWRlclxuICAgICAgICAgICAgICAgIC5zdGF0ZSgnYXBwJywge1xuICAgICAgICAgICAgICAgICAgICB1cmw6ICcvJyxcbiAgICAgICAgICAgICAgICAgICAgYWJzdHJhY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnaGVhZGVyLXZpZXcnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvcGFydGlhbC9sYXlvdXQvaGVhZGVyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdtYWluLXZpZXcnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvcGFydGlhbC9sYXlvdXQvbWFpbidcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnZm9vdGVyLXZpZXcnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvcGFydGlhbC9sYXlvdXQvZm9vdGVyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuc3RhdGUoJ2FwcC5ob21lJywge1xuICAgICAgICAgICAgICAgICAgICB1cmw6ICcnLFxuICAgICAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2NvbnRlbnQtdmlld0BhcHAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0NvbnRhY3RDb250cm9sbGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9wYXJ0aWFsL3NlY3Rpb24vc2luZ2xlX3BhZ2UnXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5zdGF0ZSgnYXBwLnNvbHV0aW9ucycsIHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnc29sdWNpb25lcycsXG4gICAgICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnY29udGVudC12aWV3QGFwcCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQ29udGFjdENvbnRyb2xsZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL3BhcnRpYWwvc2VjdGlvbi9zaW5nbGVfcGFnZSdcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnN0YXRlKCdhcHAuc29sdXRpb25zLmluZHVzdHJ5Jywge1xuICAgICAgICAgICAgICAgICAgICB1cmw6ICcvaW5kdXN0cmlhbCcsXG4gICAgICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnY29udGVudC12aWV3QGFwcCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQ29udGFjdENvbnRyb2xsZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL3BhcnRpYWwvc2VjdGlvbi9zaW5nbGVfcGFnZSdcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnN0YXRlKCdhcHAuc29sdXRpb25zLmluc3RhbGxhdGlvbicsIHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnL2luc3RhbGFjaW9uJyxcbiAgICAgICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdjb250ZW50LXZpZXdAYXBwJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdDb250YWN0Q29udHJvbGxlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvcGFydGlhbC9zZWN0aW9uL3NpbmdsZV9wYWdlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuc3RhdGUoJ2FwcC5zb2x1dGlvbnMubWFpbnRlbmFuY2UnLCB7XG4gICAgICAgICAgICAgICAgICAgIHVybDogJy9tYW50ZW5pbWllbnRvJyxcbiAgICAgICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdjb250ZW50LXZpZXdAYXBwJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdDb250YWN0Q29udHJvbGxlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvcGFydGlhbC9zZWN0aW9uL3NpbmdsZV9wYWdlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuc3RhdGUoJ2FwcC5wcm9kdWN0cycsIHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAncHJvZHVjdG9zJyxcbiAgICAgICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdjb250ZW50LXZpZXdAYXBwJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdDb250YWN0Q29udHJvbGxlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvcGFydGlhbC9zZWN0aW9uL3NpbmdsZV9wYWdlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuc3RhdGUoJ2FwcC5kaXN0aWJ1dGlvbicsIHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnZGlzdHJpYnVjaW9uJyxcbiAgICAgICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdjb250ZW50LXZpZXdAYXBwJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdDb250YWN0Q29udHJvbGxlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvcGFydGlhbC9zZWN0aW9uL3NpbmdsZV9wYWdlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuc3RhdGUoJ2FwcC5hYm91dHVzJywge1xuICAgICAgICAgICAgICAgICAgICB1cmw6ICdub3NvdHJvcycsXG4gICAgICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnY29udGVudC12aWV3QGFwcCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQ29udGFjdENvbnRyb2xsZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL3BhcnRpYWwvc2VjdGlvbi9zaW5nbGVfcGFnZSdcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnN0YXRlKCdhcHAuY29udGFjdCcsIHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnY29udGFjdG8nLFxuICAgICAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2NvbnRlbnQtdmlld0BhcHAnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0NvbnRhY3RDb250cm9sbGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9wYXJ0aWFsL3NlY3Rpb24vc2luZ2xlX3BhZ2UnXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyLndoZW4oJycsICcvJyk7XG4gICAgICAgICAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJyk7XG4gICAgICAgIH1cbiAgICBdKTtcbiIsImFuZ3VsYXIubW9kdWxlKCdtaW50LmFwcC5BdXRvU2Nyb2xsU2VydmljZScsIFtdKVxuICAgIC5zZXJ2aWNlKCdhbmNob3JTbW9vdGhTY3JvbGwnLCBbJyRsb2cnLCBmdW5jdGlvbigkbG9nKSB7XG4gICAgICAgIHRoaXMuc2Nyb2xsVG8gPSBmdW5jdGlvbihlSUQsIG9mZnNldCkge1xuXG4gICAgICAgICAgICAvLyBUaGlzIHNjcm9sbGluZyBmdW5jdGlvbiBcbiAgICAgICAgICAgIC8vIGlzIGZyb20gaHR0cDovL3d3dy5pdG5ld2IuY29tL3R1dG9yaWFsL0NyZWF0aW5nLXRoZS1TbW9vdGgtU2Nyb2xsLUVmZmVjdC13aXRoLUphdmFTY3JpcHRcbiAgICAgICAgICAgIHZhciBpO1xuICAgICAgICAgICAgdmFyIHN0YXJ0WSA9IGN1cnJlbnRZUG9zaXRpb24oKTtcbiAgICAgICAgICAgIHZhciBzdG9wWSA9IGVsbVlQb3NpdGlvbihlSUQsIG9mZnNldCB8fCAwKTtcbiAgICAgICAgICAgIHZhciBkaXN0YW5jZSA9IHN0b3BZID4gc3RhcnRZID8gc3RvcFkgLSBzdGFydFkgOiBzdGFydFkgLSBzdG9wWTtcbiAgICAgICAgICAgIGlmIChkaXN0YW5jZSA8IDEwMCkge1xuICAgICAgICAgICAgICAgIHNjcm9sbFRvKDAsIHN0b3BZKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgc3BlZWQgPSBNYXRoLnJvdW5kKGRpc3RhbmNlIC8gMTAwKTtcbiAgICAgICAgICAgIGlmIChzcGVlZCA+PSAyMCkgc3BlZWQgPSAyMDtcbiAgICAgICAgICAgIHZhciBzdGVwID0gTWF0aC5yb3VuZChkaXN0YW5jZSAvIDI1KTtcbiAgICAgICAgICAgIHZhciBsZWFwWSA9IHN0b3BZID4gc3RhcnRZID8gc3RhcnRZICsgc3RlcCA6IHN0YXJ0WSAtIHN0ZXA7XG4gICAgICAgICAgICB2YXIgdGltZXIgPSAwO1xuICAgICAgICAgICAgaWYgKHN0b3BZID4gc3RhcnRZKSB7XG4gICAgICAgICAgICAgICAgZm9yIChpID0gc3RhcnRZOyBpIDwgc3RvcFk7IGkgKz0gc3RlcCkge1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KFwid2luZG93LnNjcm9sbFRvKDAsIFwiICsgbGVhcFkgKyBcIilcIiwgdGltZXIgKiBzcGVlZCk7XG4gICAgICAgICAgICAgICAgICAgIGxlYXBZICs9IHN0ZXA7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsZWFwWSA+IHN0b3BZKSBsZWFwWSA9IHN0b3BZO1xuICAgICAgICAgICAgICAgICAgICB0aW1lcisrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGkgPSBzdGFydFk7IGkgPiBzdG9wWTsgaSAtPSBzdGVwKSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChcIndpbmRvdy5zY3JvbGxUbygwLCBcIiArIGxlYXBZICsgXCIpXCIsIHRpbWVyICogc3BlZWQpO1xuICAgICAgICAgICAgICAgIGxlYXBZIC09IHN0ZXA7XG4gICAgICAgICAgICAgICAgaWYgKGxlYXBZIDwgc3RvcFkpIGxlYXBZID0gc3RvcFk7XG4gICAgICAgICAgICAgICAgdGltZXIrKztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gY3VycmVudFlQb3NpdGlvbigpIHtcbiAgICAgICAgICAgICAgICAvLyBGaXJlZm94LCBDaHJvbWUsIE9wZXJhLCBTYWZhcmlcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5wYWdlWU9mZnNldCkgcmV0dXJuIHNlbGYucGFnZVlPZmZzZXQ7XG4gICAgICAgICAgICAgICAgLy8gSW50ZXJuZXQgRXhwbG9yZXIgNiAtIHN0YW5kYXJkcyBtb2RlXG4gICAgICAgICAgICAgICAgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcbiAgICAgICAgICAgICAgICAvLyBJbnRlcm5ldCBFeHBsb3JlciA2LCA3IGFuZCA4XG4gICAgICAgICAgICAgICAgaWYgKGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wKSByZXR1cm4gZG9jdW1lbnQuYm9keS5zY3JvbGxUb3A7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGVsbVlQb3NpdGlvbihlSUQpIHtcbiAgICAgICAgICAgICAgICB2YXIgZWxtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZUlEKTtcbiAgICAgICAgICAgICAgICB2YXIgeSA9IGVsbS5vZmZzZXRUb3AgKyBvZmZzZXQ7XG4gICAgICAgICAgICAgICAgdmFyIG5vZGUgPSBlbG07XG4gICAgICAgICAgICAgICAgd2hpbGUgKG5vZGUub2Zmc2V0UGFyZW50ICYmIG5vZGUub2Zmc2V0UGFyZW50ICE9IGRvY3VtZW50LmJvZHkpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZSA9IG5vZGUub2Zmc2V0UGFyZW50O1xuICAgICAgICAgICAgICAgICAgICB5ICs9IG5vZGUub2Zmc2V0VG9wO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4geTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgIH1dKTtcbiIsImFuZ3VsYXIubW9kdWxlKFwibWludC5hcHAuQXV0b1Njcm9sbFwiLCBbXG5cdCdtaW50LmFwcC5BdXRvU2Nyb2xsU2VydmljZSdcblx0XSk7IiwiYW5ndWxhci5tb2R1bGUoJ21pbnQuYXBwLkNvbnRhY3RDb250cm9sbGVyJywgW10pXG4gICAgLmNvbnRyb2xsZXIoJ0NvbnRhY3RDb250cm9sbGVyJywgWyckbG9nJywgJyRzY29wZScsICdDb250YWN0VmFsaWRhdGUnLCAnTWVzc2FnZVNlcnZpY2UnLCAnYW5jaG9yU21vb3RoU2Nyb2xsJywgZnVuY3Rpb24oJGxvZywgJHNjb3BlLCBDb250YWN0VmFsaWRhdGUsIE1lc3NhZ2VTZXJ2aWNlLCBhbmNob3JTbW9vdGhTY3JvbGwpIHtcbiAgICAgICAgJGxvZy5pbmZvKCdDb250YWN0Q29udHJvbGxlcicpO1xuXG4gICAgICAgIHZhciBhdXRvU2Nyb2xsUmVsID0ge1xuICAgICAgICAgICAgJ3NvbHVjaW9uZXMnOiB7XG4gICAgICAgICAgICAgICAgJ2VsZW1lbnRfaWQnOiAnc29sdWNpb25lcycsXG4gICAgICAgICAgICAgICAgJ29mZnNldCc6IC0xMDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnc29sdWNpb25lcy9pbmR1c3RyaWFsJzoge1xuICAgICAgICAgICAgICAgICdlbGVtZW50X2lkJzogJ3RpcG8tY2xpZW50ZXMnLFxuICAgICAgICAgICAgICAgICdvZmZzZXQnOiAtMTAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ3NvbHVjaW9uZXMvaW5zdGFsYWNpb24nOiB7XG4gICAgICAgICAgICAgICAgJ2VsZW1lbnRfaWQnOiAnaW5zdGFsYWNpb24nLFxuICAgICAgICAgICAgICAgICdvZmZzZXQnOiAtMTAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ3NvbHVjaW9uZXMvbWFudGVuaW1pZW50byc6IHtcbiAgICAgICAgICAgICAgICAnZWxlbWVudF9pZCc6ICdtYW50ZW5pbWllbnRvJyxcbiAgICAgICAgICAgICAgICAnb2Zmc2V0JzogLTEwMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdwcm9kdWN0b3MnOiB7XG4gICAgICAgICAgICAgICAgJ2VsZW1lbnRfaWQnOiAnY2F0YWxvZ28nLFxuICAgICAgICAgICAgICAgICdvZmZzZXQnOiAtMjgwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ2Rpc3RyaWJ1Y2lvbic6IHtcbiAgICAgICAgICAgICAgICAnZWxlbWVudF9pZCc6ICdwcm9kdWN0b3MnLFxuICAgICAgICAgICAgICAgICdvZmZzZXQnOiAtMTAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ25vc290cm9zJzoge1xuICAgICAgICAgICAgICAgICdlbGVtZW50X2lkJzogJ25vc290cm9zJyxcbiAgICAgICAgICAgICAgICAnb2Zmc2V0JzogLTEwMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdjb250YWN0byc6IHtcbiAgICAgICAgICAgICAgICAnZWxlbWVudF9pZCc6ICdjb250YWN0bycsXG4gICAgICAgICAgICAgICAgJ29mZnNldCc6IC0xMDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnZGVmYXVsdCc6IHtcbiAgICAgICAgICAgICAgICAnZWxlbWVudF9pZCc6ICdoZWFkZXInLFxuICAgICAgICAgICAgICAgICdvZmZzZXQnOiAwXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLiRvbignJHZpZXdDb250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PSBcImNvbXBsZXRlXCIpIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGF0aCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSAhPSAnLycgPyB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUudG9TdHJpbmcoKS5yZXBsYWNlKC9eXFwvLywgJycpIDogJ2RlZmF1bHQnO1xuICAgICAgICAgICAgICAgICAgICBhbmNob3JTbW9vdGhTY3JvbGwuc2Nyb2xsVG8oYXV0b1Njcm9sbFJlbFtwYXRoXS5lbGVtZW50X2lkLCBhdXRvU2Nyb2xsUmVsW3BhdGhdLm9mZnNldCk7XG4gICAgICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgJHNjb3BlLnZhbGlkYXRlID0gQ29udGFjdFZhbGlkYXRlKCk7XG4gICAgICAgICAgICAkc2NvcGUubWVzc2FnZVN0YXRlID0ge1xuICAgICAgICAgICAgICAgICdzdGF0ZSc6IDAsXG4gICAgICAgICAgICAgICAgJ21zZyc6ICcnXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFNjb3BlIGZ1bmN0aW9uIHRoYXQgY2hlY2sgaWYgZm9ybSBpcyB2YWxpZGF0ZSwgaWYgaXQgaXMgdGhlbiBzZW5kIGRhdGEgdG8gQ29udGFjdCBQcm92aWRlclxuICAgICAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IHZhbGlkYXRpb24gKGZvcm0pXG4gICAgICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gY29udGFjdCAoZGF0YSlcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgJHNjb3BlLnNlbmRFbWFpbCA9IGZ1bmN0aW9uKHZhbGlkYXRpb24sIGNvbnRhY3QpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaXNTZW5kaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKHZhbGlkYXRpb24uJHZhbGlkKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5tZXNzYWdlU3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnc3RhdGUnOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ21zZyc6ICdFbnZpYW5kbyAuLi4nXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIE1lc3NhZ2VTZXJ2aWNlLnNlbmRNZXNzYWdlKGNvbnRhY3QpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUubWVzc2FnZVN0YXRlID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzdGF0ZSc6IDIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ21zZyc6ICdUdSBtZW5zYWplIGhhIHNpZG8gZW52aWFkbywgZ3JhY2lhcy4nXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmNvbnRhY3QgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb24uJHNldFByaXN0aW5lKCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm1lc3NhZ2VTdGF0ZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc3RhdGUnOiAzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdtc2cnOiAnTG8gc2VudGltb3MsIG5vIHNlIHB1ZG8gZW52aWFyIG1lbnNhamUsIGludGVudGFyIG1cXHhFMXMgdGFyZGUuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm1lc3NhZ2VTdGF0ZS5tc2cgPSBcIlBvciBmYXZvciBsbGVuZSBsb3MgY2FtcG9zIGZhbHRhbnRlcy5cIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuXG4gICAgICAgIGluaXQoKTtcbiAgICB9XSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnbWludC5hcHAuQ29udGFjdEZhY3RvcnknLCBbXSlcblx0LmZhY3RvcnkoJ0NvbnRhY3RWYWxpZGF0ZScsIFsnJGxvZycsIGZ1bmN0aW9uKCRsb2cpIHtcblx0XHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHQnbmFtZSc6IHtcblx0XHRcdFx0XHQnbWluJzogMyxcblx0XHRcdFx0XHQncmVxdWlyZWQnOiB0cnVlLFxuXHRcdFx0XHRcdCdtYXgnOiAxMjBcblx0XHRcdFx0fSxcblx0XHRcdFx0J2VtYWlsJzoge1xuXHRcdFx0XHRcdCdtaW4nOiAzLFxuXHRcdFx0XHRcdCdyZXF1aXJlZCc6IHRydWUsXG5cdFx0XHRcdFx0J21heCc6IDEyMCxcblx0XHRcdFx0XHQncGF0dGVybic6ICdeW2EtekEtWjAtOS5fJSstXStAW2EtekEtWjAtOS4tXStcXFxcLlthLXpBLVpdezIsNn0kJ1xuXHRcdFx0XHR9LFxuXHRcdFx0XHQndGVsJzoge1xuXHRcdFx0XHRcdCdtaW4nOiA3LFxuXHRcdFx0XHRcdCdyZXF1aXJlZCc6IHRydWUsXG5cdFx0XHRcdFx0J21heCc6IDIwXG5cdFx0XHRcdH0sXG5cdFx0XHRcdCdtZXNzYWdlJzoge1xuXHRcdFx0XHRcdCdtaW4nOiA1LFxuXHRcdFx0XHRcdCdyZXF1aXJlZCc6IHRydWUsXG5cdFx0XHRcdFx0J21heCc6IDUwMFxuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdH07XG5cdH1dKTsiLCJhbmd1bGFyLm1vZHVsZSgnbWludC5hcHAuQ29udGFjdFNlcnZpY2UnLCBbXSlcblx0LnNlcnZpY2UoJ01lc3NhZ2VTZXJ2aWNlJywgWyckbG9nJywgJyRodHRwJywgJyRxJywgJ2VtYWlsQ29uZmlnJywgZnVuY3Rpb24oJGxvZywgJGh0dHAsICRxLCBlbWFpbENvbmZpZykge1xuXHRcdHJldHVybiAoe1xuXHRcdFx0c2VuZE1lc3NhZ2U6IHNlbmRNZXNzYWdlXG5cdFx0fSk7XG5cblx0XHQvKipcblx0XHQgKiBIZWxwZXIgZnVuY3Rpb24gdG8gY2FsbCBBUElcblx0XHQgKiBAcGFyYW0ge29iamVjdH0gY29udGFjdFxuXHRcdCAqIEByZXR1cm4ge3Byb21pc2V9IGRlZmVyLnByb21pc2Vcblx0XHQgKi9cblx0XHRmdW5jdGlvbiBzZW5kTWVzc2FnZShjb250YWN0KSB7XG5cdFx0XHR2YXIgZGVmZXIgPSAkcS5kZWZlcigpLFxuXHRcdFx0XHR1cmwgPSBlbWFpbENvbmZpZy5tZXNzYWdlQVBJLFxuXHRcdFx0XHRlbWFpbF90byA9IGVtYWlsQ29uZmlnLmRlZmF1bHRFbWFpbCxcblx0XHRcdFx0ZGF0YSA9IHtcblx0XHRcdFx0XHQnZGF0YSc6IHtcblx0XHRcdFx0XHRcdCdjb250YWN0JzogY29udGFjdCxcblx0XHRcdFx0XHRcdCd3ZWJzaXRlJzoge1xuXHRcdFx0XHRcdFx0XHQnaWQnOiBlbWFpbENvbmZpZy53ZWJzaXRlLmlkLFxuXHRcdFx0XHRcdFx0XHQnbmFtZSc6IGVtYWlsQ29uZmlnLndlYnNpdGUubmFtZSxcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHQnZW1haWxfdG8nOiBlbWFpbF90byxcblx0XHRcdFx0XHRcdCdlbWFpbF9mcm9tJzogY29udGFjdC5lbWFpbCB8fCBlbWFpbF90b1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fTtcblx0XHRcdCRodHRwKHtcblx0XHRcdFx0bWV0aG9kOiAnUE9TVCcsXG5cdFx0XHRcdHVybDogdXJsICsgJ21lc3NhZ2UnLFxuXHRcdFx0XHRkYXRhOiBkYXRhXG5cdFx0XHR9KS50aGVuKGZ1bmN0aW9uKGRhdGEsIHN0YXR1cywgaGVhZGVycywgY29uZmlnKSB7XG5cdFx0XHRcdGRlZmVyLnJlc29sdmUoKTtcblx0XHRcdH0sIGZ1bmN0aW9uKGRhdGEsIHN0YXR1cywgaGVhZGVycywgY29uZmlnKSB7XG5cdFx0XHRcdGRlZmVyLnJlamVjdCgpO1xuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gZGVmZXIucHJvbWlzZTtcblx0XHR9XG5cdH1dKTsiLCJhbmd1bGFyLm1vZHVsZShcIm1pbnQuYXBwLkNvbnRhY3RcIiwgW1xuXHQnbWludC5hcHAuQ29udGFjdENvbnRyb2xsZXInLFxuXHQnbWludC5hcHAuQ29udGFjdEZhY3RvcnknLFxuXHQnbWludC5hcHAuQ29udGFjdFNlcnZpY2UnXG5cdF0pOyIsImFuZ3VsYXIubW9kdWxlKCdtaW50LmFwcC5HZW5lcmljQ29udHJvbGxlcicsIFtdKVxuXHQuY29udHJvbGxlcignR2VuZXJpY0NvbnRyb2xsZXInLCBbJyRzY29wZScsICckbG9nJywgZnVuY3Rpb24oJHNjb3BlLCAkbG9nKSB7XG5cblx0XHR2YXIgaW5pdCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0JGxvZy5pbmZvKCdHZW5lcmljQ29udHJvbGxlcicpO1xuXHRcdH07XG5cblx0XHRpbml0KCk7XG5cdH1dKTsiLCJhbmd1bGFyLm1vZHVsZSgnbWludC5hcHAuR2VuZXJpYycsIFtcblx0J21pbnQuYXBwLkdlbmVyaWNDb250cm9sbGVyJ1xuXHRdKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=