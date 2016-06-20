/**
 * Created by alex on 5/12/16.
 */
angular.module('acdTimepicker', ['ngAnimate', 'ui.bootstrap', 'ngMessages']);

angular.module('acdTimepicker').controller('mainCtrl', ['$scope', function($scope){
    $scope.startTimeLabel="Start time";
    $scope.startTimeModel= "05:30";
    $scope.endTimeLabel="End time";
    $scope.endTimeModel="18:30";
}]);

angular.module('acdTimepicker').controller('timepickerCtrl', ['$scope', '$filter', function ($scope, $filter) {
    initTimeCtrl();

    $scope.updateTimepicker = function() {
        var d = new Date();
        d.setHours(getInputHH());
        d.setMinutes(getInputMM());
        $scope.baseTime4Picker = d;
    };

    $scope.changed = function () {
        updateInputField();
    };


    function initTimeCtrl() {
        //$scope.baseLabelText="Base Sample Time";
        //$scope.baseTimeModel="11:30";

        var d = new Date();

        if(isHHMMvalid($scope.baseTimeModel)) {
            d.setHours(getInputHH());
            d.setMinutes(getInputMM());
            $scope.baseTime4Picker = d;
        }else{
            d.setMinutes(0);
            $scope.baseTime4Picker = d;
            updateInputField();
        }
    }

    function updateInputField() {
        $scope.baseTimeModel=$filter('date')($scope.baseTime4Picker, 'HH:mm');
    }

    function getInputHH(){
        return $scope.baseTimeModel.substr(0,2);
    }

    function getInputMM(){
        return $scope.baseTimeModel.substr(3,2);
    }

    function isHHMMvalid(timeStr) {
        if(!isUndefinedOrNull(timeStr)){
            var timeHHMMPattern = "^(0[0-9]|1[0-9]|2[0-3]):(00|15|30|45)$";
            var timeHHMMReg = new RegExp(timeHHMMPattern);

            if(timeHHMMReg.test(timeStr)) {
                return true;
            }
        }
        return false
    }

    function isUndefinedOrNull(val) {
        return angular.isUndefined(val) || val === null;
    }

}]);

angular.module('acdTimepicker').directive('acdTimepicker', function(){
    return {
        restrict: 'E',
        scope: {
            baseTimeModel: '=',
            baseLabelText: '@'
        },
        templateUrl: 'acdTimepicker.html',
        replace: 'true',
        bindToController: 'true',
        controller: 'timepickerCtrl as baseCtrl'
    };
});