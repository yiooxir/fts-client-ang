/**
 * Created by sergey on 21.03.15.
 */

var utils = require('../../utils');
var api = require('../../services/api');

module.exports = function($scope, $state, tokens, $timeout) {

    $scope.tokens = tokens;
    $scope.email = '';
    $scope.firms = $scope.$parent.firms;
    $scope.selectedFirm = $scope.firms.length ? $scope.firms[0] : '';
    $scope.progress = false;


    $scope.createToken = function(email, selectedFirm) {

        if (!email) return alert('Укажите email');

        $scope.progress = true;

        api.createToken(email, selectedFirm._id || '')
            .then(function(res) {
                $timeout(function() {
                    $scope.progress = false;
                    $scope.tokens.unshift(res)
                });
            })
            .catch(function(err) {
                console.error(err);
                $scope.progress = false;

                if (err.responseJSON == 'the specified user is already exists')
                    return alert('Ошибка. Пользователь существует');

                alert('Ошибка отправки приглашения');
            })
    };

    $scope.removeToken = function(token) {
        api.deleteToken(token._id)
            .then(function() {
                $timeout(function() {
                    $scope.tokens.splice(utils.getIndexById($scope.tokens, token._id), 1)
                })
            })
            .catch(function(err) {
                console.error(err);
                alert('Ошибка обновления данных на сервере');
            })
    }
};