/**
 * Created by sergey on 30.03.15.
 */

var api = require('../../services/api');

module.exports = function($scope, $timeout, $state) {

    /* common */
    $scope.firm = null;
    $scope.created = null;
    $scope.countTemplate = {
        amount: 0,
        created: new Date()
    };
    /* for new acc. */
    $scope.newAcc = false;
    $scope.accName = null;

    /* for present acc. */
    $scope.user = null;
    $scope.contractor = null;

    $scope.getContractors = function() {
        if (!$scope.user || !$scope.user.contractor) return [];
        return $scope.user.contractor.split(';');
    };

    window.s = $scope;

    $scope.create = function() {

        if ($scope.newAcc && !$scope.accName) {alert('Не задано имя аккаунта.'); return 0;}
        if (!$scope.firm) {alert('Не выбрана фирма'); return 0;}
        if (!$scope.newAcc && !$scope.user) {alert('Не выбранн аккаунт пользователя'); return 0;}
        if (!$scope.newAcc && !$scope.contractor) {alert('Не выбран контрагент'); return 0;}

        api.getMe()
            .then(function() {
                if ($scope.newAcc) {
                    return api.createUser({
                        username: $scope.accName,
                        password: Math.round(Math.random()*1000*1000*1000) + '',
                        contractor: $scope.accName
                    });
                }
                else {
                    return $scope.user;
                }
            })
            .then(function(user) {
                $timeout(function(){
                    $scope.$parent.filters.user = user;
                    if ($scope.newAcc) $scope.$parent.$parent.users.push(user);
                });

                return api.createCount({
                    amount: $scope.countTemplate.amount,
                    created: $scope.countTemplate.created,
                    firm: $scope.firm._id,
                    createdBy: user._id,
                    contractor: $scope.contractor || $scope.accName
                })
            })
            .then(function(res) {
                $timeout(function(){
                    $scope.$parent.$parent.counts.unshift(res);
                    $state.go('main.admin.records');
                })
            })
            .catch(function(err) {
                console.error(err);
                alert('Ошибка сохранения данных на сервере.');
            })
    }
};