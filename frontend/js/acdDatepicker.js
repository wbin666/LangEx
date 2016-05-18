/**
 * Created by alex on 5/14/16.
 */
angular.module('acdDatepicker', ['ngAnimate', 'ui.bootstrap', 'ngMessages']);

angular.module('acdDatepicker').directive('acdDatepicker', function(){
    return {
        restrict: 'E',
        scope: {
            baseDateModel: '=',
            baseLabelText: '@'
        },
        templateUrl: 'html/acdDatepicker.html',
        replace: 'true',
        bindToController: 'true',
        controller: 'datepickerCtrl as baseDateCtrl'
    };
});

// //just for test purpose, mainCtrl is used to feed the test data
// angular.module('acdDatepicker').controller('mainCtrl', ['$scope', function($scope){
//      $scope.startDateLabel="Starting";
//     //$scope.startDateModel = new Date("2016-06-16");
//     //$scope.startDateModel;
//     $scope.startDateModel = null;
//
//     $scope.endDateLabel="To";
//      $scope.endDateModel= new Date("2016-08-18");
// }]);

angular.module('acdDatepicker').controller('datepickerCtrl', function ($scope) {
    var numOfDaysLater= 3;   // hard code as default value if no setting
    function setNumOfDaysLater(daysOffSet) {
        numOfDaysLater=daysOffSet;
    }

    function firstAllowedDate() {
        var firstAllowedDate = new Date();
        firstAllowedDate.setDate(firstAllowedDate.getDate()+ numOfDaysLater);

        return firstAllowedDate;
    }

    var firstDate=firstAllowedDate();
    if($scope.baseDateModel=== undefined || $scope.baseDateModel=== null || $scope.baseDateModel < firstDate) {
        //to define the first allowed date to be opened,  BTW, by default, it's 3 days later of current date
        $scope.baseDateModel = firstDate;
    }

    // $scope.inlineOptions = {
    //     customClass: getDayClass,
    //     minDate: firstDate,
    //     showWeeks: true
    // };

    $scope.dateOptions = {
        dateDisabled: disabled,
        formatYear: 'yyyy',
        maxDate: new Date(2099, 12, 31),   // hard code for syncing with the date pattern applied in template
        minDate: firstDate,
        //initDate: firstDate,
        startingDay: 1

    };



    function disabled(data) {
        var date = data.date,
            mode = data.mode;

        //Disable weekend selection
        //return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);

        //var compareDate=firstAllowedDate();
        //return mode === 'day' && (date.getMonth() <= compareDate.getMonth() && date.getDate() < compareDate.getDate())

        return mode === 'day' && (date.getMonth() <= firstDate.getMonth() && date.getDate() < firstDate.getDate())
    }

    // $scope.toggleMin = function() {
    //     $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
    //     $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    // };
    //
    // $scope.toggleMin();


    $scope.open2 = function() {
        $scope.popup2.opened = true;
    };

    // $scope.setDate = function(year, month, day) {
    //     $scope.baseDateModel = new Date(year, month, day);
    // };

    $scope.popup2 = {
        opened: false
    };

    // var tomorrow = new Date();
    // tomorrow.setDate(tomorrow.getDate() + 1);
    // var afterTomorrow = new Date();
    // afterTomorrow.setDate(tomorrow.getDate() + 1);
    // $scope.events = [
    //     {
    //         date: tomorrow,
    //         status: 'full'
    //     },
    //     {
    //         date: afterTomorrow,
    //         status: 'partially'
    //     }
    // ];
    //
    // function getDayClass(data) {
    //     var date = data.date,
    //         mode = data.mode;
    //     if (mode === 'day') {
    //         var dayToCheck = new Date(date).setHours(0,0,0,0);
    //
    //         for (var i = 0; i < $scope.events.length; i++) {
    //             var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);
    //
    //             if (dayToCheck === currentDay) {
    //                 return $scope.events[i].status;
    //             }
    //         }
    //     }
    //
    //     return '';
    // }
});