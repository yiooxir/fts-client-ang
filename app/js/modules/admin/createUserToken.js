/**
 * Created by sergey on 21.03.15.
 */

var api = require('../../services/api');

module.exports = function($scope, $state, tokens) {

    $scope.tokens = tokens;
    $scope.email = '';
    $scope.startNum = '';

    $scope.createToken = function(email, startNum) {
        console.count('createToken');
        api.createToken(email, startNum)
            .then(function() {
                $state.go($state.current, {}, {reload: true});
            })
            .catch(function(err) {
                console.error(err);
            })
    }
};