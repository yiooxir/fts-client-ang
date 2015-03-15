/**
 * Created by sergey on 16.03.15.
 */

var api = require('../../services/api');

module.exports = {
    firms: function() {
        return api.getFirms()
            .catch(function(err) {
                console.error(err);
            })
    },
    counts: function() {
        return [1,2,3]
    }
};