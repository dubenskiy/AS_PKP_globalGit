/**
 * Created by DubenskiyAA on 05.07.2016.
 */

angular.module('asPkpApp.tasksCtrl', [])
    .controller('TasksCtrl', ['$scope', '$log', '$rootScope', '$stateParams', '$state', '$cookies', '$uibModal', 'tasksService', 'Notification',
        function ($scope, $log, $rootScope, $stateParams, $state, $cookies, $uibModal, tasksService, Notification) {

            $scope.years = [];
            $scope.year = new Date().getFullYear();
            $scope.sortType = 'appointmentDate'; // значение сортировки по умолчанию
            $scope.sortReverse = true;  // обратная сортировка
            $scope.searchTasks = '';     // значение поиска по умолчанию

            $scope.data = 4;

            $scope.uiOnParamsChanged = function(newParams) {
                console.log("new params: ", newParams);
            };

            $scope.fooStateGo = function () {
                $state.go('fooState', {'fooId': '999'});
            };

            // $scope.test = function () {
            //     alert(423432);
            // };
            //
            // $scope.$watch('count', function (newValue, oldValue) {
            //     if (newValue > 6) alert('hi')
            // });

            /**
             * года
             */
            for (var i = 0, year = new Date().getFullYear(); i < 50; i++, year--) {
                $scope.years[i] = year;
            }

            /**
             * Загрузка данных
             */
            $scope.getTasks = function () {
                tasksService.getTasks().then(function (response) {
                    if (response) {
                        $scope.tasksData = response.data;
                        // $log.info($scope.tasksData);
                    }
                });
            };

            $scope.getTasks();

            /**
             * Смена года
             */
            $scope.changeYear = function () {
                // $scope.counter++;
                alert('New year');
                $scope.getTasks()
            };

            /**
             * получаю что выбрано кликом по строке таблицы
             * @param val
             * @returns {boolean}
             */
            $scope.isSelected = function (val) {
                return $scope.selectedRow == val;
            };

            /**
             * Действие на клик по строке
             * @param index
             * @param rowObj
             */
            $scope.selectRow = function (index, rowObj) {
                $scope.selectedRow = rowObj;
            };

            $scope.selectedTaskDetailInfo = function (val) {

                $state.go('tasks.detail', {'type': val});

                // alert(val);
            };

            $scope.things = ['cathode', 'house', 'chomp'];
            $scope.search = "ro";

        }
    ]);


