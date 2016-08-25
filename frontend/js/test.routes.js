/**
 * Created by alex on 8/23/16.
 */
(function() {
    angular.module('test')
        .config(testRouter);

    testRouter.$inject= ['$routeProvider', '$locationProvider'];
    function testRouter($routeProvider, $locationProvider) {
        $routeProvider
            .when('/test', {
                templateUrl: '/html/test.html',
            });

        // configure html5 to get links working on jsfiddle
        $locationProvider.html5Mode(true);
    }
})();