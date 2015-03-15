/**
 * Created by sergey on 15.03.15.
 */
var api = require('../../services/api');

module.exports = function($scope, $state) {
    $scope.firms = $scope.$parent.firms;

    $scope.creating = false;

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