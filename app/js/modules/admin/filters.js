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
        return function(data, firm) {
            if (!firm) return data;

            return _.where(data, {firm: firm._id});
        }
    },
    fltFirmsByUser: function() {

    },
    fltUsersByFirm: function() {
        return function(users, firm) {
            if (!firm) return users;

            return _.filter(users, function(user) {
                return user.firms.indexOf(firm._id) != -1;
            })
        }
    }
};
