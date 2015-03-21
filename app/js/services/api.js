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
            def.resolve(res);
        },
        error: function(err) {
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
        var req = new Req('/firms');
        return req.send();
    },
    createFirm: function(values) {
        var req = new Req('/firms/create', "POST", values);

        return req.send();
    },
    updateFirm: function(id) {

    },
    linkToFirm: function(userId, firmId) {
        var req = new Req('/users/'+userId + '/linkToFirm', "PUT", {firmId: firmId});
        return req.send();

    },
    excludeFirm: function(userId, firmId) {
        var req = new Req('/users/'+userId + '/excludeFirm', "PUT", {firmId: firmId});
        return req.send();
    },

    deleteFirm: function(id) {

    },

    /* USERS
     * ------------------------------------*/
    getMe: function(){
        var req = new Req('/users/me');
        return req.send();
    },
    getUsers: function(id) {
        var req = new Req('/users');
        return req.send();
    },
    findUser: function(userName) {
        params.url = 'http://127.0.0.1:3000/users/find';
        params.data = userName;
        ajax(params);
    },
    createUser: function(userName, password, token) {
        var req = new Req('/users/create', "POST", {userName: userName, password: password, token: token});
        return req.send();
    },
    updateUser: function(id) {

    },
    deleteUser: function(id) {

    },
    createToken: function(email) {
        var req = new Req('/users/tokens', "POST", {username: email});
        return req.send();
    },
    getTokens: function(used) {
        var req = new Req('/users/tokens?used=' + used);
        return req.send();
    },
    getToken: function(token) {
        var req = new Req('/users/tokens/' + token);
        return req.send();
    },
    /* COUNTS
     * -----------------------------------------*/
    getCounts: function() {
        var req = new Req('/counts');
        return req.send();

    },
    createCount: function(value) {
        var req = new Req('/counts/create', "POST", value);
        return req.send();
    },
    updateCount: function(id, value) {
        var req = new Req('/counts/' + id, "PUT", value);
        return req.send();
    },
    deleteCount: function() {

    }
};
