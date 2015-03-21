/**
 * Created by sergey on 11.03.15.
 */

var api = require('../../services/api');

module.exports = function($scope, token, $state) {
    $scope.token = token;
    $scope.errMessage = '';
    $scope.password = '';
    $scope.confirmPassword = '';
    $scope.err = null;

    if(!$scope.token) {
        $scope.err = 1;
    }
    else if ($scope.token.used === true) {
        $scope.err = 2;
    }

    $scope.create = function(password, confirm) {
        if (!token.username || !password) return $scope.errMessage='имя пользователя или пароль не введены';
        if (password != confirm) return $scope.errMessage = 'пароли не совпадают';

        api.createUser(token.username, password, token.token)
            .then(function() {
                $scope.errMessage = '';
                $state.go('main.counts', {}, {reload: true})
            })
    }
};