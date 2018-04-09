/**
 * Created by DubenskiyAA on 26.02.2016.
 */

"use strict";

angular.module('asPkpApp.counter.component', [])

    .component('counter', {
        bindings: {
            count: '='
        },

        controller: counterCtrl,
        template: [
            '<div class="todo">',
            '<input type="text" ng-model="$ctrl.count">',
            '<button type="button" ng-click="$ctrl.decrement();">-</button>',
            '<button type="button" ng-click="$ctrl.increment();">+</button>',
            '</div>'
        ].join('')
    });

function counterCtrl() {

    let vm = this;

    function increment() {
        vm.count++;
    }

    function decrement() {
        vm.count--;
    }

    vm.increment = increment;
    vm.decrement = decrement;

    // for (let i = 0; i < 10; i++) {
    //      console.log(i);
    // }

}

// angular.module('asPkpApp.counter.component', [])
//
//     .component('counter', {
//         bindings: {
//             'data': '<'
//         },
//
//         controller: counterCtrl,
//         template: [
//             '<input ng-model="$ctrl.data" type="text">'
//
//         ].join('')
//     });
//
// function counterCtrl() {
//
//     this.originalData = angular.copy(this.data);
//     console.log(this.originalData);
//
//     console.log(!angular.equals(this.data, this.originalData));
//
//     this.uiCanExit = function() {
//
//         if (!angular.equals(this.data, this.originalData)) {
//             // Note: This could also return a Promise and request async
//             // confirmation using something like ui-bootstrap $modal
//             return window.confirm("Data has changed.  Exit anyway and lose changes?");
//         }
//     }
//
// }