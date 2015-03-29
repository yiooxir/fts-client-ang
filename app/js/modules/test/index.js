/**
 * Created by sergey on 13.03.15.
 */

var app = require('angular').module('app');

var api = require('../../services/api');

module.exports = app.controller('test', function($rootScope, $scope, $timeout) {

    $scope.username = $rootScope.locals.user.username;

    $scope.logout = function() {
        api.logout()
            .then(function() {
                //$state.go('main.login');
            })
    };

    $scope.getUsers = function() {
        api.getUsers();
    };
    $scope.createUser = function() {

        api.createUser({username: $scope.username, password: $scope.password})
    };

    $scope.createFirm = function() {

    }

});