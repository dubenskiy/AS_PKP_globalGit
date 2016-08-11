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



            // angular.element($window).bind('load', function() {
            //     alert(3333343424);
            // });

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
            }  else if ($stateParams.type === 'TableLeaf' && $stateParams.typeDetail === 'prpIbmu') {
                $scope.selectedLeafObj.getPrpIbmuColumns();
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



