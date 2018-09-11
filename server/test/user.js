const assert = require("assert");
const request = require("request-promise");
const randomString = require("randomstring");

const testingTools = require("./tools");

const baseUrl = "http://localhost:9000";
const apiUrl = "http://localhost:9000/api/v1";

describe("user.js", () => {
    it("Check API is Online", async () => {
        let response;

        try {
            response = await request(testingTools.loadOptionsNoLogued("GET", `${baseUrl}`));
        } catch (err) {
            assert.ok(false);
        }

        testingTools.checkResponse(response);
    });

    it("Check create data", async () => {
        const response = await request(testingTools.loadOptionsLogued("POST", `${apiUrl}/private/users`, {
            externalId: randomString.generate(16),
            name: randomString.generate(5)
        }));

        testingTools.checkResponse(response);
    });

    it("Check not allow duplicated users", async () => {
        const externalId = randomString.generate(16);

        let response = await request(testingTools.loadOptionsLogued("POST", `${apiUrl}/private/users`, {
            externalId
        }));

        testingTools.checkResponse(response);

        try {
            response = await request(testingTools.loadOptionsLogued("POST", `${apiUrl}/private/users`, {
                externalId
            }));

            assert(false);
        } catch (e) {
            assert(true);
        }
    });

    it("Get user created", async () => {
        const externalId = randomString.generate(16);

        let response = await request(testingTools.loadOptionsLogued("POST", `${apiUrl}/private/users`, {
            externalId
        }));

        testingTools.checkResponse(response);

        response = await request(testingTools.loadOptionsLogued("GET", `${apiUrl}/private/users/${externalId}`));

        testingTools.checkResponse(response);
        assert.equal(response.data.externalId, externalId);
    });

    it("Error getting user not created", async () => {
        const externalId = randomString.generate(10);

        try {
            let response = await request(testingTools.loadOptionsLogued("GET", `${apiUrl}/private/users/${externalId}`));

            assert(response);
            assert.ok(!!response.err);
        } catch (e) {
            assert(true);
        }
    });
});