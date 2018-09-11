const assert = require("assert");

function loadOptionsLogued(method, uri, body) {
    /*return {
        method,
        uri,
        headers: {"Authorization": `Bearer ${authToken}`},
        body,
        json: true
    };*/
    return loadOptionsNoLogued(method, uri, body);
}

function loadOptionsNoLogued(method, uri, body) {
    return {
        method,
        uri,
        body,
        json: true
    };
}

function checkResponse(response) {
    assert.ok(response);
    assert.ok(response.data);
    assert.ok(!response.err);
}

module.exports = {
    loadOptionsLogued,
    loadOptionsNoLogued,
    checkResponse
};