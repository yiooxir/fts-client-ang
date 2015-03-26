/**
 * Created by sergey on 26.03.15.
 */

module.exports = function() {

    return {
        restrict: 'E',
        templateUrl: 'layout/component.field-multi-select.html',
        scope: {
            objects: '=',
            value: '=',
            display: '@',
            store: '@',
            name: '@',
            id: '@'
        },
        link: function($scope) {
            $scope.display = $scope.display || '_id';
            //$scope.name = $scope.name || '';
        }
    }
};