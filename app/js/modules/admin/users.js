/**
 * Created by sergey on 15.03.15.
 */

var api = require('../../services/api');

module.exports = function($scope, users, $state, $timeout) {
    $scope.users = users;

    $scope.creating = false;

    $scope.filters = $scope.$parent.filters;

    $scope.options = {
        onChange: function(params) {
            if (!params.value) return alert('Ошибка. Нельзя сохранять пустое значение');

            api.updateUser(params.object._id, params.hash)
                .then(function() {
                    $state.go($state.current, {}, {reload: true})
                })
        }
    };

    $scope.chageContragent =

    $scope.createUser = function() {
        if (!$scope.username || !$scope.password) {
            alert('Имя пользователя и пароль должны быть заполнены');
            return;
        }
        api.createUser($scope.username, $scope.password)
            .then(function() {
                $state.go($state.current, {}, {reload: true});
            })
            .catch(function(err) {
                if (err.responseJSON == "user with same name is already exists") {
                    alert("пользователь с таким именем уже существует");
                } else {
                    alert("не удалось создать юзера. обратитесь к администратору системы.");
                    $scope.creating = false;
                }
                console.error(err);
            })
    }

};
