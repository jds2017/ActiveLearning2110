/* jshint node: true */


var app = angular.module('app');

app.controller('Admin.Dashboard.Controller', function($scope, $localStorage, $state, $timeout, RESTService, NgTableParams) {

    $scope.loading = false;

    $scope.changes = {};

    var cnts = [];

    if ($localStorage.users.length > 5) {
        cnts = [5, 10, 15];
    }

    $scope.tableParams = new NgTableParams({
        count: 10,
        sorting: {
            username: "asc"
        }
    }, {
        counts: cnts,
        dataset: $localStorage.users
    });

    $scope.roles = [{
        id: 1,
        name: "instructor"
    }, {
        id: 2,
        name: "student"
    }, {
        id: 3,
        name: "admin"
    }];

    $scope.initUser = function(user, index) {
        var info = {
            role: user.role,
            active: !user.deactivated,
            id: user._id,
            commited: false,
            error: false,
            index: index,
            changed_role: false,
            changed_active: false
        };
        $scope.changes[user.username] = info;
    };

    $scope.commitChanges = function() {
        $scope.loading = true;
        var changed = false;
        for (var key in $scope.changes) {
            var info = {
                id: $scope.changes[key].id,
                key: key,
                new_role: $scope.changes[key].role
            };
            if ($scope.changes[key].changed_role === true) {
                RESTService.UpdateUserRole(info, finishChange);
                changed = true;
            }
            if ($scope.changes[key].changed_active === true) {
                RESTService.UpdateUserDeactivation(info, finishChange);
                changed = true;
            }
        }
        if (!changed) {
            $scope.loading = false;
        }
    };

    function finishChange(info) {
        if (!info.success) {
            $scope.changes[info.key].error = true;
            return;
        }
        $scope.changes[info.key].changed = false;
        $scope.changes[info.key].commited = true;
        $scope.changes[info.key].changed_role = false;
        $scope.changes[info.key].changed_active = false;
        $scope.tableParams.settings().dataset = $localStorage.users;
        $scope.tableParams.reload();
        $timeout(function() {
            $scope.changes[info.key].commited = false;
        }, 5000);
        $scope.loading = false;
    }

});
