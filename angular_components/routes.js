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
