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
        }
    };

    $scope.createUser = function() {
        if (!$scope.username || !$scope.password) {
            alert('Имя пользователя и пароль должны быть заполнены');
            return;
        }
        api.createUser($scope.username, $scope.password)
            .then(function(res) {
                $timeout($scope.users.push(res));
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
    };

    $scope.changeUserPassword = function(user) {
        var newPass = Math.round(Math.random()*1000*1000);
        var e = confirm('Пароль пользователя будет изменен. Новый пароль: ' + newPass);

        if (e) {
            api.updateUser(user._id, {
                newPass: newPass+''
            })
                .then(function(res) {
                    alert('Пароль для пользователя: '+res.username+' успешно изменен');
                })
                .catch(function(err) {
                    alert('Сервеная ошибка. Пароль не изменен.');
                })
        }
    };

    $scope.$on('fieldMultiSelect', function(e, data) {
        api.updateUser(data.id, {firms: data.values})
            .catch(function(err) {
                console.error(err);
                alert('Не удалось обновить данные');
            })
    })

};
