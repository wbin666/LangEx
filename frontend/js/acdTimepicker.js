/**
 * Created by alex on 5/13/16.
 */
angular.module('acdTimepicker', ['ngAnimate', 'ui.bootstrap', 'ngMessages']);

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

        if(isHHMMvalid()) {
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

    function isHHMMvalid(){
        /*
         var result = false;
         if(!($scope.baseTimeModel ===undefine || $scope.baseTimeModel===null)){
         if($scope.baseTimeModel.$valid) {
         result=true;
         }
         }

         return result;
         */
        return true;
    }

    function getInputHH(){
        return $scope.baseTimeModel.substr(0,2);
    }

    function getInputMM(){
        return $scope.baseTimeModel.substr(3,2);
    }
}]);

angular.module('acdTimepicker').directive('acdTimepicker', function(){
    return {
        restrict: 'E',
        scope: {
            baseTimeModel: '=',
            baseLabelText: '@'
        },
        templateUrl: 'html/acdTimepicker.html',
        replace: 'true',
        bindToController: 'true',
        controller: 'timepickerCtrl as baseCtrl'
    };
});