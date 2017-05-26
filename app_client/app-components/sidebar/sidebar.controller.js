/* jshint node: true */


var app = angular.module('app');

app.controller('Sidebar.Controller', function($scope, $state, $stateParams, $rootScope, $localStorage, UserService) {

    $scope.state = null;
    $rootScope.$stateParams = $stateParams;

    $scope.createCourse = function() {
        UserService.ShowCreateCourse();
    };

    $scope.createLecture = function() {
        UserService.ShowCreateLecture();
    };

    $scope.joinCourse = function() {
        UserService.ShowJoinCourse();
    };

    $scope.$watch(function() {
        return $state.current.url;
    }, function(newVal, oldVal) {
        if (newVal !== undefined) {
            $scope.state = newVal;
            if ($stateParams.selectedCourse !== undefined) {
                $scope.instructor = $localStorage.courses[$stateParams.selectedCourse].instructor;
                $scope.course = $localStorage.courses[$stateParams.selectedCourse];
            }
        }
    });
});
