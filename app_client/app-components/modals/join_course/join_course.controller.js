/* jshint node: true */


var app = angular.module('app');

app.controller('Join.Course.Controller', function($scope, $element, $localStorage, RESTService) {

    $scope.section = null;
    $scope.error = null;
    $scope.loading = false;

    $scope.join = function() {
        $scope.error = null;
        $scope.loading = true;
        RESTService.JoinCourse({
            section_key: $scope.section
        }, finishJoinCourse);
    };

    function finishJoinCourse(info) {
        if (!info.success) {
            $scope.loading = false;
            $scope.error = info.message;
            return;
        }
        $scope.loading = false;
        $element.modal('hide');
    }
});
