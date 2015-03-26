/**
 * Created by sergey on 18.03.15.
 */

var app = require('angular').module('app');

app.directive('fieldInput', require('./fieldInput'));
app.directive('fieldDate', require('./fieldDate'));
app.directive('fieldMonth', require('./fieldMonth'));
app.directive('fieldMultiSelect', require('./fieldMultiSelect.js'));