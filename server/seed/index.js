const request = require("request-promise");
const _ = require("lodash");
const Q = require("q");

const users = require("./Users");
const foods = require("./Foods");
const eat = require("./EAT");

const apiUrl = "http://localhost:9000/api/v1";

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

console.log("Start uploading seed data");

let callsUsers = _.map(users, userData => {
    return request(loadOptionsLogued("POST", `${apiUrl}/private/users`, userData));
});

let callsFood = _.map(foods, foodData => {
    return request(loadOptionsLogued("POST", `${apiUrl}/private/foods`, foodData));
});

Q.all([
    Q.all(callsUsers),
    Q.all(callsFood)
]).then(() => {
    let eatCalls = _.map(eat, ({externalId, food}) => {
        return request(loadOptionsLogued("POST", `${apiUrl}/private/users/${externalId}?food=${encodeURIComponent(food)}`));
    });

    return Q.all(eatCalls);
}).then(() => {
    console.log("Seed data is uploaded");

    process.exit(0);
});