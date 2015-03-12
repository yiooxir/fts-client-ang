/**
 * Created by sergey on 11.03.15.
 */

var api = require('../../services/api');

module.exports = function($scope) {
    console.log(123123);

    $scope.send = function() {
        api.findUser('admin');
        //api.login('admin', '123');
    }
};