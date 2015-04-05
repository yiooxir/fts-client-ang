/**
 * Created by sergey on 10.03.15.
 */

var angular = require('angular');
var api = require('./services/api');

/* plagins */
require('angular-ui-router');
_ = require('underscore');
$ = jQuery = require('jquery');
var bootstrap = require('bootstrap');
require('../../plugins/datapiker/js/bootstrap-datepicker.min.js');

var app = angular.module('app', ['ui.router']);

/* angular modules */
require('./modules/main');
require('./modules/counts');
require('./modules/contractors');
require('./modules/auth');
require('./modules/test');
require('./modules/admin');
require('./directives');
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
            controller: 'MainCtrl',
            resolve: require('./modules/main/main.resolve.js')
        })

        /* auth  */
        .state('login', {
            url: '/login',
            templateUrl: '/layout/auth.login.html',
            controller: 'login'
        })

        .state('registration', {
            url: '/registration?:token',
            templateUrl: '/layout/auth.registration.html',
            controller: 'registration',
            resolve: require('./modules/auth/registration.resolve.js')
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

        .state('main.admin.createToken', {
            url: '/createToken',
            templateUrl: '/layout/admin.createToken.html',
            controller: 'adminCreateToken',
            resolve: require('./modules/admin/createToken.resolve.js')
        })

        .state('main.admin.createRecord', {
            url: '/createRecord',
            templateUrl: '/layout/admin.create-record.html',
            controller: 'adminCreateRecord'
        })

        .state('main.changePassword', {
            url: '/changePassword',
            templateUrl: '/layout/admin.change-password.html',
            controller: 'adminChangePassword'
        })

        /* users */
        .state('main.counts', {
            url: '/counts',
            templateUrl: '/layout/user.counts.html',
            controller: 'userCounts'
        })

        .state('main.contractors', {
            url: '/contractors',
            templateUrl: '/layout/user.contractors.html',
            controller: 'userContractors'
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

        .state('main.about', {
            url: "/about",
            templateUrl: "/layout/main.about.html"
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
    //
    locals.user = null;
    //
    //$rootScope.getUser = function() {
    //    return locals.user;
    //};
    //
    //$rootScope.getUserName = function() {
    //    return locals.user ? locals.user.username : null;
    //};
    //
    //$rootScope.isSuperUser = function() {
    //    return locals.user ? locals.user.isSuperUser : null;
    //};

    /* check auth. middleware */
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

        if (fromState.name == 'registration' || toState.name == 'registration') {
            return true;
        }
        else
        {
            api.getMe()
                .then(function(res) {
                    $timeout(function() {locals.user = res});
                })
                .catch(function() {
                    $timeout(function() {
                        $state.go('login');
                    });
                });
        }
    })
});

module.exports = app;
