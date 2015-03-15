/**
 * Created by sergey on 10.03.15.
 */

var angular = require('angular');
var router = require('angular-ui-router');
var resource = require('angular-resource');
var api = require('./services/api');


var app = angular.module('app', ['ui.router', 'ngResource']);

$ = jQuery = require('jquery');

_ = require('underscore');

var bootstrap = require('bootstrap');

require('./modules/main');
require('./modules/counts');
require('./services');
require('./modules/auth');
require('./modules/test');
require('./modules/admin');


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
            controller: 'MainCtrl',
            resolve: require('./modules/main/main.resolve.js')
        })

        /* auth  */
        .state('main.login', {
            url: '/login',
            templateUrl: '/layout/auth.login.html',
            controller: 'login'
        })

        .state('main.registration', {
            url: '/registration',
            templateUrl: '/layout/auth.registration.html',
            controller: 'registration'
        })

        /* admin */
        .state('main.admin', {
            url: '/admin',
            templateUrl: '/layout/admin.main.html',
            controller: 'adminMain'
        })
        .state('main.admin.firms', {
            url: '/firms',
            templateUrl: '/layout/admin.firms.html',
            controller: 'adminFirms'
        })
        .state('main.admin.users', {
            url: '/users',
            templateUrl: '/layout/admin.users.html',
            controller: 'adminUsers',
            resolve: require('./modules/admin/users.resolve.js')
        })
        .state('main.admin.records', {
            url: '/records',
            templateUrl: '/layout/admin.records.html',
            controller: 'adminRecords'
        })

        /* users */
        .state('main.counts', {
            url: '/counts',
            templateUrl: '/layout/user.counts.html',
            controller: 'userCounts'
        })
        .state('main.counts.count', {
            url: '/:id',
            templateUrl: '/layout/user.counts.count.html',
            controller: 'userCounts'
        })
        .state('main.state1', {
            url: "/state1",
            templateUrl: "/layout/state1.html"
        })
        .state('test', {
            url: '/test',
            templateUrl: '/layout/test.html',
            controller: 'test'
        })
});


app.run(function($rootScope, $state, $timeout) {
    console.log('the program is run on port ');

    $rootScope.locals = {};
    var locals = $rootScope.locals;

    locals.user = null;

    $rootScope.getUserName = function() {
        return locals.user ? locals.user.username : null;
    };

    $rootScope.isSuperUser = function() {
        return locals.user ? locals.user.isSuperUser : null;
    };

    /* check auth. middleware */
    $rootScope.$on('$stateChangeStart', function($event) {
        api.getMe()
            .then(function(res) {
                $timeout(function() {locals.user = res});
            })
            .catch(function(err) {
                console.error(err);
                $timeout(function() {
                    locals.user = null;
                    $state.go('main.login');
                });
            });
    })
});

module.exports = app;