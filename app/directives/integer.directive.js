/**
 * Created by DubenskiyAA on 26.02.2016.
 */

"use strict";

var INTEGER_REGEXP = /^\-?\d+$/;



angular.module('asDrApp.integer.directive', [])

    .directive('integer', function () {
        return {
            require: 'ngModel',
            scope: {
                regexp: '=regexp'
            },
            link: function ($scope, elm, attrs, ctrl) {

                ctrl.$validators.integer = function (modelValue, viewValue) {

                    // console.log($scope.regexp);

                    if (ctrl.$isEmpty(modelValue)) {
                        // consider empty models to be valid
                        return true;
                    }

                    if (INTEGER_REGEXP.test(viewValue)) {
                        // it is valid
                        return true;
                    }

                    // it is invalid
                    return false;
                };
            }
        };
    });
