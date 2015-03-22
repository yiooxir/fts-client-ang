/**
 * Created by sergey on 11.03.15.
 */

var api = require('../../services/api');

module.exports = function($rootScope, $scope, $state, $timeout) {

    $scope.username = "";
    $scope.password = "";



    $scope.login = function() {
        api.login($scope.username, $scope.password)
            .then(function(user) {
                $timeout(function(){
                    var state = user.isSuperUser ? 'main.admin.users' : 'main.counts';
                    $state.go(state, {}, {reload: true});
                }, 0)
            })
            .catch(function(err) {
                console.error(err)
            })
    }
};