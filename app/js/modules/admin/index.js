/**
 * Created by sergey on 15.03.15.
 */

var app = require('angular').module('app');

app.controller('adminMain', require('./main'));
app.controller('adminRecords', require('./records'));
app.controller('adminUsers', require('./users'));
app.controller('adminFirms', require('./firms'));