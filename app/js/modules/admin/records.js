/**
 * Created by sergey on 15.03.15.
 */

module.exports = function($scope) {

    $scope.firms = $scope.$parent.firms;
    $scope.users = $scope.$parent.users;
    $scope.counts = $scope.$parent.counts;
    $scope.creating = false;
    $scope.filters = $scope.$parent.filters;

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

    $scope.getFirm = function(rec) {
        return _.findWhere($scope.firms, {_id: rec.firm})
    };

    $scope.getUser = function(id) {
        return _.findWhere($scope.users, {_id: id})
    };

    $scope.filtered = function() {

    }
};
