/**
 * Created by sergey on 15.03.15.
 */

var api = require('../../services/api');

module.exports = function($scope, users, $state) {
    $scope.users = users;

    $scope.creating = false;

    $scope.createUser = function() {
        if (!$scope.userName || !$scope.password) {
            alert('Имя пользователя и пароль должны быть заполнены');
            return;
        }
        api.createUser($scope.userName, $scope.password)
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