"use strict";

angular.module('asPkpApp.tasks.service', [])

// A RESTful factory for retrieving contacts from 'contacts.json'
    .factory('tasksService', ['$http', '$q', function ($http, $q) {

        //var categories = $http.get('json/categories.json').then(function (resp) {
        //    return resp.data.categories;
        //});
        //
        // var tasksService = {};
        // var defer = $q.defer();
        //
        //detailsRangeService.all = function () {
        //    return categories;
        //};

        /**
         * Дорога
         * @param val - Код или название вагоноремонтного предприятия
         * @returns {*}
         */
        this.getRoad = function (val) {
            return $http.get('application/getRoad.htm', {
                params: {
                    value: val
                }
            }).then(function (response) {
                return response.data.targetObject.map(function (item) {
                    return item;
                });
            });
        };

        /**
         * Список тасков
         * @returns {*}
         */
        this.getTasks = function () {
            var promise = $http({
                method: 'GET',
                url: '../json/tasks.json'
            })
                .success(function (data, status, headers, config) {
                    return data;
                })
                .error(function (data, status, headers, config) {
                    return {"status": false};
                });

            return promise;
        };

        /**
         * getFoo
         * @param fooId
         */
        this.getFoo = function (fooId) {
            // alert(fooId);
            let promise = $http({
                method: 'GET',
                url: '../json/tasks.json'
            })
                .success(function (data, status, headers, config) {
                    return data;
                })
                .error(function (data, status, headers, config) {
                    return {"status": false};
                });

            return promise;
        };

        /**
         * listFile
         * @returns {*}
         */
        this.getListFile = function () {
            return $http.get('../json/listFile.json').then(function (response) {

                var time = response.config.responseTimestamp - response.config.requestTimestamp;
                console.log('The request took ' + (time / 1000) + ' seconds.');

                return response.data;
            });
        };

        /**
         * getListDistribution
         * @returns {*}
         */
        this.getListDistribution = function () {
            var promise = $http({
                method: 'GET',
                url: '../json/distributionList.json'
            })
                .success(function (data, status, headers, config) {
                    return data;
                })
                .error(function (data, status, headers, config) {
                    return {"status": false};
                });

            return promise;
        };

        /**
         * getListUpload3345
         * @returns {*}
         */
        this.getListUpload3345 = function () {
            var promise = $http({
                method: 'GET',
                url: '../json/upload3345.json'
            })
                .success(function (data, status, headers, config) {
                    return data;
                })
                .error(function (data, status, headers, config) {
                    return {"status": false};
                });

            return promise;
        };


        return this;
    }]);
