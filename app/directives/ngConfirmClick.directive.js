/**
 * Created by ДубенскийАА on 21.07.2015.
 * confirm через модальное окно
 */

angular.module('asDrApp.ngConfirmClick.directive', [])

    .directive('ngConfirmClick', ['$uibModal', '$log',
        function ($uibModal, $log) {

            var ModalInstanceCtrl = function ($scope, $uibModalInstance) {
                $scope.ok = function () {
                    $uibModalInstance.close();
                };
                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            };

            return {
                restrict: 'EA',
                link: function (scope, element, attr) {
                    // console.log(attr);

                    var msg = attr.ngConfirmClick || "Вы уверены?";
                    var detailMsg = attr.detailMessage || "";
                    var clickAction = attr.confirmedClick;

                    var modalHtml = '<div class="modal-content"><div class="modal-header" style="margin-bottom: -18px;">' +
                        '<h4 class="modal-title" style="text-align: center">' + msg + '</h4></div>';
                    if (detailMsg != '') modalHtml += '<div class="modal-body"><p style="text-align: justify; margin: 0 0 0 !important;">' + detailMsg + '</p></div>';
                    modalHtml += '<div class="modal-footer" style="margin-top: -20px;"><button class="btn btn-default" ng-click="ok()">Да</button>' +
                        '<button class="btn btn-default" ng-click="cancel()">Нет</button></div></div>';

                    element.bind('click', function (event) {
                        var modalInstance = $uibModal.open({
                            animation: true,
                            size: 'sm',
                            backdrop: 'static',
                            template: modalHtml,
                            controller: ModalInstanceCtrl
                        });
                        modalInstance.result.then(function () {
                            scope.$eval(clickAction)
                        }, function () {
                            //отмена
                            // $log.info('отмена: ' + new Date());
                        });
                    });

                    scope.$on('$destroy', function () {
                        element.unbind('click');
                    });
                }
            };
        }]);


