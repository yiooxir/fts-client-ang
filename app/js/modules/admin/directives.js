/**
 * Created by sergey on 16.03.15.
 */

var api = require('../../services/api');

module.exports = {
    removeFilter: function($timeout) {
        return {
            restrict: 'E',
            templateUrl: '/layout/admin.directives.removeFilters.html',
            link: function($scope) {}
        }
    },
    fieldFirms: function() {
        return {
            restrict: 'E',
            templateUrl: '/layout/admin.directives.fieldFirms.html',
            scope: {
                user: '='
            },
            link: function($scope) {

                $scope.selecting = false;

                $scope.selected = $scope.user.firms;

                $scope.firms = $scope.$parent.firms;

                $scope.getFirm = function(id) {
                   return _.findWhere($scope.firms, {_id: id})
                };

                $scope.addFirm = function(firm) {
                    api.linkToFirm($scope.user._id, firm._id)
                        .then(function() {
                            $scope.selected.push(firm._id);
                        })
                        .finally(function() {
                            $scope.selecting = false;
                            $scope.$apply();
                        })
                };

                $scope.remove = function(id) {
                    var e = confirm('закрыть доступ к фирме для пользователя ?');
                    if (e) {
                        api.excludeFirm($scope.user._id, id)
                            .then(function() {
                                $scope.selected.splice($scope.selected.indexOf(id), 1);
                            })
                            .finally(function() {
                                $scope.$apply();
                            })

                    }
                };
            }

        }
    }
};
