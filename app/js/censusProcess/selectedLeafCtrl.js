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
                if (~className.indexOf("_prepare_step_")) {
                    $log.debug('_prepare_step_');

                    newTab('prepare_step', 'section_r1')
                } else if (~className.indexOf("BPMNShape_step_r2")) {
                    $log.debug('BPMNShape_step_r2');
                    // $scope.selectedLeafObj.showSheme = 'BPMNShape_step_r2';
                    newTab('BPMNShape_step_r2', 'section_r2')
                }

                function newTab(tabName, xmlName) {
                    if ($scope.tabs.length > 0) {
                        $log.info(1);
                        angular.forEach($scope.tabs, function (val, index) {
                            $log.info('tabName ' + tabName);
                            if (tabName == val.title) {
                                $timeout(function () {
                                    $scope.activeTabIndex = ($scope.tabs.length );
                                });
                            } else {
                                var newTab = {title: tabName, showScheme: tabName};
                                $scope.tabs.push(newTab);
                                $timeout(function () {
                                    $scope.activeTabIndex = ($scope.tabs.length );
                                    $scope.selectedLeafObj.getXML(xmlName);
                                });
                            }
                        });
                    } else {
                        var newTab = {title: tabName, showScheme: tabName};
                        $scope.tabs.push(newTab);
                        // $scope.idParent ++;
                        $timeout(function () {
                            $scope.activeTabIndex = ($scope.tabs.length );
                            $scope.selectedLeafObj.getXML(xmlName);
                        });
                    }

                    $timeout(function () {
                        $log.debug($scope.tabs)
                    });
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



