/* jshint node: true */

//************************************************************
//  app.js                                                  //
//  Active Learning 2110                                    //
//                                                          //
//  Created by Jeremy Carter on 01/11/16.                   //
//  Copyright © 2016 Jeremy Carter. All rights reserved.    //
//                                                          //
//  Date        Name        Description                     //
//  -------     ---------   --------------                  //
//  11Jan16     J. Carter  Initial Design                   //
//                                                          //
//************************************************************

var app = angular
    .module('app', [
        'ui.router',
        'ngMessages',
        'ngStorage',
        'angularModalService',
        'angular-jwt'
    ]);

app.config(function($stateProvider, $urlRouterProvider) {
    // default route
    $urlRouterProvider.otherwise("/");

    // app state and individual views
    $stateProvider
        .state('dashboard', {
            url: '/',
            views: {
                'navbar': {
                    templateUrl: 'app-components/navbar/navbar.view.html',
                    controller: 'Navbar.Controller',
                },
                'sidebar': {
                    templateUrl: '/app-components/sidebar/sidebar.view.html',
                    controller: 'Sidebar.Controller',
                },
                'dashboard': {
                    templateUrl: '/app-components/dashboard/dashboard.view.html',
                    controller: 'Dashboard.Controller',
                }
            }
        });
});

app.controller('Main.Controller', function($scope, $http, $localStorage, ModalService, AuthenticationService, UserService) {

    // All user info once fetched will be stored in local storage. now any of the other controllers can access user info
    // by using $storage.<field>. Ex: to get the user's e-mail do -> $storage.email
    $scope.$storage = $localStorage;

    var showLogin = function() {
        ModalService.showModal({
            templateUrl: '/app-components/login/login.view.html',
            controller: 'Login.Controller'
        }).then(function(modal) {
            modal.element.modal({
                backdrop: 'static',
                keyboard: false
            });
        });
    };

    if ($localStorage.token && !AuthenticationService.Expired($localStorage.token)) {
        $http.defaults.headers.common.Authorization = $localStorage.token;
    } else {
        AuthenticationService.Logout(false);
        showLogin();
    }
});
