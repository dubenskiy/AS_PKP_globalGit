/**
 * Created by DubenskiyAA on 05.07.2016.
 */

"use strict";

angular.module('asPkpApp.censusProcess.service', [])

    // .factory('UserService', function ($resource) {
    //     var data = $resource('http://jsonplaceholder.typicode.com/users/:user', {user: '@user'}, {
    //         update: {
    //             method: 'PUT'
    //         }
    //     });
    //     return data;
    // })

    // A RESTful factory for retrieving contacts from 'contacts.json'
    .factory('censusProcessService', ['$http', function ($http) {
        return {

            /**
             * listFile
             * @returns {*}
             */
            getListFile: function () {
                return $http.get('../json/listFile.json').then(function (response) {
                    return response.data;
                });
            },

            /**
             * getListDistribution
             * @returns {*}
             */
            getListDistributionProcess: function () {
                return $http.get('../json/distributionListProcess.json').then(function (response) {
                    return response.data;
                });
            },

            /**
             * prp_mainColumn
             */
            getPrpMainColumns: function () {
                return $http.get('../json/prp_mainColumn.json').then(function (response) {
                    return response.data;
                });
            },

            /**
             * prp_mainData
             */
            getPrpMainData: function () {
                return $http.get('../json/prp_mainData.json').then(function (response) {
                    return response.data;
                });
            },

            /**
             * getPrpIbmuColumns
             */
            getPrpIbmuColumns: function () {
                return $http.get('../json/prp_ibmuColumn.json').then(function (response) {
                    return response.data;
                });
            },

            /**
             * getPrpIbmuData
             */
            getPrpIbmuData: function () {
                return $http.get('../json/prp_ibmuData.json').then(function (response) {
                    return response.data;
                });
            },

            /**
             * getXML
             */
            getXML: function (name) {
                return $http.get("../xml/" + name + ".xml",
                    {
                        transformResponse: function (dataXML) {
                            var x2js = new X2JS();
                            var dataJSON = x2js.xml_str2json(dataXML);
                            return dataJSON;
                        }
                    }).then(function (response) {
                    return response.data;
                });
            }

        }
    }]);

