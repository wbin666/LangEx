var app = angular.module('plunker', []);

app.controller('MainCtrl', function($scope) {
    $scope.model = { name: 'World' };
    $scope.name = "Felipe";
});

app.directive('myDirective', function($compile) {
    return {
        restrict: 'E',
        scope: {
            myDirectiveVar: '=',
            //bindAttr: '='
        },
        template: '<div class="some">' +
        '<input ng-model="myDirectiveVar"></div>',
        replace: true,
        //require: 'ngModel',
        link: function($scope, elem, attr, ctrl) {
            console.debug($scope);
            //var textField = $('input', elem).attr('ng-model', 'myDirectiveVar');
            // $compile(textField)($scope.$parent);
        }
    };
});