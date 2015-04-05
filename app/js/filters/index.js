/**
 * Created by sergey on 06.04.15.
 */

'use strict';

var app = require('angular').module('app');

app.filter('month', require('./filter.month'));
app.filter('closed', require('./filter.closed'));