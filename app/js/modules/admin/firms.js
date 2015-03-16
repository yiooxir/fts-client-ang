/**
 * Created by sergey on 15.03.15.
 */
var api = require('../../services/api');

module.exports = function($scope, $state) {
    $scope.firms = $scope.$parent.firms;

    $scope.users = $scope.$parent.users;

    $scope.creating = false;

    $scope.filters = $scope.$parent.filters;

    $scope.filtered = function() {
        if (!$scope.filters.user) return $scope.firms;

        return _.filter($scope.firms, function(firm) {
            return $scope.filters.user.firms.indexOf(firm._id) != -1;
        })
    };

    $scope.create = function() {
        if (!$scope.name) {
            alert('Не указано название фирмы');
        } else {
            api.createFirm({name: $scope.name})
                .then(function() {
                    $state.go($state.current, {}, {reload: true});
                })
                .catch(function(err) {
                    alert('не удалось создать фирму. Обратитесь к администратору системы.');
                    $scope.creating = false;
                })
        }
    }
};
