/**
 * Created by sergey on 06.04.15.
 */

module.exports = function() {
    return function(data, date, doFilter) {
        if (!doFilter) return data;

        var month = date.getMonth()+ 1,
            year = date.getFullYear();

        return _.filter(data, function(e) {
            var split = e.created.split('-');
            return split[1]-0 == month && split[0]-0 == year;
        });
    }
};