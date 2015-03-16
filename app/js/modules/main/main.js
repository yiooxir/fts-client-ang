/**
 * Created by sergey on 11.03.15.
 */

var api = require('../../services/api');

module.exports = function($scope, $rootScope, firms, counts, $state) {
    console.info('main controller is started');

    $scope.firms = firms;

    $scope.counts = counts;

    $scope.logout = function() {
        api.logout()
            .then(function() {
                $state.go('login');
            })
    }
};