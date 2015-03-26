/**
 * Created by sergey on 15.03.15.
 */
var api = require('../../services/api');

module.exports = function($scope, $state, $timeout) {

    $scope.firms = $scope.$parent.firms;
    $scope.users = $scope.$parent.users;
    $scope.creating = false;
    $scope.filters = $scope.$parent.filters;
    $scope.startNum = '';
    $scope.progress = false;

    $scope.filtered = function() {
        if (!$scope.filters.user) return $scope.firms;

        return _.filter($scope.firms, function(firm) {
            return $scope.filters.user.firms.indexOf(firm._id) != -1;
        })
    };

    $scope.options = {
        onChange: function(params) {
            if (!params.value) return alert('Ошибка. Нельзя сохранять пустое значение');

            api.updateFirm(params.object._id, params.hash)
                .then(function() {
                    $state.go($state.current, {}, {reload: true})
                })
                .catch(function(err) {
                    alert('Ошибка при изменении значения поля');
                    console.error(err);
                })
        }
    };

    $scope.create = function() {
        if (!$scope.name) {
            alert('Не указано название фирмы');
        } else {
            $scope.progress = true;
            api.createFirm({name: $scope.name, startNum: $scope.startNum || 0})
                .then(function(res) {
                    $timeout(function() {
                        $scope.firms.unshift(res);
                        $scope.progress = false;
                    });

                })
                .catch(function(err) {
                    $scope.progress = false;
                    alert('Ошибка при создании фирмы');
                    $scope.creating = false;
                })
        }
    }
};
