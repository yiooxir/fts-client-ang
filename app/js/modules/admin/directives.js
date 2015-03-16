/**
 * Created by sergey on 16.03.15.
 */

module.exports = {
    removeFilter: function() {
        return {
            restrict: 'E',
            templateUrl: '/layout/admin.directives.removeFilters.html',
            link: function($scope) {
                console.log('>>', $scope.filters);
            }
        }
    }
};
