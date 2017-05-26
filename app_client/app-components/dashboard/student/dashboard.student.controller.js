/* jshint node: true */


var app = angular.module('app');

app.controller('Student.Dashboard.Controller', function($scope, $localStorage, UserService) {

    $scope.joinCourse = function() {
        UserService.ShowJoinCourse();
    };

    console.log($localStorage.courses);
});
