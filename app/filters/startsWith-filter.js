/**
 * Created by DubenskiyAA on 13.07.2016.
 */

angular.module('asPkpApp.filters.startsWith', [])

    .filter('startsWith', function() {
        return function(array, search) {

            console.log(array);
            console.log(search);

            var matches = [];
            for(var i = 0; i < array.length; i++) {
                if (array[i].indexOf(search) === 0 &&
                    search.length < array[i].length) {
                    matches.push(array[i]);
                }
            }
            return matches;
        };
    });
