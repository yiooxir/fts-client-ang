/**
 * Created by sergey on 15.03.15.
 */

module.exports = function($scope) {

    $scope.firms = $scope.$parent.firms;

    $scope.users = $scope.$parent.users;

    $scope.counts = $scope.$parent.counts;

    $scope.creating = false;

    $scope.filters = $scope.$parent.filters;

    $scope.getFirm = function(rec) {
        return _.findWhere($scope.firms, {_id: rec.firm})
    };

    $scope.getUser = function(rec) {
        return _.findWhere($scope.users, {_id: rec.createdBy})
    };


    $scope.filtered = function() {

    }
};
