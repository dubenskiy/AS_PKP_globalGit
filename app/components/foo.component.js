/**
 * Created by DubenskiyAA on 07.11.2016.
 */

"use strict";

angular.module('asPkpApp.foo.component', [])

// This component can be used like: <foo></foo>
    .component('foo', {
        bindings: {
            // one-way input binding, e.g.,
            // <foo foo-data="$ctrl.someFoo"></foo>
            foo: '<fooData'
        },
        // controllerAs: $ctrl
        template: `
    <h1></hi>
    <i></i>
    
    <button ng-click="$ctrl.clickHandler()">Do something</button>

    <ul>
      <li ng-repeat="bar in $ctrl.foo.data">
        <a ui-sref=".bar({ barId: $ctrl.bar.id })" ng-class="{ active: bar.name }">
               {{bar.type}}
        </a>
        
        <button ng-click="$ctrl.bar.active = !$ctrl.bar.active">
                {{bar.executor}}
        </button>
      </li>
    </ul>
    
    <br>
    
 
    <input ng-model="$ctrl.data" type="text">
    
    <div ui-view></div>
  `,
        controller: function () {
            this.clickHandler = function () {
                // return SomeService.someFn();
                alert('the house!');
            };

            this.data = 123;
            this.originalData = angular.copy(this.data);

            this.uiCanExit = function() {
                if (!angular.equals(this.data, this.originalData)) {
                    // Note: This could also return a Promise and request async
                    // confirmation using something like ui-bootstrap $modal
                    return window.confirm("Data has changed.  Exit anyway and lose changes?");
                }
            }



        }
    });