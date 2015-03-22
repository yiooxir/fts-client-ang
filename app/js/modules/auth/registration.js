/**
 * Created by sergey on 11.03.15.
 */

var api = require('../../services/api');

module.exports = function($scope, token, $state) {
    $scope.token = token;
    $scope.errMessage = '';
    $scope.contractor = '';
    $scope.password = '';
    $scope.confirmPassword = '';
    $scope.err = null;

    if(!$scope.token) {
        $scope.err = 1;
    }
    else if ($scope.token.used === true) {
        $scope.err = 2;
    }

    $scope.create = function(contractor, password, confirm) {
        if (!contractor) return $scope.message('Название контрагента обязательное поле');
        if (!token.username || !password) return $scope.errMessage='имя пользователя или пароль не введены';
        if (password != confirm) return $scope.errMessage = 'пароли не совпадают';

        var values = {
            contractor: contractor,
            username: token.username,
            token: token.token,
            password: password
        };

        api.createUser(values)
            .then(function() {
                $scope.errMessage = '';
            })
            .then(function() {
                api.login(values.username, values.password);
            })
            .then(function(){
                $state.go('main.state1', {}, {reload: true})
            })
            .catch(function(err) {
                alert('Ошибка. Не удалось создать пользователя.');
                console.error(err);
            })
    }
};