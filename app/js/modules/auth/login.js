/**
 * Created by sergey on 11.03.15.
 */

var api = require('../../services/api');

module.exports = function($rootScope, $scope, $state, $timeout) {

    $scope.username = "";
    $scope.password = "";
    $scope.error = false;


    $scope.login = function() {
        api.login($scope.username, $scope.password)
            .then(function(user) {
                $timeout(function(){
                    $scope.error = false;
                    var state = user.isSuperUser ? 'main.admin.users' : 'main.counts';
                    $state.go(state, {}, {reload: true});
                }, 0)
            })
            .catch(function(err) {
                $timeout(function() {$scope.error = true;});
                console.error(err);
            })
    }
};