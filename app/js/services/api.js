/**
 * Created by sergey on 13.03.15.
 */

function ajax(params) {
    $.ajax({
        url: params.url,
        type: params.type,
        data: JSON.stringify(params.data),
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
        },
        error: function(err) {
            console.log('error', err)

        }
    })
}

var params = {
    url: "",
    type: "GET",
    data: {}
};

module.exports = {
    login: function(userName, password) {
        params.url = 'http://127.0.0.1:3000/users/login';
        params.type = "POST";
        params.data = {userName: userName, password: password};
        ajax(params);
    },
    logout: function() {
        params.url = 'http://127.0.0.1:3000/users/logout';
        params.type = "POST";
        ajax(params);
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
    getUsers: function(id) {
        params.url = 'http://127.0.0.1:3000/users' + id ? id : '';
        ajax(params);
    },
    findUser: function(userName) {
        params.url = 'http://127.0.0.1:3000/users/find';
        params.data = userName;
        ajax(params);
    },
    createUser: function(values) {

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