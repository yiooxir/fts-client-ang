/**
 * Created by sergey on 16.03.15.
 */

var api = require('../../services/api');

module.exports = {
    firms: function($rootScope) {
        return api.getFirms()
            .catch(function(err) {
                console.error(err);
            })
    },
    counts: function() {
        return api.getCounts()
            .catch(function(err) {
                console.error(err);
            })
    },
    users: function() {
        return api.getUsers()
            .catch(function(err) {
                console.error(err);
            })
    }
};
