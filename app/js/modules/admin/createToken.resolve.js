/**
 * Created by sergey on 21.03.15.
 */

var api = require('../../services/api');

module.exports = {
    tokens: function() {
        return api.getTokens(false)
            .catch(function(err) {
                console.error(err);
            })
    }
};