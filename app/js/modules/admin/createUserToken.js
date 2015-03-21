/**
 * Created by sergey on 21.03.15.
 */

var api = require('../../services/api');

module.exports = function($scope, $state, tokens) {

    $scope.tokens = tokens;
    $scope.email = '';

    $scope.createToken = function(email) {
        console.count('createToken');
        api.createToken(email)
            .then(function() {
                $state.go($state.current, {}, {reload: true});
            })
            .catch(function(err) {
                console.error(err);
            })
    }
};