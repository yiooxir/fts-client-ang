/**
 * Created by sergey on 30.03.15.
 */

module.exports = function($rootScope) {

    var quarters = (function() {
        var curY = new Date().getFullYear();
        return [
            new Date('10/10/' + (curY-1)),
            new Date('01/10/' + curY),
            new Date('04/10/' + curY),
            new Date('07/10/' + curY),
            new Date('10/10/' + curY)
        ]
    })();

    var curQuarterInd = (function() {
        var now = new Date();
        for (var i= 0, len=quarters.length; i<len; i++) {
            if (i == quarters.length-1 || now > quarters[i] && now < quarters[i+1]) {
                return i;
            }
        }
    })();

    var curQuarter = quarters[curQuarterInd];

    return {
        protected: function(rec) {
            if (_.has(rec.created))throw new Error('bad data');

            return new Date(rec.created) < curQuarter;
        }
    }
};