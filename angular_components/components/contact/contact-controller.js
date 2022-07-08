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
