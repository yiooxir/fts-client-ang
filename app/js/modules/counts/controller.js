/**
 * Created by sergey on 10.03.15.
 */

module.exports = function($scope, $stateParams) {

    $scope.firms = $scope.$parent.firms;

    $scope.counts = $scope.$parent.counts;

    $scope.firm = $stateParams.id ? _.findWhere($scope.firms, {_id: $stateParams.id}) : null;

    console.log('>>',$scope.firm)

    $scope.creating = false;

    $scope.create = function() {
        alert('123');
    }
};