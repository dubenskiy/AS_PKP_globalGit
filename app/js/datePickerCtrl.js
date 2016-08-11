/**
 * Created by ДубенскийАА on 21.05.2015.
 */

angular.module('asDrApp.datePickerCtrl', [])

    .controller('DatePickerCtrl', ['$scope', function ($scope) {

        // $scope.nowDate = new Date().getTime();
        $scope.tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
        // $scope.minDate = $scope.nowDate - 50 * 365 * 24 * 60 * 60 * 1000;

        $scope.dateOptions = {

            formatYear: 'yy',
            maxDate: new Date().getTime(),
            minDate: new Date().getTime() - 50 * 365 * 24 * 60 * 60 * 1000,
            startingDay: 1
        };

        $scope.disabled = function (date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };

        $scope.open = function ($event) {
            // два календаря одновременно
            // $event.preventDefault();
            // $event.stopPropagation();
            // alert(3);
            $scope.opened = true;
        };

    }]);

