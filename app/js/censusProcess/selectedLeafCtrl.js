/**
 * Created by DubenskiyAA on 06.07.2016.
 */

"use strict";

angular.module('asPkpApp.selectedLeafCtrl', [])

    .controller('SelectedLeafCtrl', ['$scope', '$log', '$rootScope', '$stateParams', '$state', '$cookies', '$uibModal', 'censusProcessService', '$timeout', '$window',
        function ($scope, $log, $rootScope, $stateParams, $state, $cookies, $uibModal, censusProcessService, $timeout, $window) {

            $scope.selectedLeafObj = {};
            $scope.selectedLeafObj.gridTable = {};
            $scope.selectedLeafObj.pageNumber = 1;
            $scope.selectedLeafObj.countRowInPage = '5';
            $scope.model = $scope.selectedLeafObj;

            // $scope.selectedLeafObj.activeTabIndex = 0;
            // $scope.selectedLeafObj.tabs = [];

            // ************************* test ******************
            $scope.selectedLeafObj.getXML = function (name) {
                censusProcessService.getXML(name).then(function (response) {
                    if (response) {
                        $scope.dataJSON = angular.fromJson(response.definitions);
                    }
                });
            };


            // ************************* test ******************

            $scope.activeTabIndex = 0;
            $scope.idParent = 0;
            $scope.tabs = [];

            $scope.selectedLeafObj.openNewProcess = function (className) {

                $scope.selectedLeafObj.showSheme = null;
                if (~className.indexOf("prepare_step")) {
                    newTab('prepare_step', 'section_r1')
                } else if (~className.indexOf("BPMNShape_step_r2")) {
                    newTab('BPMNShape_step_r2', 'section_r2')
                } else if (~className.indexOf("BPMNShape_step_r3")) {
                    newTab('BPMNShape_step_r3', 'section_r3')
                } else if (~className.indexOf("BPMNShape_step_r4")) {
                    newTab('BPMNShape_step_r4', 'section_r4')
                } else if (~className.indexOf("BPMNShape_step_r5")) {
                    newTab('BPMNShape_step_r5', 'section_r5')
                } else if (~className.indexOf("BPMNShape_step_r6")) {
                    newTab('BPMNShape_step_r6', 'section_r6')
                }

                function newTab(tabName, xmlName) {
                    var indexExistTab = -1,
                        newTab;

                    if ($scope.tabs.length > 0) {
                        // $log.log('массив существует');
                        angular.forEach($scope.tabs, function (val, index) {
                            if (val.title == tabName) {
                                indexExistTab = index;
                            }
                        });

                        if (indexExistTab >= 0) {
                            // $log.log('Открывается существующая вкладка');
                            $timeout(function () {
                                $scope.activeTabIndex = $scope.tabs[indexExistTab].activeTabIndex;
                            });
                        } else {
                            // $log.log('Открывается новая вкладка');
                            newTab = {
                                title: tabName,
                                showScheme: tabName,
                                activeTabIndex: $scope.tabs.length + 1
                            };
                            $scope.tabs.push(newTab);
                            $timeout(function () {
                                $scope.activeTabIndex = $scope.tabs.length;
                                $scope.selectedLeafObj.getXML(xmlName);
                            });
                        }
                    } else {
                        newTab = {
                            title: tabName,
                            showScheme: tabName,
                            activeTabIndex: 1
                        };
                        $scope.tabs.push(newTab);
                        // $log.log('массив не существует');
                        $timeout(function () {
                            $scope.activeTabIndex = $scope.tabs.length;
                            $scope.selectedLeafObj.getXML(xmlName);
                            // return $scope.activeTabIndex;
                        });
                    }
                }
            };


            /**
             * Загрузка данных
             */
            $scope.selectedLeafObj.getListFile = function () {
                censusProcessService.getListFile().then(function (response) {
                    if (response) {
                        $scope.selectedLeafObj.listFile = response;
                        // $log.info($scope.listFile);
                    }
                });
            };

            $scope.selectedLeafObj.getListDistributionProcess = function () {
                censusProcessService.getListDistributionProcess().then(function (response) {
                    if (response) {
                        $scope.selectedLeafObj.listDistributionProcess = response;
                        // $log.info($scope.tasksData);
                    }
                });
            };

            $scope.selectedLeafObj.getPrpMainColumns = function () {
                censusProcessService.getPrpMainColumns().then(function (response) {
                    if (response) {
                        $scope.selectedLeafObj.gridTable.columns = response;
                        $scope.selectedLeafObj.getPrpMainData();
                    }
                });
            };

            $scope.selectedLeafObj.getPrpMainData = function () {
                censusProcessService.getPrpMainData().then(function (response) {
                    if (response) {
                        $scope.selectedLeafObj.gridTable.data = response;
                    }
                });
            };

            $scope.selectedLeafObj.getPrpIbmuColumns = function () {
                censusProcessService.getPrpIbmuColumns().then(function (response) {
                    if (response) {
                        $scope.selectedLeafObj.gridTable.columns = response;
                        $scope.selectedLeafObj.getPrpIbmuData();
                    }
                });
            };

            $scope.selectedLeafObj.getPrpIbmuData = function () {
                censusProcessService.getPrpIbmuData().then(function (response) {
                    if (response) {
                        $scope.selectedLeafObj.gridTable.data = response;
                    }
                });
            };


            if ($stateParams.type === 'FileLeaf') {
                $scope.selectedLeafObj.getListFile();
                $scope.selectedLeafObj.getListDistributionProcess();
            } else if ($stateParams.type === 'TableLeaf' && $stateParams.typeDetail === 'prpMain') {
                $scope.selectedLeafObj.getPrpMainColumns();
            } else if ($stateParams.type === 'TableLeaf' && $stateParams.typeDetail === 'prpIbmu') {
                $scope.selectedLeafObj.getPrpIbmuColumns();
            } else if ($stateParams.type === 'SchemeLeaf') {
                $scope.selectedLeafObj.getXML('main');
            }

            /**
             * Действие на клик по строке
             * @param index
             * @param rowObj
             */
            $scope.selectedLeafObj.setClickedRow = function (index, rowObj) {
                $scope.selectedLeafObj.selectedIndex = index;
                $scope.selectedLeafObj.selectedRow = rowObj;
                $scope.selectedLeafObj.disabledToolbarButtons = angular.isNumber($scope.selectedLeafObj.selectedIndex);
                // $log.info($scope.disabledButtons);
            };

            /**
             * следущая страница в пагинаторе
             * @param newPage
             * @param countRowInPage
             */
            $scope.selectedLeafObj.pageChanged = function (newPage, countRowInPage) {
                // $log.info('следущая страница в пагинаторе');
                $scope.selectedLeafObj.pageNumber = newPage;
                $scope.selectedLeafObj.getPrpMainData($scope.selectedLeafObj.pageNumber, countRowInPage);
            };

            /**
             * изменение количетсва строк в таблице
             * @param countRowInPage
             */
            $scope.selectedLeafObj.countRowInPageChanged = function (countRowInPage) {
                // $log.info('изменение количетсва строк в таблице');
                $scope.selectedLeafObj.getPrpMainData($scope.selectedLeafObj.pageNumber, countRowInPage);
            };

        }
    ]);



