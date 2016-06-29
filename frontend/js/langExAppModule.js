/**
 * Created by alex on 5/12/16.
 */
(function() {
    angular.module('langExApp', ['ngRoute', 'openAvailTime', 'reviewAvailTime'])
        .config(langExAppRouter)
        .controller('LangExController', LangExController);

    langExAppRouter.$inject= ['$routeProvider', '$locationProvider'];  //??
    function langExAppRouter($routeProvider, $locationProvider) {
        $routeProvider
            .when('/myCalendar', {
                templateUrl: '/html/showAvailTimeCalendar.html',
                controller: 'CalendarCtrl'
            })
            .when('/publishAvailTime', {
                templateUrl: '/html/openAvailTime.html',
                controller: 'OpenAvailTimeCtrl'
            })
            .otherwise({
                redirectTo: '/index.html'
            });

        // configure html5 to get links working on jsfiddle
        $locationProvider.html5Mode(true);
    }

    //Todo: it doesn't show the information
    LangExController.$inject =['$scope', '$route', '$routeParams', '$location'];
    function LangExController($scope, $route, $routeParams, $location){
        $scope.route = $route;
        $scope.routeParams = $routeParams;
        $scope.location = $location;

    }
})();