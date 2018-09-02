const assert = require("assert");
const request = require("request-promise");
const randomString = require("randomstring");

const baseUrl = "http://localhost:9000";
const apiUrl = "http://localhost:9000/api/v1";

/*function loadOptionsLogued(method, uri, body) {
    return {
        method,
        uri,
        headers: {"Authorization": `Bearer ${authToken}`},
        body,
        json: true
    };
}*/

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

describe("user.js", () => {
    it("Check API is Online", async () => {
        let response;

        try {
            response = await request(loadOptionsNoLogued("GET", `${baseUrl}`));
        } catch (err) {
            assert.ok(false);
        }

        checkResponse(response);
    });

    it("Check create data", async () => {
        const response = await request(loadOptionsNoLogued("POST", `${apiUrl}/private/users`, {
            externalId: randomString.generate(16),
            name: randomString.generate(5)
        }));

        checkResponse(response);
    });

    it("Check not allow duplicated users", async () => {
        const externalId = randomString.generate(16);

        let response = await request(loadOptionsNoLogued("POST", `${apiUrl}/private/users`, {
            externalId
        }));

        checkResponse(response);

        try {
            response = await request(loadOptionsNoLogued("POST", `${apiUrl}/private/users`, {
                externalId
            }));

            assert(false);
        } catch (e) {
            assert(true);
        }
    });
});