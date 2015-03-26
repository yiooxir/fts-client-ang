/**
 * Created by sergey on 21.03.15.
 */

var api = require('../../services/api');

module.exports = {
    token: function ($stateParams, $state) {
        if (!$stateParams.token) return undefined;

        return api.getToken($stateParams.token)
            .catch(function (err) {
                console.error(err);
                alert('Приглашение не действительно.');
                $state.go('login');
            })
    }
};