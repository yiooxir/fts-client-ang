/**
 * Created by sergey on 10.03.15.
 */
var api = require('../../services/api');

module.exports = function($scope, $stateParams, $state) {

    $scope.firms = $scope.$parent.firms;

    $scope.counts = $scope.$parent.counts;

    $scope.firm = $stateParams.id ? _.findWhere($scope.firms, {_id: $stateParams.id}) : null;

    $scope.creating = false;

    $scope.updating = false;

    $scope.create = function() {
        api.createCount({num: $scope.num})
            .then(function() {
                $state.go($state.current, {}, {reload: true})
            })
    };

    $scope.update = function(id, value) {
        if(!value) return;

        api.updateCount(id, {num: value})
            .then(function() {
                $state.go($state.current, {}, {reload: true})
            })
    };
};
