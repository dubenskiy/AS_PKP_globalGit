/**
 * Created by DubenskiyAA on 26.08.2016.
 */

"use strict";

angular.module('asPkpApp.distribution.service', [])

    .factory('DistributionService', function ($resource) {

        return $resource('http://10.200.11.169:8085/distributions/:id', {id: '@id'}, {
            update: {method: 'PUT',  isArray: true}
        });
        // return data;
    });
