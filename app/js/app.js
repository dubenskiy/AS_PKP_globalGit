/**
 * Created by DubenskiyAA on 06.07.2016.
 */

'use strict';

// Make sure to include the `ui.router` module as a dependency
angular.module('asPkpApp', [
    'ui.router',
    'ngAnimate',
    'ngSanitize',
    'ngCookies',
    'ngResource',
    'ui.bootstrap',
    'ui-notification',

    // 'asPkpApp.filters.startsWith',

    'angularUtils.directives.dirPagination',
    'angularUtils.directives.uiBreadcrumbs',

    'angularBootstrapNavTree',

    'asDrApp.fileNameInput.directive',

    'asPkpApp.tasks.service',
    'asPkpApp.censusProcess.service',
    'asPkpApp.distribution.service',

    'asPkpApp.tasksCtrl',
    'asPkpApp.tasksDetailCtrl',
    'asPkpApp.censusProcessCtrl',
    'asPkpApp.selectedLeafCtrl',
    'asPkpApp.distributionCtrl',
    // 'asPkpApp.tableSelectedLeafCtrl',

    'asPkpApp.counter.component',
    'asPkpApp.foo.component',

    'asDrApp.datePickerCtrl',

    // 'asPkpApp.detailInfoFromRowModalCtrl'

    'asPkpApp.myResizer.directive',
    'asPkpApp.drawingProcess.directive'
])

    .run(
        ['$rootScope', '$state', '$log', '$trace', '$transitions',
            function ($rootScope, $state, $log, $trace, $transitions) {
                $rootScope.$state = $state;
                // $rootScope.$transition = $transition$.params();

                // $log.debug( $rootScope.$transition);

                // $rootScope.$on("$stateChangeError", console.log.bind(console));
                //
                // $rootScope.$on('$stateChangeSuccess',
                //     function (event, toState, toParams, fromState, fromParams) {
                //         if (toState.name === 'censusProcess.detailSelectedLeaf' && fromState.name === '' && fromState.views === null) {
                //             $state.go('^');
                //         }
                //     });

                $rootScope.checkedMainNavigationRoot = false;
                $rootScope.loading = 0;
                // $cookies.remove('categoryIdKey');
                //$log.warn('app '+$rootScope.checkedMainNavigationTemp);

                // $rootScope.openInfo = function () {
                //     alert('Вас зовут: ' + $rootScope.user.fio + ' и вы из ' + $rootScope.user.org + '\n' + 'angular version: ' + angular.version.full);
                // };

                // alert(angular.version.full );

                /**
                 * Ошибки
                 * @type {Array}
                 */
                // window.myAppErrorLog = [];
                // $stateProvider.defaultErrorHandler(function(error) {
                //     // This is a naive example of how to silence the default error handler.
                //     window.myAppErrorLog.push(error);
                // });

                /**
                 * трасировка
                 */
                $trace.enable('TRANSITION');

                /**
                 * анимация загрузкт
                 */
                $transitions.onStart({entering: 'tasks'}, function (trans) {
                    let SpinnerService = trans.injector().get('SpinnerService');
                    SpinnerService.transitionStart();
                    trans.promise.finally(SpinnerService.transitionEnd);
                });

                // $log.info($transitions.getHooks("onEnter"));

                /**
                 * счетчик вотчеров
                 */
                // (function () {
                //     var root = $(document.getElementsByTagName('body'));
                //     var watchers = [];
                //
                //     var f = function (element) {
                //         if (element.data().hasOwnProperty('$scope')) {
                //             angular.forEach(element.data().$scope.$$watchers, function (watcher) {
                //                 watchers.push(watcher);
                //             });
                //         }
                //
                //         angular.forEach(element.children(), function (childElement) {
                //             f($(childElement));
                //         });
                //     };
                //
                //     f(root);
                //
                //     console.log(watchers.length);
                // })();

                // 65767
            }
        ]
    )

    .service('SpinnerService', function () {

        let count = 0;

        return {
            transitionStart: function () {
                if (++count > 0) showSpinner();
            },
            transitionEnd: function () {
                if (--count <= 0) hideSpinner();
            },
        };

        function showSpinner() {
            console.log('showSpinner');
        }

        function hideSpinner() {
            console.log('hideSpinner');
        }

    })

    .service('MyService', function ($log) {


        return {
            onEnter: function () {
                return $log.warn('onEnter')
            },
            onExit: function () {
                return $log.warn('onExit')
            }
        };


    })

    .controller('ReferenceModalCtrl', function ($scope, $uibModalInstance) {

        $scope.ok = function () {
            $uibModalInstance.close();
        };

    })

    .factory('timestampMarker', function () {
        return {
            request: function (config) {
                config.requestTimestamp = new Date().getTime();
                // console.log(1);
                return config;
            },
            response: function (response) {
                response.config.responseTimestamp = new Date().getTime();
                return response;
            }
        }
    })

    .factory('httpLoading', function ($rootScope, $q, $log) {
        return {
            'request': function (config) {
                $rootScope.loading++;
                return config;
            },

            'requestError': function (rejection) {
                $rootScope.loading--;
                return $q.reject(rejection);
            },

            'response': function (response) {
                $rootScope.loading--;
                // console.log(2);
                return response
            },

            'responseError': function (rejection) {
                $rootScope.loading--;
                $log.error('Response error:', rejection);
                return $q.reject(rejection);
            }
        }
    })

    .factory('sessionRecovery', function ($q) {
        return {
            response: function (response) {
                if (typeof response.data === 'string' && response.data.indexOf('id="loginPageAsApkpApp"') > -1) {
                    window.location.reload();
                    alert("Истекло время сессии, приложение будет перезапущено");
                    //window.location.href = "/VNG";
                    return $q.reject(response);
                } else {
                    // console.log(3);
                    return response
                }
            }
        }
    })

    .component('modalComponent', {
        template: [
            '<div class="modal-body" id="modal-body">',
            '<ul>',
            '<li ng-repeat="item in $ctrl.items">',
            '<a href="#" ng-click="$event.preventDefault(); $ctrl.selected.item = item">{{ item }}</a>',
            '</li>',
            '</ul>',
            'Selected: <b>{{ $ctrl.selected.item }}</b>',
            '</div>',
            '<div class="modal-footer">',
            '<button class="btn btn-primary" type="button" ng-click="$ctrl.ok()">OK</button> ',
            '<button class="btn btn-warning" type="button" ng-click="$ctrl.cancel()">Cancel</button>',
            '</div>'
        ].join(''),
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        },
        controller: function () {
            let $ctrl = this;

            $ctrl.$onInit = function () {
                $ctrl.items = ['item1', 'item2', 'item3'];
                $ctrl.selected = {
                    item: $ctrl.items[0]
                };
            };

            $ctrl.ok = function () {
                $ctrl.close({$value: $ctrl.selected.item});
            };

            $ctrl.cancel = function () {
                $ctrl.dismiss({$value: 'cancel'});
            };
        }
    })

    // .config(['$stateProvider'], function($stateProvider) {
    //     window.myAppErrorLog = [];
    //     $stateProvider.defaultErrorHandler(function(error) {
    //         // This is a naive example of how to silence the default error handler.
    //         window.myAppErrorLog.push(error);
    //     });
    // })

    .config(
        ['$stateProvider', '$urlRouterProvider', '$httpProvider',
            function ($stateProvider, $urlRouterProvider, $httpProvider) {




                //////////////////
                // interceptors //
                //////////////////

                $httpProvider

                    .interceptors.push('timestampMarker', 'httpLoading', 'sessionRecovery');

                /////////////////////////////
                // Redirects and Otherwise //
                /////////////////////////////

                $urlRouterProvider

                // .when('/404', '/404')
                    .otherwise('/');

                //////////////////////////
                // State Configurations //
                //////////////////////////

                $stateProvider

                    //////////
                    // Home //
                    //////////

                    .state("home", {
                        url: "/",
                        template: '<h3 style="text-align: center; margin-top: 200px"><code>Анонним</code>, добро пожаловать в АС ПКП!</h3>' +
                        '<h4 style="text-align: center">Автоматизированная система переписи контейнерного парка</h4> ',
                        data: {
                            displayName: false
                        }
                    })

                    ///////////
                    // tasks //
                    ///////////

                    .state('tasks', {
                        url: '/tasks',
                        // component: 'foo',
                        views: {
                            '': {
                                templateUrl: 'pages/tasks/tasks.html',
                                controller: 'TasksCtrl'
                            }
                        },
                        onRetain: function ($transition$, $state$) {
                            console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!! Leaving " + $state$.name);
                        },
                        // onEnter: function ($transition$, $state$) {
                        //     let $uibModal = $transition$.injector().get('$uibModal');
                        //     $uibModal.open({
                        //         component: 'modalComponent'
                        //
                        //     });
                        //
                        //
                        //     // let AuditService = $transition$.injector().get('AuditService');
                        //     // AuditService.log("Entered " + state.name + " module while transitioning to " + transition.to().name);
                        // },
                        data: {
                            displayName: 'Очередь моих задач'
                        }
                    })

                    ///////////
                    // component //
                    ///////////

                    .state('fooState', {
                        url: '/foo/:fooId',
                        params: {
                            fooId: '999',
                            squash: "~"
                        },
                        component: 'foo',
                        // the `foo` input binding on the component
                        // receives `fooData` resolve value (from the state)
                        bindings: { foo: 'fooData' },
                        resolve: {
                            // A resolve named `fooData`
                            fooData: function(tasksService, $stateParams) {
                                return tasksService.getFoo($stateParams.fooId)
                            }
                        }
                    })

                    ///////////
                    // tasks.detail //
                    ///////////

                    .state('tasks.detail', {
                        url: '/detail?type',
                        views: {
                            '@': {
                                templateUrl: function ($stateParams) {
                                    if ($stateParams.type === 'TlgInput')
                                        return "pages/tasks/tlgInput.html";
                                    if ($stateParams.type === 'ScheduleDelivery')
                                        return "pages/tasks/scheduleDelivery.html";
                                    if ($stateParams.type === 'SendDifferencesFiles')
                                        return "pages/tasks/sendDifferencesFiles.html";
                                    if ($stateParams.type === 'ReceivePartDbf')
                                        return "pages/tasks/receivePartDbf.html";
                                    if ($stateParams.type === 'AktForm')
                                        return "pages/tasks/aktForm.html";
                                    if ($stateParams.type === 'SendPartDbf')
                                        return "pages/tasks/sendPartDbf.html";
                                    if ($stateParams.type === 'ControlUpload3345')
                                        return "pages/tasks/controlUpload3345.html";
                                    if ($stateParams.type === 'CommunicationPktbCki')
                                        return "pages/tasks/communicationPktbCki.html";
                                    if ($stateParams.type === 'SendContainerLis')
                                        return "pages/tasks/sendContainerLis.html";
                                },
                                controller: 'TasksDetailCtrl'
                            }
                        },
                        data: {
                            displayName: 'Форма'
                        }
                    })

                    ///////////
                    // censusProcess //
                    ///////////

                    .state('censusProcess', {
                        url: '/censusProcess',
                        views: {
                            '': {
                                templateUrl: 'pages/censusProcess/censusProcess.html',
                                controller: 'CensusProcessCtrl'
                                // controllerAs: 'censusProcess'
                            }
                        },
                        data: {
                            displayName: 'Процесс переписи'
                        }
                    })

                    /////////////////////////////
                    // censusProcess > detailSelectedLeaf//
                    /////////////////////////////

                    .state('censusProcess.detailSelectedLeaf', {

                        url: '/detailSelectedLeaf?type?typeDetail',

                        // resolve: {
                        //     getCategoryId: function ($rootScope, $cookies) {
                        //         return $rootScope.categoryId = $cookies.get('categoryIdKey');
                        //     }
                        // },
                        views: {
                            'detailSelectedLeaf@censusProcess': {
                                templateUrl: function ($stateParams) {
                                    if ($stateParams.type === 'SchemeLeaf')
                                        return "pages/censusProcess/schemeLeaf.html";
                                    if ($stateParams.type === 'TlgInput')
                                        return "pages/tasks/tlgInput.html";
                                    if ($stateParams.type === 'ScheduleDelivery')
                                        return "pages/tasks/scheduleDelivery.html";
                                    if ($stateParams.type === 'FileLeaf')
                                        return "pages/censusProcess/fileLeaf.html";
                                    if ($stateParams.type === 'TableLeaf')
                                        return "pages/censusProcess/tableLeaf.html";
                                },
                                controller: 'SelectedLeafCtrl'
                                // controllerProvider: function ($stateParams) {
                                //     if ($stateParams.type === 'Scheme')
                                //         return "SelectedLeafCtrl";
                                //     if ($stateParams.type === 'table')
                                //         return "TableSelectedLeafCtrl";
                                // }
                            }
                        },
                        data: {
                            displayName: false
                        }
                    })

                    ///////////
                    // censusProcess //
                    ///////////

                    .state('distribution', {
                        url: '/distribution',
                        views: {
                            '': {
                                templateUrl: 'pages/distribution/distribution.html',
                                controller: 'DistributionCtrl',
                                controllerAs: 'vm',
                                // controllerAs: 'censusProcess'
                            }
                        },
                        data: {
                            displayName: 'Рассылка'
                        }
                    })

            }
        ]
    );

