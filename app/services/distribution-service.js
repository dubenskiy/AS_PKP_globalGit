/**
 * Created by DubenskiyAA on 26.08.2016.
 */

"use strict";

angular.module('asPkpApp.distribution.service', [])

    .factory('DistributionService', function ($resource, $http) {


        // $resource('http://10.200.3.92:8080/activiti-rest/service/repository/models', {}, {headers: { 'Authorization': 'Basic a2VybWl0Omtlcm1pdA==' }});


        // $resource('http://10.200.3.92:8080/activiti-rest/service/repository/models', {}, {
        //     getUp: {
        //         method: 'GET',
        //         headers: { 'Authorization': 'Basic a2VybWl0Omtlcm1pdA==' }
        //     }
        // });


        return {
            getListDistribution: function () {
                return $http.get('http://10.200.3.92:8087/test'
                    // {
                    // headers: {
                    //     'Authorization': 'Basic a2VybWl0Omtlcm1pdA=='
                    //
                    // }
                // }
                ).then(function (response) {
                    return response.data;
                });
            }
        };
        // return data;
    });
