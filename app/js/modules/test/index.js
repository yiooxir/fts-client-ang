/**
 * Created by sergey on 13.03.15.
 */

var app = require('angular').module('app');

var api = require('../../services/api');

module.exports = app.controller('test', function($scope, $timeout) {

    $scope.currentUser = '';

    api.getMe()
        .then(function(res) {
            $timeout(function() {$scope.currentUser = res.username});
        });
    $scope.login = function() {
        api.login($scope.userName, $scope.password);
    };

    $scope.logout = function() {
        api.logout();
    };

    $scope.getUsers = function() {
        api.getUsers();
    };
    $scope.createUser = function() {

        api.createUser({userName: $scope.userName, password: $scope.password})
    }

});