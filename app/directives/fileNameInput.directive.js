/**
 * Created by DubenskiyAA on 01.06.2016.
 */

"use strict";

angular.module('asDrApp.fileNameInput.directive', [])

    .directive('fileNameInput', ['$timeout', function ($timeout) {
        return {
            restrict: "EA",
            scope: false,
            link: function ($scope, element, attrs) {
                element.on('change', function (e) {
                    var files = e.target.files === undefined ? (e.target && e.target.value ? [{name: e.target.value.replace(/^.+\\/, '')}] : []) : e.target.files;

                    e.stopPropagation();

                    if (files.length) {
                        var file = files[0];
                        //ввел времено. нужно сделать универсильно!
                        // $scope.document.fileName = file.name;
                        // console.warn($scope.getFileName );
                        if (~file.name.indexOf(".txt")) {
                            // console.log('txt');
                            $scope.fileTypeIcon = "fa fa-file-text-o";
                        } else if (~file.name.indexOf(".xls") || ~file.name.indexOf(".xlsx")) {
                            // console.log('excel');
                            $scope.fileTypeIcon = "fa fa-file-excel-o";
                        } else if (~file.name.indexOf(".doc") || ~file.name.indexOf(".docx")) {
                            $scope.fileTypeIcon = "fa fa-file-word-o";
                        } else if (~file.name.indexOf(".pdf")) {
                            $scope.fileTypeIcon = "fa fa-file-pdf-o";
                        } else if (~file.name.indexOf(".jpg")) {
                            $scope.fileTypeIcon = "fa fa-file-image-o";
                        } else {
                            $scope.fileTypeIcon = "fa fa-file-o";
                        }
                    }
                    $scope.$apply();
                });
            }
        }
    }]);
