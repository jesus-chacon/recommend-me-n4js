const express = require("express");
const router = express.Router();
const {check} = require("express-validator/check");

const Tools = require("../tools");

const {createUser, getUserByExternalId, eatFood} = require("../actions");

router.post("/", [check("externalId").isLength({min: 1})], Tools.checkErrRequest, (req, res) => {
    Tools.manageResponse(res, "Error creating the user", createUser(req.body));
});

router.get("/:externalId", async (req, res) => {
    const user = await getUserByExternalId(req.params.externalId);

    if (!user) Tools.notFound(res);
    else Tools.response(res, user);
});

router.post("/:externalId", async (req, res) => {
    Tools.manageResponse(res, "Error creating the relation", eatFood(req.params.externalId, req.query.food));
});

module.exports = router;