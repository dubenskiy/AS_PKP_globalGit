/**
 * Created by DubenskiyAA on 22.06.2016.
 */

"use strict";

angular.module('asPkpApp.detailInfoFromRowModalCtrl', [])

    .controller('DetailInfoFromRowModalCtrl', function ($scope, $rootScope, $uibModalInstance, $log, tasksService,  id) {

        // $scope.stateParams = stateParams;
        // $scope.document = {};



        // tasksService.getFileInfo(id).then(function (response) {
        //     if (response) {
        //         if (response.data.status == 0) {
        //             // $log.info(response.data.targetObject);
        //             $scope.data = response.data.targetObject;
        //         } else {
        //             $log.error(response.data.messageInfo);
        //             Notification.error({
        //                 message: '<div class="alert-wrap in"><div class="alert alert-danger" style="box-shadow: none !important;"><div class="media"><div class="media-left"><span class="icon-wrap icon-wrap-xs icon-circle alert-icon"><i class="fa fa-times fa-lg"></i></span></div><div class="media-body"><p class="alert-message" style="text-align: justify">Ошибка на стороне сервера! ' + response.data.messageInfo + '</p></div></div></div></div>',
        //                 delay: 10000,
        //                 closeOnClick: true,
        //                 positionX: 'center',
        //                 positionY: 'top'
        //             });
        //         }
        //     }
        // });

        $scope.ok = function () {
            $uibModalInstance.close();
        };



    });
