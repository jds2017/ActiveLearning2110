/* jshint node: true */


var app = angular.module('app');

app.controller('Course.Student.Controller', function($scope, $localStorage, $rootScope, $stateParams, $state, UserService, NgTableParams, SocketService) {

    $rootScope.$stateParams = $stateParams;
    $scope.course = $localStorage.courses[$stateParams.selectedCourse];
    $scope.course_index = $stateParams.selectedCourse;
    SocketService.getLecturesList();

    $rootScope.$on('coursesUpdated', function() {
        if ($stateParams.selectedCourse !== null && $state.current.name === 'main.student_course') {
            $scope.course = $localStorage.courses[$stateParams.selectedCourse];
            $scope.tableParams.settings().dataset = $scope.course.lectures;
            $scope.tableParams.reload();
        }
    });

    $scope.joinLiveLecture = function(lecture, index) {
        SocketService.JoinLiveLecture({
            username: $localStorage.username,
            user_id: $localStorage._id,
            user_role: $localStorage.role,
            lecture_id: lecture._id
        });
        $state.go('main.student_live_lecture', {
            selectedCourse: $scope.course_index,
            selectedLecture: index
        });
    };

    $scope.tableParams = new NgTableParams({
        count: 6,
        sorting: {
            date: "asc"
        }
    }, {
        counts: [],
        dataset: $scope.course.lectures,
        getData: function(params) {
            var orderedData;
            data = $localStorage.courses[$stateParams.selectedCourse].lectures;
            if (params.sorting().date === 'asc') {

                data.sort(function(a, b) {
                    var dateA = new Date(a.schedule.date),
                        dateB = new Date(b.schedule.date);
                    return dateA - dateB;
                });
                orderedData = data;
            } else if (params.sorting().date === 'desc') {

                data.sort(function(a, b) {
                    var dateA = new Date(a.schedule.date),
                        dateB = new Date(b.schedule.date);
                    return dateB - dateA;
                });
                orderedData = data;
            }
            return orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
        }
    });
});
