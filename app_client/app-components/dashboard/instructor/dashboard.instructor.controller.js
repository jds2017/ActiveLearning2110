/* jshint node: true */


var app = angular.module('app');

app.controller('Instructor.Dashboard.Controller', function($scope, $localStorage, UserService) {

    $scope.createCourse = function() {
        UserService.ShowCreateCourse();
    };

});
