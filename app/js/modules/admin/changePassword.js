/**
 * Created by sergey on 05.04.15.
 */

var api = require('../../services/api');

module.exports = function($scope, $rootScope, $timeout) {

    $scope.update = function() {
        if (!$scope.password || !$scope.newPass) return alert('Пароль не может быть пустым');
        if ($scope.newPass != $scope.checkPass) return alert('Проверочный пароль не совпадает');

        api.updateUser($rootScope.locals.user._id, {
            password: $scope.password,
            newPass: $scope.newPass
        })
            .then(function() {
                $timeout(function(){$scope.password = $scope.newPass = $scope.checkPass = ''});
                alert('Пароль успешно изменен');
            })
            .catch(function(err) {
                console.error(err);
                alert('Серверная ошибка. Пароль не изменен.');
            })


    }
};