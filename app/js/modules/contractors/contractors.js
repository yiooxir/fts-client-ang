/**
 * Created by sergey on 29.03.15.
 */

var api = require('../../services/api');

module.exports = function($scope, $rootScope, $timeout) {

    $scope.editMode = false;

    $scope.update = function() {
        var user = $rootScope.locals.user;
        api.updateUser(user._id, {contractor: user.contractor})
            .then(function() {
                $timeout(function() {$scope.editMode = false;})
            })
            .catch(function(err) {
                console.error(err);
                alert('Ошибка обновления данных на сервере');
            })
    }
};