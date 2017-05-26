/* jshint node: true */


var app = angular.module('app');

app.controller('Navbar.Controller', function($scope, $localStorage, $state, $stateParams, $rootScope, RESTService, UserService) {

    $scope.title = 'Active Learning';
    $rootScope.$stateParams = $stateParams;

    $scope.logout = function() {
        RESTService.Logout();
    };

    $scope.profile = function() {
        UserService.ShowProfile();
    };

    $scope.$watch(function() {
        return $state.current.url;
    }, function(newVal, oldVal) {
        if (newVal !== undefined) {
            $scope.course = $localStorage.courses[$stateParams.selectedCourse];
            if ($stateParams.selectedCourse !== undefined) {
                if ($localStorage.role == 'student') {
                    $scope.title = $scope.course.title + ' - ' + $scope.course.section;
                } else {
                    $scope.title = $scope.course.title;
                }
                if ($stateParams.selectedSection !== undefined) {
                    $scope.title = $scope.title + ' - ' + $stateParams.selectedSection.section.name;
                }
                if ($stateParams.selectedLecture !== undefined) {
                    $scope.lecture = $scope.course.lectures[$stateParams.selectedLecture];
                    $scope.title = $scope.title + ' - ' + $scope.lecture.title;
                }
            } else {
                $scope.title = 'Active Learning';
            }
        }
    });
});
