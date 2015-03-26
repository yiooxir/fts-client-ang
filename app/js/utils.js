/**
 * Created by sergey on 27.03.15.
 */

module.exports = {
    getIndexById: function(objects, id) {
        for(var i= 0, l=objects.length; i<l; i++) {
            if (objects[i]._id === id) return i;
        }
    }
};