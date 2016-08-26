/**
 * Created by DubenskiyAA on 24.08.2016.
 */

angular.module('asPkpApp.distributionCtrl', [])
    .controller('DistributionCtrl', ['$scope', '$log', '$rootScope', '$stateParams', '$state', '$cookies', '$uibModal', 'DistributionService', 'Notification',
        function ($scope, $log, $rootScope, $stateParams, $state, $cookies, $uibModal, DistributionService, Notification) {

            var vm = this;
            vm.distribution = distribution;
            vm.setClickedRow = setClickedRow;
            vm.removeRow = removeRow;
            vm.saveNewDestination = saveNewDestination;
            vm.saveEditDestination = saveEditDestination;
            vm.edit = edit;
            // vm.listDistribution = [];
            // vm.getListDistribution = getListDistribution


            // var postUsers = $http.get('http://jsonplaceholder.typicode.com/users/');
            // postUsers.then(function(result) {
            //     vm.users = result.data;
            //     $log.debug(vm.users)
            // });

            // $scope.users = DistributionService.getUp();
            // $log.debug($scope.users);
            // $log.debug('------------------------');
            // $scope.oneUser = DistributionService.get({id: 1});
            // $log.debug($scope.oneUser);


            // UserService.update({user: 1}, {name: 'Saimon', email: 'saimon@devdactic.com'});

            // $log.debug('------------------------');
            // $scope.users = DistributionService.query();
            // $log.debug($scope.users);

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
                DistributionService.getListDistribution().then(function (response) {
                    if (response) {
                        $log.info(response);
                        // vm.listDistribution = response.data;
                        // return vm.listDistribution;
                        // $log.info($scope.tasksData);
                    }
                });
            }

        }
    ]);



