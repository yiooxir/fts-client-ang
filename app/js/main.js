/**
 * Created by sergey on 10.03.15.
 */

var angular = require('angular');

var router = require('angular-ui-router');

var resource = require('angular-resource');

var app = angular.module('app', ['ui.router', 'ngResource']);

$ = jQuery = require('jquery');

var bootstrap = require('bootstrap');

require('./modules/main');
require('./modules/counts');
require('./services');

app.config(function($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/state1");
    //
    // Now set up the states
    $stateProvider
        .state('main', {
            ulr: '/',
            templateUrl: 'layout/main.html',
            controller: 'MainCtrl'
        })
        .state('main.state1', {
            url: "/state1",
            templateUrl: "/layout/state1.html",
            controller: 'EditTodoCtrl'
        })
        //.state('state1.list', {
        //    url: "/list",
        //    templateUrl: "partials/state1.list.html",
        //    controller: function($scope) {
        //        $scope.items = ["A", "List", "Of", "Items"];
        //    }
        //})
        .state('state2', {
            url: "/state2",
            templateUrl: "layout/state2.html"
        })
        .state('state2.list', {
            url: "/list",
            templateUrl: "partials/state2.list.html",
            controller: function($scope) {
                $scope.things = ["A", "Set", "Of", "Things"];
            }
        });
});

app.run(function($rootScope, $state) {
    console.log('the program is run on port ');

    /* check auth. middleware */
    $rootScope.$on('$stateChangeStart', function($event, to) {
        console.log(arguments);
        //setTimeout(function(){$state.go('main.state1')}, 1000)
    })
});

module.exports = app;