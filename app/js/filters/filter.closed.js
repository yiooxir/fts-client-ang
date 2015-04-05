/**
 * Фильтрация записей имеющих номер СФ
 */

module.exports = function() {
    return function(data, closed) {
        return _.filter(data, function(e) { return closed ? !!e.sysNumber:!e.sysNumber; })
    }
};
