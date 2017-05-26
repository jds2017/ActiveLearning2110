/* jshint node: true */


var app = angular.module('app');

app.controller('Question.Preview.Controller', function($scope, $element, title, body, tags, choices) {

    $scope.title = title;
    $scope.body = body;
    $scope.choices = choices;
    $scope.tags = tags;

});
