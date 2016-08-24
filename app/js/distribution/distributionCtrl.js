/**
 * Created by DubenskiyAA on 24.08.2016.
 */

angular.module('asPkpApp.distributionCtrl', [])
    .controller('DistributionCtrl', ['$scope', '$log', '$rootScope', '$stateParams', '$state', '$cookies', '$uibModal', 'tasksService', 'Notification',
        function ($scope, $log, $rootScope, $stateParams, $state, $cookies, $uibModal, tasksService, Notification) {

            var vm = this;
            vm.distribution = distribution;
            vm.setClickedRow = setClickedRow;
            vm.removeRow = removeRow;
            vm.saveNewDestination = saveNewDestination;
            vm.saveEditDestination = saveEditDestination;
            vm.edit = edit;
            // vm.listDistribution = [];
            // vm.getListDistribution = getListDistribution

            getListDistribution();

            function edit(arr) {
                vm.isAddOrEditDestination = !vm.isAddOrEditDestination;
                vm.roadCode = arr[vm.selectedIndex].roadCode;
                vm.name = arr[vm.selectedIndex].name;
                vm.email = arr[vm.selectedIndex].email;
            }

            /**
             * Действие на клик по строке
             * @param index
             * @param rowObj
             */
            function setClickedRow(index, rowObj) {
                vm.selectedIndex = index;
                vm.selectedRow = rowObj;
                vm.disabledToolbarButtons = angular.isNumber(vm.selectedIndex);
                // $log.info($scope.disabledButtons);
            }

            /**
             * Удалить строку
             * @param arr
             */
            function removeRow(arr) {
                arr.splice(vm.selectedIndex, 1);
                vm.setClickedRow(null);
            }

            /**
             * Добавить новую запись в рассылке
             */
            function saveNewDestination(arr, roadCode, name, email) {
                arr.push({
                    "roadCode": roadCode,
                    "name": name,
                    "email": email
                });
                vm.roadCode = vm.name = vm.email = null;
                vm.isAddOrEditDestination = false;
            }

            /**
             * Изменить строку в рассылке
             */
            function saveEditDestination(arr, roadCode, name, email) {
                // angular.forEach(arr, function (val, index) {
                //     if (val === vm.selectedRow) {
                //         arr[index] = vm.destination
                //     }
                // });
                arr[vm.selectedIndex].roadCode = roadCode;
                arr[vm.selectedIndex].name = name;
                arr[vm.selectedIndex].email = email;

                vm.roadCode = vm.name = vm.email = null;
                vm.isAddOrEditDestination = false;
                vm.setClickedRow(null);
            }


            /**
             * Выполнить рассылку
             * @param val
             */
            function distribution(val) {
                alert(val + ' || ' + $stateParams.type);
            }

            function getListDistribution() {
                tasksService.getListDistribution().then(function (response) {
                    if (response) {
                        vm.listDistribution = response.data;
                        return vm.listDistribution;
                        // $log.info($scope.tasksData);
                    }
                });
            }

        }
    ]);



