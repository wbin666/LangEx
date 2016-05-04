/**
 * Created by alex on 4/29/16.
 */
angular.module('plunker', ['ui.bootstrap','ngAnimate'])
    .controller("uiDemoCtrl",["$scope", function ($scope) {

        $scope.mytime = new Date();
        $scope.displayTime = 'n/a';

        $scope.$watch('mytime', function(newValue, oldValue) {
            var hour = $scope.mytime.getHours()-($scope.mytime.getHours() >= 12 ? 12 : 0),
                hour = hour<10 ? '0'+hour : hour,
                minutes = ($scope.mytime.getMinutes()<10 ? '0' :'') + $scope.mytime.getMinutes(),
                period = $scope.mytime.getHours() >= 12 ? 'PM' : 'AM';
            $scope.displayTime = hour+':'+minutes+' '+period
        })

        $scope.hstep = 1;
        $scope.mstep = 15;

        $scope.options = {
            hstep: [1, 2, 3],
            mstep: [1, 5, 10, 15, 25, 30]
        };


        $scope.ismeridian = true;
        $scope.toggleMode = function() {
            $scope.ismeridian = ! $scope.ismeridian;
        };


    }]); 