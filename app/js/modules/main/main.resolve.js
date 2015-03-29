/**
 * Created by sergey on 16.03.15.
 */

var api = require('../../services/api');

module.exports = {
    firms: function($rootScope) {
        //if (!$rootScope.locals.user) return undefined;
        return api.getFirms()
            .catch(function(err) {
                console.error(err);
            })
    },
    counts: function($rootScope) {
        //if (!$rootScope.locals.user) return undefined;
        return api.getCounts()
            .catch(function(err) {
                console.error(err);
            })
    },
    users: function($rootScope) {
        //if (!$rootScope.locals.user) return undefined;
        return api.getUsers()
            .catch(function(err) {
                console.error(err);
            })
    },
    user: function($rootScope) {
        return api.getMe()
            .then(function(res) {
                $rootScope.locals.user = res;
                $rootScope.isSuperUser = function() {return res.isSuperUser}
            })
    }

};
