/**
 * Created by sergey on 11.03.15.
 */

module.exports = function($resource) {
console.log('init resource');
    return {
        a: function() {return 1}
    }
};