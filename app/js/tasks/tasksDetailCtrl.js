/**
 * Created by DubenskiyAA on 13.07.2016.
 */

angular.module('asPkpApp.tasksDetailCtrl', [])
    .controller('TasksDetailCtrl', ['$scope', '$log', '$rootScope', '$stateParams', '$state', '$cookies', '$uibModal', 'tasksService', 'Notification',
        function ($scope, $log, $rootScope, $stateParams, $state, $cookies, $uibModal, tasksService, Notification) {

            $scope.tasksDetailObj = {};
            $scope.model = $scope.tasksDetailObj;

            /**
             * Подготовка к оправке файла на сервер
             * @type {{url: string, type: string, dataType: string, mimeType: string, cache: boolean, contentType: boolean, processData: boolean, data: {typeRow: (number|string|string|*|string)}, beforeSend: options.beforeSend, success: options.success, complete: options.complete, error: options.error}}
             */
            var options = {
                url: '',
                type: 'POST',
                dataType: 'json',
                mimeType: "multipart/form-data",
                cache: false,
                contentType: false,
                processData: false,
                data: {},
                beforeSend: function () {
                    $rootScope.loading++;
                },
                success: function (response) {
                    if (response.status == 0) {
                        $scope.$apply(function () {
                                if (response.targetObject) {
                                    $scope.downloadedData = response.targetObject;
                                }
                            }
                        );
                    } else {
                        $log.error('ошибка в секции success');
                        $("#formUploadFile").find('.fileinput-filename').text('');
                        $("#fileinputNew").addClass('fileinput-new').removeClass('fileinput-exists');
                        Notification.error({
                            message: response.messageInfo,
                            templateUrl: "pages/template/customNotification.tpl.html",
                            delay: 10000,
                            closeOnClick: true,
                            positionX: 'center',
                            positionY: 'top'
                        });
                    }
                },
                complete: function () {
                    $rootScope.loading--;
                    $scope.$apply();
                },
                error: function (response) {
                    $log.error('ошибка в секции error');
                    $("#formUploadFile").find('.fileinput-filename').text('');
                    $("#fileinputNew").addClass('fileinput-new').removeClass('fileinput-exists');
                    Notification.error({
                        message: response.messageInfo,
                        templateUrl: "pages/template/customNotification.tpl.html",
                        delay: 10000,
                        closeOnClick: true,
                        positionX: 'center',
                        positionY: 'top'
                    });
                }
            };

            /**
             * отправить файл на сервер c диапазона
             */
            $scope.uploadFile = function () {
                // $log.info(options);
                $scope.downloadedData = {};
                options.data.typeRow = $stateParams.id;
                options.url = 'application/addListDetails.htm';
                $("#formUploadFile").ajaxForm(options).submit();

            };

            // ************************************************************************* //

            /**
             * Загрузка данных
             */
            $scope.tasksDetailObj.getListFile = function () {
                tasksService.getListFile().then(function (response) {
                    if (response) {
                        $scope.tasksDetailObj.listFile = response;
                    }
                });
            };

            // $scope.tasksDetailObj.getListDistribution = function () {
            //     tasksService.getListDistribution().then(function (response) {
            //         if (response) {
            //             $scope.tasksDetailObj.listDistribution = response.data;
            //             // $log.info($scope.tasksData);
            //         }
            //     });
            // };

            $scope.tasksDetailObj.getListUpload3345 = function () {
                tasksService.getListUpload3345().then(function (response) {
                    if (response) {
                        $scope.tasksDetailObj.listUpload3345 = response.data;
                        // $log.info($scope.tasksData);
                    }
                });
            };

            if ($stateParams.type === 'SendDifferencesFiles' || $stateParams.type === 'SendPartDbf') {
                $scope.tasksDetailObj.getListFile();
            } else if ($stateParams.type === 'ControlUpload3345') {
                $scope.tasksDetailObj.getListUpload3345();
            }



            /**
             * Действие на клик по строке
             * @param index
             * @param rowObj
             */
            $scope.tasksDetailObj.setClickedRow = function (index, rowObj) {
                $scope.tasksDetailObj.selectedIndex = index;
                $scope.tasksDetailObj.selectedRow = rowObj;
                $scope.tasksDetailObj.disabledToolbarButtons = angular.isNumber($scope.tasksDetailObj.selectedIndex);
                // $log.info($scope.disabledButtons);
            };

            /**
             * Удалить строку
             * @param arr
             */
            $scope.tasksDetailObj.removeRow = function (arr) {
                arr.splice($scope.tasksDetailObj.selectedIndex, 1);
                $scope.tasksDetailObj.setClickedRow(null);
            };

            /**
             * Добавить новую запись в рассылке
             */
            // $scope.tasksDetailObj.saveNewDestination = function (arr) {
            //     arr.push($scope.tasksDetailObj.destination);
            //     $scope.tasksDetailObj.destination = null;
            //     $scope.tasksDetailObj.isAddOrEditDestination = false;
            // };

            /**
             * Изменить строку в рассылке
             */
            // $scope.tasksDetailObj.saveEditDestination = function (arr) {
            //     angular.forEach(arr, function (val, index) {
            //         if (val === $scope.tasksDetailObj.selectedRow) {
            //             arr[index] = $scope.tasksDetailObj.destination
            //         }
            //     });
            //     $scope.tasksDetailObj.destination = null;
            //     $scope.tasksDetailObj.isAddOrEditDestination = false;
            //     $scope.tasksDetailObj.setClickedRow(null);
            // };

            /**
             * Выполнить рассылку
             * @param val
             */
            // $scope.tasksDetailObj.distribution = function (val) {
            //     alert(val + ' || ' + $stateParams.type);
            // };

            // ************************************************************************* //

            /**
             * Станции
             * @param val
             * @returns {*}
             */
            $scope.tasksDetailObj.getRoad = function (val) {
                return tasksService.getRoad(val);
            };

            // ************************************************************************* //

            /**
             * Расхождения устранены
             */
            $scope.tasksDetailObj.differencesEliminated = function () {
                alert('ho-ho')
            };

            /**
             * Обновить расхождения
             */
            $scope.tasksDetailObj.refreshEliminated = function () {
                $scope.tasksDetailObj.getListUpload3345();
            }  ;

            /**
             * test
             */
            $scope.pushMe = function () {
                var str = 'Тест это просто всего лишь тест';
                Notification.error({
                    message: 'Данные успешно сохранены',
                    templateUrl: "pages/template/customNotification.tpl.html",
                    delay: 10000,
                    closeOnClick: true,
                    positionX: 'center',
                    positionY: 'top'
                });
            };

            // $log.info($scope.tasksDetailObj);

        }
    ]);



