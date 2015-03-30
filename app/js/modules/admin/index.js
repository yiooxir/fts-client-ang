/**
 * Created by sergey on 15.03.15.
 */

var app = require('angular').module('app');

app.controller('adminMain', require('./main'));
app.controller('adminRecords', require('./records'));
app.controller('adminUsers', require('./users'));
app.controller('adminFirms', require('./firms'));
app.controller('adminCreateToken', require('./createUserToken'));
app.controller('adminCreateRecord', require('./createRecord'));

app.filter('fltRecByUser', require('./filters').fltRecByUser);
app.filter('fltRecByFirm', require('./filters').fltRecByFirm);
app.filter('fltFirmsByUser', require('./filters').fltFirmsByUser);
app.filter('fltUsersByFirm', require('./filters').fltUsersByFirm);

app.directive('removeFilter', require('./directives').removeFilter);
app.directive('fieldFirms', require('./directives').fieldFirms);

