/**
 * Created by alex on 5/12/16.
 */
angular.module('langExApp', ['acdTimepicker']);

angular.module('langExApp').controller('mainCtrl', ['$scope', function($scope){
    $scope.startTimeLabel="Start time";
    $scope.startTimeModel= "05:30";
    $scope.endTimeLabel="End time";
    $scope.endTimeModel="18:30";
}]);
