const assert = require("assert");
const request = require("request-promise");
const randomString = require("randomstring");

const testingTools = require("./tools");

const baseUrl = "http://localhost:9000";
const apiUrl = "http://localhost:9000/api/v1";

describe("food.js", () => {
    it("Check API is Online", async () => {
        let response;

        try {
            response = await request(testingTools.loadOptionsNoLogued("GET", `${baseUrl}`));
        } catch (err) {
            assert.ok(false);
        }

        testingTools.checkResponse(response);
    });

    it("Check create food", async () => {
        const response = await request(testingTools.loadOptionsLogued("POST", `${apiUrl}/private/foods`, {
            name: randomString.generate(10)
        }));

        testingTools.checkResponse(response);
    });

    it("Check get food on duplicate name", async () => {
        const name = randomString.generate(16);

        let responseFood1 = await request(testingTools.loadOptionsLogued("POST", `${apiUrl}/private/foods`, {
            name
        }));

        testingTools.checkResponse(responseFood1);

        let responseFood2 = await request(testingTools.loadOptionsLogued("POST", `${apiUrl}/private/foods`, {
            name
        }));

        testingTools.checkResponse(responseFood2);

        assert.equal(responseFood1.data.name, responseFood2.data.name);
    });
});