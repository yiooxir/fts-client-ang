/**
 * Created by sergey on 16.03.15.
 */

var api = require('../../services/api');

module.exports = {
    users: function() {
        return api.getUsers()
            .catch(function(err) {
                console.error(err);
            })
    }
};