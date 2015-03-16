/**
 * Created by sergey on 16.03.15.
 */

module.exports = {
    fltRecByUser: function() {
        return function(data, user) {
            if (!user) return data;
            return _.where(data, {createdBy: user._id});
        }
    },
    fltRecByFirm: function() {

    },
    fltFirmsByUser: function() {

    },
    fltUsersByFirm: function() {

    }
};
