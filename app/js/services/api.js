/**
 * Created by sergey on 13.03.15.
 */

var q = require('q');

function ajax(params) {
    var def = q.defer();
    $.ajax({
        url: params.url,
        type: params.type,
        data: params.type == "GET" ? params.data : JSON.stringify(params.data),
        dataType: 'json',
        contentType: 'application/json',
        headers: {
            Accept: "application/json, text/javascript, */*",
            "X-Requested-With": "XMLHttpRequest"
        },
        xhrFields: {
            withCredentials: false
        },
        success: function(res) {
            console.log('success', res);
            def.resolve(res);
        },
        error: function(err) {
            console.log('error', err);
            def.reject(err);

        }
    });

    return def.promise;
}

var params = {
    url: "",
    type: "GET",
    data: {}
};

function Req(path, type, data) {
    this.type = type || "GET";
    this.data = data || {};
    this.host = "";
    this.url = this.host + path;
}

Req.prototype = {
    send: function() {
        return ajax({
            url: this.url,
            data: this.data,
            type: this.type
        })
    }
};

module.exports = {
    login: function(userName, password) {
        var req = new Req('/users/login', "POST", {userName: userName, password: password});
        return req.send();
    },
    logout: function() {
        var req = new Req('/users/logout', "POST");
        return req.send();
    },
    getFirms: function(id) {

    },
    createFirm: function(values) {

    },
    updateFirm: function(id) {

    },
    shareFirm: function(userName) {

    },
    excludeFirm: function(userName) {

    },
    deleteFirm: function(id) {

    },
    getMe: function(){
        var req = new Req('/users/me');
        return req.send();
    },
    getUsers: function(id) {
        var req = new Req('/users');
        req.send();
    },
    findUser: function(userName) {
        params.url = 'http://127.0.0.1:3000/users/find';
        params.data = userName;
        ajax(params);
    },
    createUser: function(values) {
        var req = new Req('/users/create', "POST", values);
        req.send();
    },
    updateUser: function(id) {

    },
    deleteUser: function(id) {

    },
    getCounts: function() {

    },
    createCount: function() {

    },
    updateCount: function() {

    },
    deleteCount: function() {

    }
};