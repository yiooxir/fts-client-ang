/**
 * Created by sergey on 15.03.15.
 */

var utils = require('../../utils');
var api = require('../../services/api');

module.exports = function($scope, $timeout, quarter) {

    $scope.firms = $scope.$parent.firms;
    $scope.users = $scope.$parent.users;
    $scope.counts = $scope.$parent.counts;
    $scope.filters = $scope.$parent.filters;
    $scope.quarter = quarter;
    $scope.closed = false;
    $scope.filterDate = { date: new Date() };
    $scope.options = {
        onChange: function(params) {
            if (!params.value) return alert('Ошибка. Нельзя сохранять пустое значение');

            api.updateCount(params.object._id, params.hash)
                .then(function() {
                    //$state.go($state.current, {}, {reload: true})
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

    $scope.remove = function(count) {
        api.deleteCount(count._id)
            .then(function() {
                $timeout($scope.counts.splice(utils.getIndexById($scope.counts, count._id), 1));
            })
            .catch(function(err) {
                console.error(err);
                alert('Ошибка обновления данных на сервере');
            })
    }
};
