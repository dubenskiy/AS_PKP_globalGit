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
            $scope.selectedLeafObj.isDetailsScheme = false;
            $scope.selectedLeafObj.counterSelectedTab = 0;
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

            $scope.selectedLeafObj.activeTabIndex = 0;
            // $scope.idParent = 0;
            $scope.selectedLeafObj.tabs = [];

            /**
             * Открытие новой вкладки
             * @param idElem
             */
            $scope.selectedLeafObj.openNewProcess = function (idElem) {

                $scope.selectedLeafObj.showSheme = null;
                if (~idElem.indexOf("prepare_step")) {
                    newTab('prepare_step', 'section_r1')
                } else if (~idElem.indexOf("BPMNShape_step_r2")) {
                    newTab('BPMNShape_step_r2', 'section_r2')
                } else if (~idElem.indexOf("BPMNShape_step_r3")) {
                    newTab('BPMNShape_step_r3', 'section_r3')
                } else if (~idElem.indexOf("BPMNShape_step_r4")) {
                    newTab('BPMNShape_step_r4', 'section_r4')
                } else if (~idElem.indexOf("BPMNShape_step_r5")) {
                    newTab('BPMNShape_step_r5', 'section_r5')
                } else if (~idElem.indexOf("BPMNShape_step_r6")) {
                    newTab('BPMNShape_step_r6', 'section_r6')
                }

                /**
                 * Открытие нового таба
                 * @param tabName
                 * @param xmlName
                 */
                function newTab(tabName, xmlName) {
                    var indexExistTab = -1,
                        newTab;

                    if ($scope.selectedLeafObj.tabs.length > 0) {
                        // $log.log('массив существует');
                        angular.forEach($scope.selectedLeafObj.tabs, function (val, index) {
                            if (val.title == tabName) {
                                indexExistTab = index;
                            }
                        });

                        if (indexExistTab >= 0) {
                            // $log.log('Открывается существующая вкладка');
                            $scope.selectedLeafObj.isDetailsScheme = false;
                            $timeout(function () {
                                $scope.selectedLeafObj.activeTabIndex = $scope.selectedLeafObj.tabs[indexExistTab].activeTabIndex;
                            });
                        } else {
                            // $log.log('Открывается новая вкладка');
                            newTab = {
                                title: tabName,
                                showScheme: tabName,
                                activeTabIndex: $scope.selectedLeafObj.tabs.length + 1
                            };
                            $scope.selectedLeafObj.tabs.push(newTab);
                            $scope.selectedLeafObj.isDetailsScheme = false;
                            $timeout(function () {
                                $scope.selectedLeafObj.activeTabIndex = $scope.selectedLeafObj.tabs.length;
                                $scope.selectedLeafObj.getXML(xmlName);
                            });
                        }
                    } else {
                        // $log.log('массив не существует');
                        newTab = {
                            title: tabName,
                            showScheme: tabName,
                            activeTabIndex: 1
                        };
                        $scope.selectedLeafObj.tabs.push(newTab);
                        $scope.selectedLeafObj.isDetailsScheme = false;
                        $timeout(function () {
                            $scope.selectedLeafObj.activeTabIndex = $scope.selectedLeafObj.tabs.length;
                            $scope.selectedLeafObj.getXML(xmlName);
                        });
                    }
                }
            };

            /**
             * показ подробной информации при клике по эллементу
             * @param idElem
             */
            $scope.selectedLeafObj.taskDetailInfo = function (idElem) {
                if (~idElem.indexOf("BPMNShape_usertask")) {
                    // alert(idElem);
                    $scope.selectedLeafObj.isDetailsScheme = true;
                    // $log.debug($scope.selectedLeafObj.isDetailsScheme);
                }
            };

            /**
             * действия при выборе таба
             */
            $scope.selectedLeafObj.tabSelected = function (index) {
                $scope.selectedLeafObj.indexTabSelected = index;
                if ($scope.selectedLeafObj.counterSelectedTab) {
                    if (index == 0) {
                        $scope.selectedLeafObj.isDetailsScheme = true;
                    } else {
                        $scope.selectedLeafObj.isDetailsScheme = false;
                    }
                }
                $scope.selectedLeafObj.counterSelectedTab++;
            };

            /**
             * закрыть выбранный таб
             */
            $scope.selectedLeafObj.closeTab = function (index) {
                // $log.debug(index);
                // $log.log($scope.selectedLeafObj.tabs);
                $scope.selectedLeafObj.tabs.splice(index - 1, 1);

                $timeout(function () {
                    // $log.log($scope.selectedLeafObj.tabs);
                    $scope.selectedLeafObj.activeTabIndex = 0;
                }, 100);
                // alert(index);
            };

            /**
             * selectedLeafObj.refreshAllTabs()
             */
            $scope.selectedLeafObj.refreshAllTabs = function (index) {
                alert(index);
            };

            /**
             * Загрузка данных
             */
            $scope.selectedLeafObj.getXML = function (name) {
                censusProcessService.getXML(name).then(function (response) {
                    if (response) {
                        $scope.dataJSON = angular.fromJson(response.definitions);
                    }
                });
            };

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



