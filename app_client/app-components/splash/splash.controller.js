/* jshint node: true */


var app = angular.module('app');

app.controller('Splash.Controller', function($scope, UserService) {

    $scope.login = function() {
        UserService.ShowLogin();
    };

});
