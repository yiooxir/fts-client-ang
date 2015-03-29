/**
 * Created by sergey on 10.03.15.
 */
var api = require('../../services/api');

module.exports = function($scope, $stateParams, $rootScope, $state, $timeout) {

    $scope.firms = $scope.$parent.firms;
    $scope.counts = $scope.$parent.counts;
    $scope.firm = $stateParams.id ? _.findWhere($scope.firms, {_id: $stateParams.id}) : null;
    $scope.creating = false;
    $scope.updating = false;
    $scope.dateNow = {created: new Date()};
    $scope.progress = false;
    $scope.amount = '';
    $scope.closed = false;
    $scope.contractor = '123123';

    $scope.getContractors = function() {
        return $rootScope.locals.user.contractor;
    };


    $scope.options = {
        onChange: function(params) {
            if (!params.value) return alert('Ошибка. Нельзя сохранять пустое значение');

            api.updateCount(params.object._id, params.hash)
                .then(function() {
                    $timeout(function() {});
                    //$state.go($state.current, $stateParams, {reload: true})
                })
                .catch(function(err) {
                    alert('Ошибка при изменении значения поля');
                    console.error(err);
                })
        }
    };

    $scope.filtered = function() {
        if ($scope.closed) {
            return _.filter($scope.counts, function(count) {return count.sysNumber != null})
        }
        else {
            return _.filter($scope.counts, function(count) {return count.sysNumber === null})
        }
    };

    $scope.create = function() {
        api.createCount({
            amount: $scope.amount || 0,
            firm: $scope.firm._id,
            created: $scope.dateNow.created,
            createdBy: $rootScope.locals.user._id
        })
            .then(function(res) {
                $timeout(function() {
                    $scope.counts.unshift(res);
                    $scope.closed = false;
                });
            })
            .catch(function(err) {
                $scope.progress = false;
                console.error(err);
                alert('Ошибка. Не удалось создать новую фактуру.')
            })
    };

    $scope.update = function(id, values) {
        if(!values) return;

        api.updateCount(id, values)
            .then(function() {
                //$state.go($state.current, $stateParams, {reload: true})
            })
            .catch(function(err) {
                alert('Ошибка, не удалось обновить значение');
            })
    };

    $scope.remove = function(count) {
        var e = confirm('Фактура будет удалена безвозвратно. \n Продолжить ?');
        if (e) {
            api.deleteCount(count._id)
                .then(function() {
                    $state.go($state.current, $stateParams, {reload: true})
                })
                .catch(function(err) {
                    alert('Ошибка. Не удалось удалить фактуру.');
                    console.error(err);
                })
        }
    }
};
