/**
 * Created by sergey on 21.03.15.
 */

var api = require('../../services/api');

module.exports = function($scope, $state, tokens) {

    $scope.tokens = tokens;
    $scope.email = '';
    $scope.firms = $scope.$parent.firms;
    $scope.selectedFirm = $scope.firms.length ? $scope.firms[0] : '';


    $scope.createToken = function(email, selectedFirm) {

        if (!email) return alert('Укажите email');

        api.createToken(email, selectedFirm._id || '')
            .then(function() {
                $state.go($state.current, {}, {reload: true});
            })
            .catch(function(err) {
                console.error(err);

                if (err.responseJSON == 'the specified user is already exists')
                    return alert('Ошибка. Пользователь существует');

                alert('Ошибка отправки приглашения');
            })
    };
};