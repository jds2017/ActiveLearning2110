/* jshint node: true */


var app = angular.module('app');

app.controller('Admin.Keys.Controller', function($scope, $localStorage, $state, RESTService, NgTableParams, ngNotify) {
    $scope.keyLoading = false;
    $scope.generatedKey = null;

    var cnts = [];

    if ($localStorage.keys.length > 5) {
        cnts = [5, 10, 15];
    }

    $scope.tableParams = new NgTableParams({
        count: 10
    }, {
        counts: cnts,
        dataset: $localStorage.keys
    });

    $scope.getInstructorKey = function() {
        $scope.keyLoading = true;
        RESTService.GenerateInstructorKey(postGetKey);
    };

    $scope.copySuccess = function() {
        ngNotify.set('Instructor key copied to clipboard', 'success');
    };

    function postGetKey(info) {
        if (!failed(info)) {
            $scope.generatedKey = info.key;
            $scope.keyLoading = false;
            $scope.tableParams.settings().dataset = $localStorage.keys;
            $scope.tableParams.reload();
        }
    }

    function failed(info) {
        if (!info.success) {
            $scope.keyLoading = false;
            $scope.error = info.message;
            return true;
        } else {
            return false;
        }
    }
});
