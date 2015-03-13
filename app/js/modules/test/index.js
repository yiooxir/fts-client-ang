/**
 * Created by sergey on 13.03.15.
 */

var app = require('angular').module('app');

var api = require('../../services/api');

module.exports = app.controller('test', function($scope) {

    $scope.login = function() {
        api.login('admin', '123')
    };

    $scope.createUser = function() {
        debugger
        api.createUser({userName: $scope.username, password: $scope.password})
    }

});